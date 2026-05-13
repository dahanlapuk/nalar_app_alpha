import express from "express";
import path from "path";
import multer from "multer";
import { createServer as createViteServer } from "vite";
import { supabase } from "./src/lib/supabaseClient.ts";
import { searchQuotes, runAudit } from "./src/lib/gemini.ts";
import { extractTextFromPDF } from "./src/lib/pdfExtractor.ts";
import fs from "fs";

// Using memory storage for multer
const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // --- API ROUTES ---

  // Custom Setup Instruction Endpoint
  app.get("/api/setup", (req, res) => {
    res.json({
      message: "Supabase and Environment Setup",
      status: "Supabase connection: " + (supabase ? "Configured" : "Missing Credentials"),
      instructions: [
        "1. Create a Supabase project at https://supabase.com",
        "2. Run the SQL schema from '/schema.sql' in the Supabase SQL Editor",
        "3. Copy the Supabase Project URL and Service Role Key to .env via the Secrets tab",
        "4. Set up Google OAuth and add the credentials to .env",
      ]
    });
  });

  // Auth: Return dummy user for development
  app.get("/api/auth/session", (req, res) => {
    res.json({
      user: {
        id: "dummy-user-id",
        email: "student@university.edu",
        name: "Student Researcher"
      }
    });
  });

  // Projects
  app.post("/api/projects", async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    
    // Using a dummy user_id if auth is just mock
    const { title, research_mode } = req.body;
    try {
      // Create dummy user on the fly if needed (just for demo purposes)
      const { data: user } = await supabase.from('users').select('id').limit(1).single();
      
      let userId = user?.id;
      if (!userId) {
        const newUser = await supabase.from('users').insert({ email: 'student@university.edu', name: 'Student Researcher' }).select().single();
        userId = newUser.data?.id;
      }

      const { data, error } = await supabase
        .from('projects')
        .insert({ title, research_mode, user_id: userId })
        .select()
        .single();
        
      if (error) throw error;
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
      const { data, error } = await supabase.from('projects').select('*, sources(*), quotes(*), argument_nodes(*), argument_edges(*)').eq('id', req.params.id).single();
      if (error) throw error;
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Sources Upload
  app.post("/api/sources/upload", upload.single('file'), async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    const file = req.file;
    const { projectId } = req.body;

    if (!file || !projectId) {
      return res.status(400).json({ error: "File and projectId are required" });
    }

    try {
      let extractedText = "";
      if (file.mimetype === 'application/pdf') {
        extractedText = await extractTextFromPDF(file.buffer);
      } else {
        extractedText = "Simulated text extraction for " + file.originalname;
      }
      
      const { data, error } = await supabase.from('sources').insert({
        project_id: projectId,
        title: file.originalname,
        type: file.mimetype,
        extracted_text: extractedText
      }).select().single();

      if (error) throw error;
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/sources/:id", async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
      const { data, error } = await supabase.from('sources').select('*').eq('id', req.params.id).single();
      if (error) throw error;
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/sources/analyze-ppt", async (req, res) => {
    res.json({ message: "PPT Analysis simulated successfully", state: "Draft Reviewed" });
  });

  // Quotes
  app.post("/api/quotes/search", async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    const { projectId, query } = req.body;
    try {
      const { data: sources } = await supabase.from('sources').select('extracted_text').eq('project_id', projectId);
      const sourceTexts = sources?.map(s => s.extracted_text).filter(Boolean) || [];
      
      if (sourceTexts.length === 0) {
        sourceTexts.push("Simulated academic content regarding digital literacy. According to Nugroho (2021), digital literacy requires more than just technical skills; it involves critical thinking to evaluate the veracity of online information. Illusion of competence often occurs when students rely entirely on search engines.");
      }

      const results = await searchQuotes(sourceTexts, query);
      res.json(results);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/quotes/insert", async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
      const { data, error } = await supabase.from('quotes').insert(req.body).select().single();
      if (error) throw error;
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Arguments
  app.get("/api/arguments/:projectId", async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
      const { data: nodes } = await supabase.from('argument_nodes').select('*').eq('project_id', req.params.projectId);
      const { data: edges } = await supabase.from('argument_edges').select('*').eq('project_id', req.params.projectId);
      res.json({ nodes, edges });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/arguments/nodes", async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
      const { data, error } = await supabase.from('argument_nodes').insert(req.body).select().single();
      if (error) throw error;
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/arguments/edges", async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
      const { data, error } = await supabase.from('argument_edges').insert(req.body).select().single();
      if (error) throw error;
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Audit
  app.post("/api/audit/run", async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    const { projectId } = req.body;
    try {
      const { data: projectData } = await supabase.from('projects').select('*, sources(*), quotes(*)').eq('id', projectId).single();
      const results = await runAudit(projectData || { mockData: true, text: "Sample testing audit data" });
      
      const { data, error } = await supabase.from('audit_results').insert({
        project_id: projectId,
        ...results
      }).select().single();
      
      if (error) throw error;
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/audit/:projectId", async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
      const { data, error } = await supabase.from('audit_results').select('*').eq('project_id', req.params.projectId).order('created_at', { ascending: false }).limit(1).single();
      if (error) throw error;
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA Fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
