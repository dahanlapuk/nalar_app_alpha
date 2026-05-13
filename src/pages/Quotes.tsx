import { useState } from 'react';
import { Search, Quote as QuoteIcon } from 'lucide-react';
import { PageHeader } from '../App';

interface QuoteData {
  id: string;
  text: string;
  citation: string;
  tag: string;
}

const mockQuotes: QuoteData[] = [
  { id: '1', text: "Media digital mengubah pola belajar siswa secara fundamental, menuntut adaptasi kognitif yang berbeda dari generasi sebelumnya.", citation: "(Anwar, 2003, hlm. 211)", tag: "Core Theory" },
  { id: '2', text: "Literasi digital bukan sekadar kemampuan mengoperasikan gawai, melainkan pemahaman kritis terhadap informasi.", citation: "(Sari, 2019, hlm. 45)", tag: "Definition" },
  { id: '3', text: "Meskipun teknologi menyediakan akses informasi tanpa batas, ia tidak secara otomatis meningkatkan kualitas pemahaman.", citation: "(Wijaya, 2021, hlm. 12)", tag: "Counter Argument" },
  { id: '4', text: "Survei menunjukkan 78% siswa mengalami distraksi saat menggunakan perangkat media untuk belajar.", citation: "(Data Kemdikbud, 2022, hlm. 5)", tag: "Supporting Evidence" },
  { id: '5', text: "Pendekatan kuantitatif digunakan untuk mengukur korelasi antara durasi screen-time dan nilai akademis.", citation: "(Canggara, 2010, hlm. 88)", tag: "Methodology" },
];

const tags = ['All', 'Definition', 'Core Theory', 'Counter Argument', 'Methodology', 'Supporting Evidence'];

export default function Quotes() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedQuote, setSelectedQuote] = useState<QuoteData | null>(null);

  const filteredQuotes = activeFilter === 'All' 
    ? mockQuotes 
    : mockQuotes.filter(q => q.tag === activeFilter);

  return (
    <div className="space-y-6 flex flex-col h-full">
      <PageHeader 
        title="Smart Quote Finder" 
        description="Semantic retrieval of relevant academic evidence across verified corpus."
      />
      
      <div className="flex-grow flex gap-8 min-h-0">
        <div className="w-[70%] flex flex-col h-full">
          {/* Search bar & Filter */}
          <div className="mb-8 flex gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-editorial-muted w-5 h-5" />
              <input 
                type="text" 
                placeholder="SEARCH FOR QUOTES OR THEORIES..." 
                className="w-full bg-transparent border-b-2 border-editorial-text/20 py-4 pl-10 text-xs uppercase tracking-widest focus:outline-none focus:border-editorial-text transition-colors"
                onChange={() => {}}
              />
            </div>
            <select 
              className="bg-transparent border border-editorial-text/20 py-3 px-4 text-xs uppercase tracking-widest outline-none focus:border-editorial-text"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              {tags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
          </div>

          {/* Quotes List */}
          <div className="flex-grow overflow-y-auto space-y-4 pr-2 pb-6">
            {filteredQuotes.map(quote => (
              <div 
                key={quote.id} 
                onClick={() => setSelectedQuote(quote)}
                className={`p-6 border ${selectedQuote?.id === quote.id ? 'border-editorial-text shadow-md' : 'border-editorial-text/10 shadow-sm'} bg-white cursor-pointer hover:border-editorial-text/50 transition-all group`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 border border-editorial-text/20 rounded ${quote.tag === 'Core Theory' ? 'bg-amber-50' : quote.tag === 'Counter Argument' ? 'bg-red-50' : 'bg-neutral-50'}`}>
                    {quote.tag}
                  </span>
                  <QuoteIcon size={16} className="text-editorial-muted group-hover:text-editorial-text" />
                </div>
                <p className="font-serif italic text-lg leading-relaxed text-editorial-text/90">"{quote.text}"</p>
                <p className="text-xs text-editorial-muted mt-4 text-right uppercase tracking-wider">{quote.citation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Source Viewer Modal/Panel */}
        <div className="w-[30%] h-full">
          {selectedQuote ? (
            <div className="h-full border border-editorial-text/10 bg-white shadow-sm flex flex-col pt-6 font-serif animate-in slide-in-from-right duration-300">
              <div className="px-6 flex justify-between items-center mb-4 border-b border-editorial-text/10 pb-4">
                 <h3 className="text-sm font-sans uppercase tracking-widest font-bold">Source Viewer</h3>
                 <button onClick={() => setSelectedQuote(null)} className="text-editorial-muted hover:text-editorial-text">✕</button>
              </div>
              
              <div className="flex-grow overflow-y-auto px-8 py-4 bg-neutral-50/50">
                 <div className="bg-white shadow p-6 text-sm leading-8 text-editorial-text/80">
                   <p className="mb-4 opacity-50">Dalam melihat fenomena ini, kita harus menyadari bahwa perubahan struktural tidak terjadi dalam ruang hampa. Ada berbagai faktor eksternal yang turut mempengaruhi cara individu merespons stimulasi informasi.</p>
                   
                   <p className="bg-amber-100/50 -mx-2 px-2 py-1 text-black">
                     {selectedQuote.text} 
                   </p>
                   
                   <p className="mt-4 opacity-50">Oleh karena itu, diperlukan kerangka evaluasi yang tidak hanya menilai hasil akhir, tetapi juga proses kognitif yang mendasarinya. Tanpa pemahaman ini, intervensi pedagogis akan kehilangan efektivitasnya.</p>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-full border border-editorial-text/10 bg-editorial-bg/50 flex flex-col items-center justify-center text-center p-8">
              <QuoteIcon size={32} className="text-editorial-text/20 mb-4" />
              <span className="text-xs uppercase tracking-widest text-editorial-muted">Select a quote to view context</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
