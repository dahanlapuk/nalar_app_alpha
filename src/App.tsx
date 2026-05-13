import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { WritingProgressProvider, useWritingProgress } from './context/WritingProgressContext';
import Layout from './components/Layout';
import Editor, { EditorRef } from './components/Editor';
import OnboardingTour from './components/OnboardingTour';
import { Quote } from 'lucide-react';
import { useRef } from 'react';

// Pages
import ChoosePath from './pages/ChoosePath';
import UploadDraft from './pages/UploadDraft';
import Sources from './pages/Sources';
import Quotes from './pages/Quotes';
import ArgumentMap from './pages/ArgumentMap';
import WritingUtilities from './pages/WritingUtilities';
import IntegrityAudit from './pages/IntegrityAudit';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] text-center space-y-12 px-6">
      <div className="space-y-6 max-w-3xl">
        <h1 className="font-serif italic text-7xl md:text-8xl tracking-tight leading-none text-amber-600">NALAR</h1>
        <p className="text-sm md:text-base uppercase tracking-[0.3em] text-editorial-text font-bold">Assist Thinking, Protect Integrity</p>
        <p className="text-editorial-text/80 text-lg md:text-xl font-serif italic max-w-2xl mx-auto leading-relaxed mt-8">
          Ruang kerja riset akademik yang membantu mahasiswa mengelola sumber, menyusun argumen, dan menjaga integritas — tanpa menggantikan kepengarangan Anda.
        </p>
      </div>

      <div className="space-y-6 pt-10 border-t border-editorial-text/10 min-w-[300px]">
        <button 
          onClick={() => navigate('/choose-path')}
          className="w-full py-5 bg-editorial-text text-editorial-bg text-xs uppercase tracking-[0.2em] font-bold hover:bg-neutral-800 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 border border-editorial-text"
        >
          <svg className="w-5 h-5 text-current" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-white mt-0.5">Sign in with Google</span>
        </button>
        <p className="text-[10px] text-editorial-muted uppercase tracking-widest mt-4">
          Dibuat untuk #JuaraVibeCoding<br/>Tidak ada data riset yang disimpan di cloud
        </p>
      </div>
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="mb-12 border-b border-editorial-text/10 pb-8 shrink-0">
      <h2 className="text-5xl font-serif italic mb-4">{title}</h2>
      <p className="text-[10px] uppercase tracking-widest text-editorial-muted max-w-md">{description}</p>
    </header>
  );
}

function Workspace() {
  const { progress, researchMode } = useWritingProgress();
  const editorRef = useRef<EditorRef>(null);

  const handleInsertSuggestedQuote = () => {
    if (editorRef.current) {
      editorRef.current.insertContent(' "Ketergantungan siswa pada mesin pencari tanpa kurasi sering melahirkan ilusi pemahaman (illusion of competence)." (Nugroho, 2021, hlm. 45) ');
    }
  };

  const isExisting = researchMode === 'existing';

  return (
    <div className="space-y-8 flex flex-col h-[calc(100vh-8rem)]">
      <OnboardingTour />
      <PageHeader 
        title="Workspace" 
        description="Computational research dashboard for thesis project management and oversight."
      />
      
      <div className="flex-grow flex gap-8 min-h-0">
        {/* LEFT COLUMN - THE EDITOR (70%) */}
        <div id="tour-editor" className="w-[70%] h-full flex flex-col">
          <Editor ref={editorRef} />
        </div>

        {/* RIGHT COLUMN - RESEARCH INSIGHTS (30%) */}
        <div id="tour-insights" className="w-[30%] h-full flex flex-col space-y-6 overflow-y-auto pr-2 pb-6">
          {/* Progress Card */}
          <div className="p-6 border border-editorial-text/10 space-y-4 shadow-sm bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <h3 className="text-[10px] uppercase tracking-widest font-bold border-b border-editorial-text/10 pb-2">Research Overview</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-xs text-editorial-muted">Writing Progress</span>
                <span className="font-serif italic font-bold">{progress}%</span>
              </div>
              <div className="h-1 w-full bg-editorial-text/10">
                <div 
                  className="h-full bg-editorial-text transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs text-editorial-muted block">Research State</span>
              <span className={`inline-block px-3 py-1 text-editorial-bg text-[10px] uppercase tracking-widest font-bold ${isExisting ? 'bg-amber-600' : 'bg-editorial-text'}`}>
                {isExisting ? 'Structural Revision Needed' : 'Early Exploration'}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-6 border border-editorial-text/10 space-y-4 shadow-sm bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <h3 className="text-[10px] uppercase tracking-widest font-bold border-b border-editorial-text/10 pb-2">Corpus Metrics</h3>
            <ul className="space-y-3 text-sm font-serif italic text-editorial-text/80">
              <li className="flex justify-between"><span>Sources</span> <span className="font-sans font-bold not-italic">{isExisting ? '12' : '8'}</span></li>
              <li className="flex justify-between"><span>Quotes Extracted</span> <span className="font-sans font-bold not-italic">{isExisting ? '20' : '12'}</span></li>
              <li className="flex justify-between"><span>Arguments Mapped</span> <span className="font-sans font-bold not-italic">{isExisting ? '8' : '5'}</span></li>
            </ul>
          </div>

          {/* Suggested Quote */}
          <div className="p-6 border border-editorial-text/10 bg-editorial-bg space-y-4 relative hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center border-4 border-editorial-bg shadow-sm">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-editorial-muted flex items-center gap-2">
              <Quote size={12} /> Suggested Quote
            </h3>
            <p className="font-serif italic text-sm leading-relaxed border-l-2 border-editorial-text/20 pl-4 py-1">
              "Ketergantungan siswa pada mesin pencari tanpa kurasi sering melahirkan ilusi pemahaman (illusion of competence)."
            </p>
            <p className="text-[10px] text-editorial-muted uppercase tracking-wider text-right">— (Nugroho, 2021, hlm. 45)</p>
            
            <button 
              onClick={handleInsertSuggestedQuote} 
              className="mt-4 w-full py-3 border border-editorial-text text-[10px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors flex justify-center items-center gap-2"
            >
              <span>+ Sisipkan ke Editor</span>
            </button>
          </div>

          {/* Integrity Audit Gate */}
          <div className="mt-auto pt-4 relative">
            {progress < 80 ? (
              <div className="w-full py-4 border border-editorial-text/20 text-editorial-text/40 bg-white/50 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-not-allowed">
                <span><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></span>
                <span>Integrity Audit LOCKED</span>
              </div>
            ) : (
               <Link to="/integrity-audit?unlock=true" className="block text-center w-full py-4 bg-editorial-text text-editorial-bg text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                <span>Run Integrity Audit</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function ContextToolbar() {
  const { progress, setProgress } = useWritingProgress();
  return (
    <div className="fixed bottom-8 right-8 flex space-x-6 items-center bg-white border border-editorial-text px-6 py-4 shadow-2xl z-[100] transition-all hover:scale-105">
      <span className="text-[10px] font-bold uppercase tracking-widest border-r border-editorial-text/20 pr-6 mr-2">Context Control</span>
      <button 
        onClick={() => setProgress(30)}
        className={`text-[10px] uppercase tracking-[0.2em] transition-all ${progress === 30 ? 'font-bold underline underline-offset-4' : 'text-editorial-muted hover:text-editorial-text'}`}
      >
        LOCKED (30%)
      </button>
      <span className="text-editorial-text/20 font-serif italic">/</span>
      <button 
        onClick={() => setProgress(85)}
        className={`text-[10px] uppercase tracking-[0.2em] transition-all ${progress === 85 ? 'font-bold underline underline-offset-4' : 'text-editorial-muted hover:text-editorial-text'}`}
      >
        UNLOCKED (85%)
      </button>
      <div className="ml-4 pl-6 border-l border-editorial-text/20">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={progress}
          onChange={(e) => setProgress(parseInt(e.target.value))}
          className="w-24 h-1 bg-neutral-200 accent-editorial-text cursor-pointer"
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <WritingProgressProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/choose-path" element={<ChoosePath />} />
            <Route path="/upload-draft" element={<UploadDraft />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/argument-map" element={<ArgumentMap />} />
            <Route path="/writing-utilities" element={<WritingUtilities />} />
            <Route path="/integrity-audit" element={<IntegrityAudit />} />
          </Routes>
          <ContextToolbar />
        </Layout>
      </Router>
    </WritingProgressProvider>
  );
}
