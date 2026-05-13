import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  } else {
    console.warn("GEMINI_API_KEY is not set.");
  }
} catch (e) {
  console.error("Failed to initialize GoogleGenAI:", e);
}

export async function searchQuotes(sourceTexts: string[], query: string) {
  if (!ai) throw new Error("GEMINI_API_KEY not configured");
  
  const prompt = `
  You are an academic assistant. Given the following source texts, find relevant quotes that answer this query: "${query}".
  
  Source Texts:
  ${sourceTexts.map((text, idx) => `[Source ${idx + 1}]\n${text.substring(0, 5000)}...`).join('\\n\\n')}
  
  Return the result EXACTLY as a JSON array of objects with the following keys:
  - text: The exact quote text.
  - label: A short label or summary of the quote.
  - page_number: The inferred page number (or "N/A" if unknown).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    if (response.text) {
        return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Gemini AI error:", error);
    throw error;
  }
}

export async function runAudit(projectData: any) {
  if (!ai) throw new Error("GEMINI_API_KEY not configured");

  const prompt = `
  Perform an integrity audit on the following project data:
  ${JSON.stringify(projectData).substring(0, 15000)}

  Check for:
  1. Possible plagiarism issues.
  2. Suspected AI-generated pattern flags.
  3. Citation inconsistencies.

  Return the result EXACTLY as a JSON object with the following keys:
  - plagiarism_score: An integer from 0 to 100.
  - ai_pattern_flags: An array of strings describing suspected AI patterns.
  - citation_issues: An array of strings describing citation problems.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    if (response.text) {
        return JSON.parse(response.text);
    }
    return {
      plagiarism_score: 0,
      ai_pattern_flags: [],
      citation_issues: []
    };
  } catch (error) {
    console.error("Gemini AI error:", error);
    throw error;
  }
}
