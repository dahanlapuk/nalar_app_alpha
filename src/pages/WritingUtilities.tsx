import { useState, useRef } from 'react';
import { PageHeader } from '../App';
import { Quote as QuoteIcon, AlertTriangle, BookMarked, CheckCircle2 } from 'lucide-react';

const mockQuotes = [
  { id: '1', text: "Media digital mengubah pola belajar siswa secara fundamental.", citation: "(Anwar, 2003, hlm. 211)" },
  { id: '2', text: "Literasi digital bukan sekadar kemampuan mengoperasikan gawai.", citation: "(Sari, 2019, hlm. 45)" },
  { id: '3', text: "Pemahaman kritis terhadap informasi adalah kunci.", citation: "(Wijaya, 2021, hlm. 12)" },
];

export default function WritingUtilities() {
  const [content, setContent] = useState("Menurut pengamatan awal, literasi digital di kalangan siswa SMA masih rendah. Banyak siswa yang hanya mengonsumsi informasi dari media sosial tanpa melakukan verifikasi. Hal ini berdampak signifikan pada kemampuan mereka membedakan fakta dari opini, yang pada akhirnya memengaruhi prestasi belajar mereka dalam tugas-tugas yang membutuhkan riset mendalam.");
  const [showModal, setShowModal] = useState(false);
  const [showReferences, setShowReferences] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsert = (citation: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newContent = content.substring(0, start) + " " + citation + content.substring(end);
      setContent(newContent);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      <PageHeader 
        title="Writing Utilities" 
        description="Traceable citation insertion and bibliography synchronization protocols."
      />
      
      {/* Warning Alert */}
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 flex gap-3 text-sm font-medium items-center shadow-sm">
        <AlertTriangle size={20} className="shrink-0" />
        <p>RESTRICITON NOTICE: NALAR tidak menulis isi skripsi. Modul ini diisolasi hanya untuk membantu manajemen format sitasi dan integrasi referensi.</p>
      </div>
      
      <div className="flex-grow flex gap-8 min-h-0">
        {/* Editor Wrapper */}
        <div className="w-[60%] flex flex-col h-full gap-4">
           <textarea 
             ref={textareaRef}
             value={content}
             onChange={(e) => setContent(e.target.value)}
             className="flex-grow w-full border border-editorial-text/10 p-6 font-serif leading-8 text-editorial-text outline-none focus:border-editorial-text shadow-sm resize-none"
           />
           <button 
             onClick={() => setShowModal(true)}
             className="w-full py-4 bg-editorial-text text-editorial-bg uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-neutral-800 transition-colors flex justify-center items-center gap-2"
           >
             <QuoteIcon size={14} /> Sisipkan Kutipan
           </button>
        </div>

        {/* References Panel */}
        <div className="w-[40%] h-full flex flex-col gap-4">
           {!showReferences ? (
              <div className="h-full border border-editorial-text/10 bg-editorial-bg/50 flex flex-col items-center justify-center text-center p-8 space-y-6">
                 <BookMarked size={48} className="text-editorial-text/20" />
                 <p className="text-xs uppercase tracking-widest text-editorial-muted font-bold">Bibliography Generator</p>
                 <button 
                    onClick={() => setShowReferences(true)}
                    className="px-6 py-3 border border-editorial-text text-[10px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors"
                 >
                   Generate Reference List
                 </button>
              </div>
           ) : (
              <div className="h-full border border-editorial-text/10 bg-white p-8 flex flex-col shadow-sm animate-in fade-in zoom-in duration-300">
                 <div className="flex justify-between items-center mb-6 border-b border-editorial-text/10 pb-4">
                    <h3 className="font-serif italic font-bold text-xl">Daftar Pustaka (APA)</h3>
                    <button onClick={() => setShowReferences(false)} className="text-[10px] uppercase tracking-widest text-editorial-muted hover:text-editorial-text">Reset</button>
                 </div>
                 
                 <div className="flex-grow overflow-y-auto space-y-4 font-serif text-sm leading-relaxed pl-4" style={{textIndent: '-1rem'}}>
                    <p>Anwar, M. (2003). <em>Media dan Pembelajaran</em>. Jakarta: Pustaka Edu.</p>
                    <p>Blumler, J. & Katz, E. (1974). <em>The Uses of Mass Communications</em>. Sage.</p>
                    <p>Sari, D. (2019). <em>Literasi Digital di Era 4.0</em>. Bandung: Rosda.</p>
                    <p className="text-red-700 bg-red-50 p-2 my-2 relative -ml-4 border-l-2 border-red-700" style={{textIndent: '0'}}>
                      <span className="block font-sans text-[10px] uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><AlertTriangle size={10} /> Orphan Reference Detected</span>
                      Wijaya, K. (2021). <em>Dampak Sosial Media pada Siswa</em>. (Sitasi digunakan di draf, tetapi sumber belum diunggah ke Source Library)
                    </p>
                 </div>
              </div>
           )}
        </div>
      </div>

      {/* Quote Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-editorial-bg/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
           <div className="bg-white border border-editorial-text max-w-2xl w-full shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
             <div className="flex justify-between items-center p-6 border-b border-editorial-text/10">
                <h3 className="text-xs font-bold uppercase tracking-widest">Select Citation to Insert</h3>
                <button onClick={() => setShowModal(false)} className="text-editorial-muted hover:text-black">✕</button>
             </div>
             <div className="p-2 max-h-[60vh] overflow-y-auto">
               {mockQuotes.map((q) => (
                 <div 
                   key={q.id}
                   onClick={() => handleInsert(q.citation)}
                   className="p-4 hover:bg-neutral-50 cursor-pointer border-b border-editorial-text/5 last:border-0 group"
                 >
                   <p className="font-serif italic text-editorial-text/80 mb-2">"{q.text}"</p>
                   <div className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-wider font-bold">{q.citation}</span>
                      <span className="text-[10px] uppercase tracking-widest text-editorial-muted opacity-0 group-hover:opacity-100 transition-opacity">Click to Insert</span>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
