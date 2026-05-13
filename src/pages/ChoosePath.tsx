import { Link, useNavigate } from 'react-router-dom';
import { Lightbulb, FolderOpen } from 'lucide-react';
import { useWritingProgress } from '../context/WritingProgressContext';

export default function ChoosePath() {
  const navigate = useNavigate();
  const { setResearchMode, setProjectTitle, setProgress } = useWritingProgress();

  const handleStartScratch = () => {
    setResearchMode('scratch');
    setProjectTitle("Dampak Literasi Digital terhadap Prestasi Belajar");
    setProgress(30);
    navigate('/workspace?mode=scratch');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-serif italic text-editorial-text">Selamat datang, Peneliti</h2>
        <p className="text-editorial-muted text-sm uppercase tracking-widest">Bagaimana kami bisa membantu riset Anda hari ini?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Card 1 */}
        <div className="border border-editorial-text/20 p-10 bg-white shadow-sm flex flex-col items-center space-y-6 text-center hover:border-editorial-text/50 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="w-16 h-16 bg-editorial-bg border border-editorial-text/10 rounded-full flex items-center justify-center mb-2">
             <Lightbulb className="w-8 h-8 text-editorial-text" />
          </div>
          <h3 className="font-serif italic text-2xl font-bold">Mulai dari Awal</h3>
          <p className="text-editorial-text/80 text-sm leading-relaxed flex-grow">
            Anda belum memiliki topik? NALAR akan membantu eksplorasi topik, penemuan sumber, dan perencanaan argumen.
          </p>
          <button 
            onClick={handleStartScratch}
            className="w-full py-4 bg-editorial-text text-editorial-bg text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-neutral-800 transition-colors"
          >
            Mulai Riset Baru
          </button>
        </div>

        {/* Card 2 */}
        <div className="border border-editorial-text/20 p-10 bg-white shadow-sm flex flex-col items-center space-y-6 text-center hover:border-editorial-text/50 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="w-16 h-16 bg-editorial-bg border border-editorial-text/10 rounded-full flex items-center justify-center mb-2">
             <FolderOpen className="w-8 h-8 text-editorial-text" />
          </div>
          <h3 className="font-serif italic text-2xl font-bold">Lanjutkan Riset</h3>
          <p className="text-editorial-text/80 text-sm leading-relaxed flex-grow">
            Anda sudah punya draf, sumber, atau revisi dosen? Unggah file Anda dan NALAR akan menganalisis tahap riset Anda.
          </p>
          <Link 
            to="/upload-draft"
            className="block w-full py-4 border border-editorial-text text-editorial-text text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-colors"
          >
            Unggah Draf Skripsi
          </Link>
        </div>
      </div>
    </div>
  );
}
