import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { useWritingProgress } from '../context/WritingProgressContext';

export default function UploadDraft() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const navigate = useNavigate();
  const { setResearchMode, setProjectTitle, setProgress } = useWritingProgress();

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
      // Update global context per instruction
      setProgress(45);
      setResearchMode('existing');
      setProjectTitle("Analisis Praktik Literasi Digital di SMA Negeri");
    }, 2000);
  };

  const handleContinue = () => {
    navigate('/workspace?mode=existing');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] space-y-12 w-full max-w-2xl mx-auto">
       <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif italic text-editorial-text">Unggah Draf Skripsi Anda</h2>
        <p className="text-editorial-muted text-sm uppercase tracking-widest">Sinkronisasi data dokumen untuk analisis komputasional</p>
      </div>

      {!uploadComplete ? (
        <div 
           className="w-full border-2 border-dashed border-editorial-text/30 p-16 bg-white/50 text-center flex flex-col items-center gap-6 cursor-pointer hover:bg-white hover:border-editorial-text/50 transition-all"
           onClick={!isUploading ? handleSimulateUpload : undefined}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-12 h-12 animate-spin text-editorial-text" />
              <div className="space-y-2 w-full max-w-xs">
                 <p className="text-xs uppercase tracking-widest font-bold">Menganalisis Dokumen...</p>
                 <div className="h-1 bg-editorial-text/10 overflow-hidden w-full">
                    <div className="h-full bg-editorial-text w-1/2 animate-pulse"></div>
                 </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-editorial-text/5 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-editorial-text/60" />
              </div>
              <div className="space-y-2">
                 <p className="text-sm font-serif italic text-editorial-text/80">Seret file .pdf, .docx, atau .txt ke sini</p>
                 <p className="text-[10px] uppercase tracking-widest text-editorial-muted">atau klik untuk memilih file</p>
              </div>
              <button disabled className="mt-4 px-8 py-3 border border-editorial-text text-[10px] uppercase tracking-widest font-bold pointer-events-none">
                 Pilih File
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="w-full border border-editorial-text/20 p-10 bg-white shadow-sm flex flex-col gap-8 animate-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
               <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-1 border-b border-editorial-text/10 pb-6 text-left w-full flex flex-col items-center">
               <span className="text-[10px] uppercase tracking-widest text-editorial-muted">Dokumen Terdeteksi</span>
               <p className="font-serif italic font-bold">Draft_Skripsi_DigitalLiterasi.pdf</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
               <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-editorial-muted">Research State</p>
                  <p className="font-bold text-sm">Structural Revision Needed</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-editorial-muted">Sumber Terdeteksi</p>
                  <p className="font-bold text-sm">5 file</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-editorial-muted">Progress Penulisan</p>
                  <p className="font-bold text-sm text-green-700">45%</p>
               </div>
            </div>

            <button 
              onClick={handleContinue}
              className="mt-4 w-full py-4 bg-editorial-text text-editorial-bg text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-neutral-800 transition-colors"
            >
              Lanjutkan ke Workspace
            </button>
        </div>
      )}
    </div>
  );
}
