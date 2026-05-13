import { createContext, useContext, useState, ReactNode } from 'react';

type ResearchMode = 'scratch' | 'existing' | null;

interface WritingProgressContextType {
  progress: number;
  setProgress: (value: number) => void;
  researchMode: ResearchMode;
  setResearchMode: (value: ResearchMode) => void;
  projectTitle: string;
  setProjectTitle: (value: string) => void;
}

const WritingProgressContext = createContext<WritingProgressContextType | undefined>(undefined);

export function WritingProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(30);
  const [researchMode, setResearchMode] = useState<ResearchMode>(null);
  const [projectTitle, setProjectTitle] = useState("Draft Skripsi: Dampak Literasi Digital terhadap Prestasi Belajar Siswa");

  return (
    <WritingProgressContext.Provider value={{ 
      progress, setProgress, 
      researchMode, setResearchMode, 
      projectTitle, setProjectTitle 
    }}>
      {children}
    </WritingProgressContext.Provider>
  );
}

export function useWritingProgress() {
  const context = useContext(WritingProgressContext);
  if (context === undefined) {
    throw new Error('useWritingProgress must be used within a WritingProgressProvider');
  }
  return context;
}
