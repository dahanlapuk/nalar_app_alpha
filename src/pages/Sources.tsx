import { useState } from 'react';
import { FileText, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { PageHeader } from '../App';

interface Source {
  id: string;
  title: string;
  author: string;
  year: number;
  type: string;
  tags: string[];
}

const mockSources: Source[] = [
  { id: '1', title: 'Media dan Pembelajaran', author: 'Anwar, M.', year: 2003, type: 'Book', tags: ['Core Theory'] },
  { id: '2', title: 'Literasi Digital di Era 4.0', author: 'Sari, D.', year: 2019, type: 'Journal', tags: ['Peer Reviewed', 'Primary Source'] },
  { id: '3', title: 'The Uses of Mass Communications', author: 'Blumler, J. & Katz, E.', year: 1974, type: 'Book', tags: ['Core Theory', 'Highly Cited'] },
  { id: '4', title: 'Dampak Sosial Media pada Siswa', author: 'Wijaya, K.', year: 2021, type: 'Journal', tags: ['Opinion-Based'] },
  { id: '5', title: 'Pengantar Ilmu Komunikasi', author: 'Canggara, H.', year: 2010, type: 'PPT', tags: ['Methodology'] },
];

export default function Sources() {
  const [sources, setSources] = useState<Source[]>(mockSources);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ title: string; label: string }[] | null>(null);

  const handleAnalisisPPT = () => {
    setAnalyzing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult([
        { title: 'Teori Uses and Gratifications (Blumler & Katz, 1974)', label: 'Primary Reference' },
        { title: 'Teori Konstruksi Sosial (Berger & Luckmann, 1966)', label: 'Primary Reference' }
      ]);
    }, 2000);
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      <PageHeader 
        title="Source Library" 
        description="Centralized academic source management system and semantic extraction engine."
      />
      
      <div className="flex-grow flex gap-8 min-h-0">
        <div className="w-[70%] flex flex-col gap-6 h-full overflow-y-auto pr-2">
          {/* Upload Area */}
          <div className="p-8 border-2 border-dashed border-editorial-text/20 text-center space-y-4 bg-white/50 hover:bg-white transition-colors cursor-pointer group">
            <div className="w-10 h-10 bg-editorial-text/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-editorial-text group-hover:text-white transition-colors">
              <FileText size={20} />
            </div>
            <p className="text-xs uppercase tracking-widest text-editorial-muted group-hover:text-editorial-text">Drop academic sources here (.pdf, .docx, .ppt)</p>
          </div>

          {/* Sources Table */}
          <div className="bg-white border border-editorial-text/10 shadow-sm flex-grow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-editorial-text/10 bg-editorial-bg/50">
                  <th className="p-4 text-[10px] uppercase tracking-widest font-bold">Title</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest font-bold">Author</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest font-bold">Year</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest font-bold">Type</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest font-bold">Quality Tags</th>
                </tr>
              </thead>
              <tbody className="font-serif italic text-sm">
                {sources.map(source => (
                  <tr key={source.id} className="border-b border-editorial-text/5 hover:bg-editorial-bg cursor-pointer transition-colors" onClick={() => setSelectedSource(source)}>
                    <td className="p-4 font-bold not-italic">{source.title}</td>
                    <td className="p-4">{source.author}</td>
                    <td className="p-4">{source.year}</td>
                    <td className="p-4 font-sans text-xs not-italic"><span className="px-2 py-1 bg-editorial-text/5 rounded">{source.type}</span></td>
                    <td className="p-4 font-sans text-[10px] uppercase not-italic tracking-wider flex gap-2 flex-wrap">
                      {source.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 border border-editorial-text/20 rounded-full">{tag}</span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Source Detail Modal/Panel */}
        <div className="w-[30%] h-full">
          {selectedSource ? (
            <div className="h-full border border-editorial-text/10 bg-white shadow-sm flex flex-col p-6 animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-start mb-6 border-b border-editorial-text/10 pb-4">
                <div>
                  <h3 className="font-serif italic font-bold text-xl">{selectedSource.title}</h3>
                  <p className="text-xs text-editorial-muted mt-1">{selectedSource.author} ({selectedSource.year})</p>
                </div>
                <button onClick={() => setSelectedSource(null)} className="text-editorial-muted hover:text-editorial-text">✕</button>
              </div>

              {/* PDF Preview Simulation */}
              <div className="flex-grow bg-neutral-100 border border-editorial-text/10 shadow-inner p-4 overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 backdrop-blur-sm z-10">
                   <button className="px-4 py-2 bg-editorial-text text-white text-[10px] uppercase tracking-widest font-bold">Open Full Viewer</button>
                </div>
                <div className="bg-white h-full w-full shadow-sm p-4 text-[8px] text-neutral-400 overflow-hidden leading-relaxed font-serif">
                   <div className="h-2 w-3/4 bg-neutral-200 mb-4"></div>
                   <div className="h-2 w-full bg-neutral-200 mb-2"></div>
                   <div className="h-2 w-full bg-neutral-200 mb-2"></div>
                   <span className="bg-yellow-200/50 text-neutral-600 block my-2 p-1">Media digital telah mengubah lanskap pendidikan secara drastis, mengharuskan kita mengkaji ulang...</span>
                   <div className="h-2 w-5/6 bg-neutral-200 mb-2"></div>
                   <div className="h-2 w-full bg-neutral-200 mb-2"></div>
                </div>
              </div>

              {/* Action Area */}
              <div className="mt-6 space-y-4">
                 {selectedSource.type === 'PPT' && (
                    <button 
                      onClick={handleAnalisisPPT} 
                      disabled={analyzing}
                      className="w-full py-3 bg-editorial-text text-editorial-bg text-[10px] uppercase tracking-[0.2em] font-bold flex justify-center items-center gap-2 hover:bg-neutral-800 transition-colors disabled:opacity-50"
                    >
                      {analyzing ? <RefreshCw className="animate-spin" size={14} /> : <FileText size={14} />}
                      {analyzing ? 'Menganalisis...' : 'Analisis PPT'}
                    </button>
                 )}
                 {analysisResult && (
                   <div className="p-4 bg-editorial-bg border border-editorial-text/10 space-y-3">
                     <p className="text-[10px] uppercase tracking-widest font-bold text-editorial-muted">Extracted References</p>
                     {analysisResult.map((res, i) => (
                       <div key={i} className="flex flex-col gap-1">
                          <span className="font-serif italic text-sm">{res.title}</span>
                          <span className="text-[10px] text-green-700 bg-green-100 w-max px-2 py-0.5 rounded">{res.label}</span>
                       </div>
                     ))}
                   </div>
                 )}
              </div>
            </div>
          ) : (
            <div className="h-full border border-editorial-text/10 bg-editorial-bg/50 flex items-center justify-center text-center p-8">
              <span className="text-xs uppercase tracking-widest text-editorial-muted">Select a source to view details</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
