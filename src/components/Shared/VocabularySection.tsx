import React, { useState } from 'react';
import { Volume2, Search, Sparkles, BookOpen, Layers } from 'lucide-react';
import { VocabItem } from '../../types/workshop';
import { speakFrench } from '../../utils/speech';

interface VocabularySectionProps {
  items: VocabItem[];
  title?: string;
  subtitle?: string;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({
  items,
  title = '1.1 Vocabulaire essentiel',
  subtitle = 'Écoute la prononciation, mémorise les définitions et révise avec les traductions en espagnol.',
}) => {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const filteredItems = items.filter(
    (item) =>
      item.word.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase()) ||
      item.es.toLowerCase().includes(search.toLowerCase())
  );

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSpeak = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Speak word cleanly (clean accents and slashes for clearer TTS)
    const cleanWord = word.replace('≠', 'contraire').replace('/', 'ou');
    speakFrench(cleanWord);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lexique officiel</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">{title}</h3>
          <p className="text-xs text-slate-600 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un mot (FR/ES)..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all w-48 sm:w-56"
            />
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Vue Cartes mémo"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Vue Tableau complet"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-10 text-slate-500 text-xs">
          Aucun mot ne correspond à « {search} ».
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-5">
          {filteredItems.map((item) => {
            const isRevealed = revealedIds[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleReveal(item.id)}
                className="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-4 transition-all shadow-2xs hover:shadow-xs cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.word}
                    </span>
                    <button
                      onClick={(e) => handleSpeak(item.word, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors shrink-0"
                      title="Écouter la prononciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Espagnol :</span>
                  {isRevealed ? (
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {item.es}
                    </span>
                  ) : (
                    <span className="text-indigo-600 hover:underline font-medium">
                      Cliquer pour révéler
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Mot (Français)</th>
                <th className="py-3 px-4">Définition</th>
                <th className="py-3 px-4">Español</th>
                <th className="py-3 px-4 text-right">Audio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-slate-900">
                    {item.word}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">{item.definition}</td>
                  <td className="py-2.5 px-4 font-medium text-slate-800">{item.es}</td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={(e) => handleSpeak(item.word, e)}
                      className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors inline-flex"
                      title="Écouter"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
