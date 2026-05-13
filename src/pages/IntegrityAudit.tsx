import { useLocation, Link } from 'react-router-dom';
import { useWritingProgress } from '../context/WritingProgressContext';
import { PageHeader } from '../App';
import { CheckCircle2, AlertTriangle, ShieldCheck, FileSearch, ShieldAlert } from 'lucide-react';

export default function IntegrityAudit() {
  const { progress } = useWritingProgress();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bypassLock = params.get('unlock') === 'true';
  const isLocked = !bypassLock && progress < 80;

  if (isLocked) {
    return (
      <div className="absolute inset-0 bg-editorial-bg/80 backdrop-blur-md z-10 flex flex-col items-center justify-center p-12 text-center overflow-hidden animate-fadeIn">
        <div className="max-w-xl space-y-12 animate-scaleIn">
          <div className="inline-block p-10 border border-editorial-text rounded-full mb-4 animate-pulse">
            <ShieldCheck className="w-12 h-12" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-4xl font-serif italic">Audit Terkunci</h3>
            <p className="text-editorial-muted uppercase tracking-[0.2em] text-xs">Progress menulis saat ini: {progress}%</p>
          </div>

          <div className="h-[1px] w-32 bg-editorial-text/20 mx-auto"></div>

          <p className="text-lg leading-relaxed text-editorial-text/80 font-serif italic mx-auto max-w-lg">
            This module facilitates computational verification of logical flow and academic originality. It requires a minimum threshold of 80% completion to ensure structural coherence before automated verification begins.
          </p>

          <Link to="/workspace" className="inline-block px-10 py-4 bg-editorial-text text-editorial-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all">
            Return to Research Workspace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col h-full">
      <PageHeader 
        title="Integrity Audit" 
        description="Computational verification of logical flow and academic originality protocols."
      />
      
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn min-h-0 overflow-y-auto pb-8">
         {/* Panel 1: Plagiarism */}
         <div className="border border-editorial-text/10 bg-white p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 border-b border-editorial-text/10 pb-4 mb-6">
               <FileSearch className="text-editorial-text" />
               <h3 className="text-xs uppercase tracking-widest font-bold">Plagiarism Check</h3>
            </div>
            
            <div className="space-y-6 flex-grow">
               <div>
                 <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-xl font-serif italic">12%</span>
                    <span className="text-[10px] uppercase tracking-widest text-green-700 font-bold bg-green-50 px-2 py-1 rounded">Aman</span>
                 </div>
                 <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600" style={{ width: '12%' }}></div>
                 </div>
                 <p className="text-xs text-editorial-muted mt-2 uppercase tracking-wider">Similarity Index</p>
               </div>
               
               <div className="text-sm border-l-2 border-editorial-text/10 pl-4 space-y-2 text-editorial-text/80 leading-relaxed font-serif">
                 <p>3 sumber terdeteksi memiliki irisan teks.</p>
                 <ul className="list-disc pl-4 opacity-80">
                   <li>2 sumber dengan kemiripan &lt;5% (frasa umum/teori dasar).</li>
                   <li>1 sumber dengan kemiripan 8% (kutipan langsung yang sudah disitasi).</li>
                 </ul>
               </div>
            </div>
         </div>

         {/* Panel 2: AI Pattern Analysis */}
         <div className="border border-editorial-text/10 bg-white p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 border-b border-editorial-text/10 pb-4 mb-6">
               <ShieldAlert className="text-amber-600" />
               <h3 className="text-xs uppercase tracking-widest font-bold">AI Pattern Analysis</h3>
            </div>
            
            <div className="space-y-6 flex-grow">
               <div className="bg-amber-50 text-amber-800 p-3 text-xs font-bold uppercase tracking-widest">
                  2 Segmen terdeteksi memiliki pola generatif — perlu ditinjau
               </div>
               
               <div className="space-y-4 font-serif text-sm">
                  <div className="border border-amber-200 p-3 bg-amber-50/30">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-amber-700 font-bold mb-1">Bab 2, Paragraf 3</p>
                    <p>Tone shift terdeteksi. Gaya bahasa berubah drastis dari akademik formal menjadi terlalu kaku (robotic phrasing).</p>
                  </div>
                  <div className="border border-amber-200 p-3 bg-amber-50/30">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-amber-700 font-bold mb-1">Bab 4, Paragraf 1</p>
                    <p>Struktur kalimat tidak natural dan tingkat prediktabilitas kata (perplexity) amat rendah.</p>
                  </div>
               </div>

               <p className="text-[10px] uppercase tracking-widest text-editorial-muted mt-auto pt-4 border-t border-editorial-text/10">
                 Disclaimer: NALAR tidak mendakwa penggunaan AI. Ini hanya analisis probabilitas pola teks untuk self-correction.
               </p>
            </div>
         </div>

         {/* Panel 3: Citation Validation */}
         <div className="border border-editorial-text/10 bg-white p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 border-b border-editorial-text/10 pb-4 mb-6">
               <CheckCircle2 className="text-editorial-text" />
               <h3 className="text-xs uppercase tracking-widest font-bold">Citation Validation</h3>
            </div>
            
            <div className="space-y-6 flex-grow">
               <ul className="space-y-4 font-serif text-sm">
                  <li className="flex gap-3 items-start">
                     <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-1" />
                     <div>
                       <p>(Anwar, 2003)</p>
                       <p className="font-sans text-[10px] uppercase tracking-wider text-editorial-muted">Ref: Media dan Pembelajaran</p>
                     </div>
                  </li>
                  <li className="flex gap-3 items-start">
                     <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-1" />
                     <div>
                       <p>(Sari, 2019)</p>
                       <p className="font-sans text-[10px] uppercase tracking-wider text-editorial-muted">Ref: Literasi Digital di Era 4.0</p>
                     </div>
                  </li>
                  <li className="flex gap-3 items-start">
                     <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-1" />
                     <div>
                       <p>(Blumler & Katz, 1974)</p>
                       <p className="font-sans text-[10px] uppercase tracking-wider text-editorial-muted">Ref: The Uses of Mass Communications</p>
                     </div>
                  </li>
                  <li className="flex gap-3 items-start">
                     <AlertTriangle size={16} className="text-red-500 shrink-0 mt-1" />
                     <div>
                       <p className="text-red-700 font-bold">(Wijaya, 2021)</p>
                       <p className="font-sans text-[10px] uppercase tracking-wider text-red-500">Warning: Tidak ditemukan sumber di Library</p>
                     </div>
                  </li>
               </ul>
            </div>
            
            <button className="w-full py-4 mt-6 border border-editorial-text mt-auto text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-colors">
               Sinkronkan Bibliografi
            </button>
         </div>
      </div>
    </div>
  );
}
