import { Link, useLocation } from 'react-router-dom';
import { useWritingProgress } from '../context/WritingProgressContext';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const { progress } = useWritingProgress();
  const location = useLocation();

  const isLanding = location.pathname === '/';

  const navItems = [
    { name: 'Home', path: '/workspace' },
    { name: 'Source Library', path: '/sources' },
    { name: 'Smart Quote Finder', path: '/quotes' },
    { name: 'Argument Map', path: '/argument-map' },
    { name: 'Writing Utilities', path: '/writing-utilities' },
    { name: 'Integrity Audit', path: '/integrity-audit?unlock=true' },
  ];

  if (isLanding) {
    return (
      <div className="flex h-screen bg-editorial-bg text-editorial-text font-sans overflow-hidden">
        <main className="flex-grow overflow-y-auto relative flex flex-col">
          <div key={location.pathname} className="w-full h-full animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-editorial-bg text-editorial-text font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <nav id="tour-sidebar" className="w-64 border-r border-editorial-text/10 flex flex-col p-8 shrink-0 transition-all duration-300">
        <div className="mb-12">
          <Link to="/" className="block group">
            <h1 className="font-serif italic text-4xl tracking-tight leading-none group-hover:scale-105 transition-transform origin-left">NALAR</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] mt-2 text-editorial-muted">Assist Thinking, Protect Integrity</p>
          </Link>
        </div>
        
        <ul className="space-y-6 flex-grow overflow-y-auto">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-xs uppercase tracking-widest transition-all inline-block hover:translate-x-1 ${
                  location.pathname === item.path.split('?')[0]
                    ? 'font-bold text-editorial-text border-b border-editorial-text pb-0.5'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Progress Indicator in Sidebar */}
        <div className="mt-auto pt-8 border-t border-editorial-text/10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] uppercase tracking-widest text-editorial-muted">Writing Progress</span>
            <span className="font-serif italic text-lg">{progress}%</span>
          </div>
          <div className="h-[2px] w-full bg-editorial-text/10">
            <div 
              className="h-full bg-editorial-text transition-[width] duration-700 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto relative flex flex-col">
        <div key={location.pathname} className="max-w-6xl mx-auto px-12 py-12 flex-grow w-full animate-fadeIn">
          {children}
        </div>
        
        {/* Subtle AI Insight Bar */}
        <div id="tour-ai-insight" className="bg-[#4A5D23] text-white px-6 py-3 shrink-0 flex items-center gap-4 text-xs">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="font-bold tracking-widest uppercase opacity-80">AI Assistant</span>
          <span className="opacity-60 hidden md:inline">– assisting thinking only, not writing.</span>
          <span className="ml-auto font-serif italic text-white/90">Saran: Pertimbangkan untuk mempersempit kerangka teori Anda.</span>
        </div>
      </main>

      {/* Background Decor System ID */}
      <div className="fixed top-8 right-8 px-4 py-2 border border-editorial-text rounded-full text-[10px] uppercase tracking-widest font-bold opacity-50 pointer-events-none">
        System ID: 899-XF
      </div>
    </div>
  );
}
