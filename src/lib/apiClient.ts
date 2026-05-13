// Centralized API client for the frontend with fallback to dummy data
export const apiClient = {
  async getProject(id: string) {
    try {
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) throw new Error("API not available");
      return await res.json();
    } catch {
      return { id, title: "Draft Thesis", writing_progress: 50 }; // fallback dummy
    }
  },

  async runAudit(projectId: string) {
    try {
      const res = await fetch(`/api/audit/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      if (!res.ok) throw new Error("API not available");
      return await res.json();
    } catch {
      // Fallback
      return {
        plagiarism_score: 12,
        ai_pattern_flags: ["No significant AI patterns detected."],
        citation_issues: ["Source [4] missing trailing period."]
      };
    }
  },

  async searchQuotes(projectId: string, query: string) {
    try {
      const res = await fetch(`/api/quotes/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, query }),
      });
      if (!res.ok) throw new Error("API not available");
      return await res.json();
    } catch {
      // Fallback
      return [
        { text: "Digital literacy encompasses critical thinking, not just tool usage.", label: "Definition", page_number: "24" }
      ];
    }
  }
};
