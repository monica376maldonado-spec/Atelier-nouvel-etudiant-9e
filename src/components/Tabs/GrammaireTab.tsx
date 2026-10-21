import React, { useState } from 'react';
import {
  GRAMMAR_MEMOS,
  GRAMMAR_EXERCICE_1,
  GRAMMAR_EXERCICE_2,
  GRAMMAR_EXERCICE_3,
  GRAMMAR_EXERCICE_4,
} from '../../data/workshopData';
import { VerificationSummary } from '../Shared/VerificationSummary';
import { BookMarked, Check, X, Sparkles, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface GrammaireTabProps {
  onRestartAll?: () => void;
}

export const GrammaireTab: React.FC<GrammaireTabProps> = ({ onRestartAll }) => {
  // Exercice 1 (Verbes pronominaux)
  const [answersG1, setAnswersG1] = useState<Record<string, string>>({
    g1_1: '',
    g1_2: '',
    g1_3: '',
    g1_4: '',
    g1_5: '',
    g1_6: '',
  });

  // Exercice 2 (Verbes au présent)
  const [answersG2, setAnswersG2] = useState<Record<string, string>>({
    g2_1: '',
    g2_2: '',
    g2_3: '',
    g2_4: '',
    g2_5: '',
    g2_6: '',
  });

  // Exercice 3 (Trouve l'erreur et corrige)
  const [answersG3, setAnswersG3] = useState<Record<string, string>>({
    g3_1: '',
    g3_2: '',
    g3_3: '',
    g3_4: '',
  });

  // Exercice 4 (Remets les mots dans l'ordre)
  const [orderedTokens, setOrderedTokens] = useState<Record<string, string[]>>({
    g4_1: [],
    g4_2: [],
    g4_3: [],
  });

  const [isVerified, setIsVerified] = useState(false);

  // Normalize string for evaluation
  const cleanStr = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/['’]/g, "'")
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  // Calculate scores
  let score1 = 0;
  GRAMMAR_EXERCICE_1.forEach((item) => {
    const val = cleanStr(answersG1[item.id] || '');
    const correct = cleanStr(item.correct);
    const altMatches = item.alt?.some((a) => cleanStr(a) === val);
    if (val === correct || altMatches) score1 += 1;
  });

  let score2 = 0;
  GRAMMAR_EXERCICE_2.forEach((item) => {
    const val = cleanStr(answersG2[item.id] || '');
    if (val === cleanStr(item.correct)) score2 += 1;
  });

  let score3 = 0;
  GRAMMAR_EXERCICE_3.forEach((item) => {
    const val = cleanStr(answersG3[item.id] || '');
    const isExact = val === cleanStr(item.correctedPhrase);
    const isAlt = item.alternativeCorrect?.some((alt) => cleanStr(alt) === val);
    // Also accept if they specifically wrote the corrected word or minimal fix
    const containsCorrection =
      (item.id === 'g3_1' && val.includes('brosses')) ||
      (item.id === 'g3_2' && (val.includes('a treize') || val.includes('a 13'))) ||
      (item.id === 'g3_3' && val.includes('regardent')) ||
      (item.id === 'g3_4' && val.includes('prends'));

    if (isExact || isAlt || containsCorrection) score3 += 1;
  });

  let score4 = 0;
  GRAMMAR_EXERCICE_4.forEach((item) => {
    const builtPhrase = (orderedTokens[item.id] || []).join(' ');
    const isCorrect = item.correctOrders.some(
      (order) => cleanStr(order) === cleanStr(builtPhrase)
    );
    if (isCorrect) score4 += 1;
  });

  const totalPoints = 6 + 6 + 4 + 3; // 19 points
  const earnedPoints = score1 + score2 + score3 + score4;

  const handleAddToken = (exId: string, word: string) => {
    const current = orderedTokens[exId] || [];
    setOrderedTokens({ ...orderedTokens, [exId]: [...current, word] });
  };

  const handleRemoveToken = (exId: string, indexToRemove: number) => {
    const current = orderedTokens[exId] || [];
    setOrderedTokens({
      ...orderedTokens,
      [exId]: current.filter((_, idx) => idx !== indexToRemove),
    });
  };

  const handleResetTokens = (exId: string) => {
    setOrderedTokens({ ...orderedTokens, [exId]: [] });
  };

  const handleVerify = () => {
    setIsVerified(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswersG1({ g1_1: '', g1_2: '', g1_3: '', g1_4: '', g1_5: '', g1_6: '' });
    setAnswersG2({ g2_1: '', g2_2: '', g2_3: '', g2_4: '', g2_5: '', g2_6: '' });
    setAnswersG3({ g3_1: '', g3_2: '', g3_3: '', g3_4: '' });
    setOrderedTokens({ g4_1: [], g4_2: [], g4_3: [] });
    setIsVerified(false);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-12">
      {/* Banner */}
      <div className="bg-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
          <span>Partie 4</span>
          <span aria-hidden="true">·</span>
          <span>Examen Cumulatif 9ème</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
          Grammaire & Conjugaison
        </h2>
        <p className="text-indigo-100 text-sm mt-2 max-w-2xl leading-relaxed">
          Révise les verbes pronominaux au présent, la conjugaison de réguliers en -ER, des auxiliaires être/avoir, du verbe prendre, ainsi que la correction d'erreurs fréquentes et l'ordre des phrases.
        </p>
      </div>

      {/* Mémos de cours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GRAMMAR_MEMOS.map((memo, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <BookMarked className="w-4 h-4" />
              <span>Rappel de cours</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{memo.title}</h3>
            <p className="text-xs text-slate-600">{memo.rule}</p>

            {memo.table ? (
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Sujet</th>
                      <th className="py-2 px-3">Pronom réfléchi</th>
                      <th className="py-2 px-3">Exemple</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {memo.table.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="py-1.5 px-3 font-semibold text-slate-900">{row.subject}</td>
                        <td className="py-1.5 px-3 font-mono font-medium text-indigo-600">{row.pronoun}</td>
                        <td className="py-1.5 px-3 italic">{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : memo.notes ? (
              <ul className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {memo.notes.map((note, nIdx) => (
                  <li key={nIdx} className="font-mono text-slate-800">
                    • {note}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      {/* Exercice 1 : Verbes pronominaux */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
            Exercice 1 (6 points)
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Conjugue les verbes pronominaux au présent
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            N’oublie pas d’accorder le pronom réfléchi (me, te, se, nous, vous, se) avec le sujet !
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
          {GRAMMAR_EXERCICE_1.map((item) => {
            const userVal = answersG1[item.id] || '';
            const isCorrect =
              cleanStr(userVal) === cleanStr(item.correct) ||
              item.alt?.some((a) => cleanStr(a) === cleanStr(userVal));

            return (
              <div
                key={item.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
              >
                <div className="flex flex-wrap items-center gap-1.5 font-medium text-slate-900">
                  <span className="font-bold">{item.subject}</span>
                  <input
                    type="text"
                    value={userVal}
                    onChange={(e) =>
                      setAnswersG1({ ...answersG1, [item.id]: e.target.value })
                    }
                    placeholder={item.verb}
                    className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-900 w-36 focus:border-indigo-500 focus:outline-hidden"
                  />
                  <span>{item.after}</span>
                </div>

                {isVerified && (
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/80">
                    <span className={isCorrect ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
                      {isCorrect ? '✓ Exact !' : `✗ Attendu : ${item.correct}`}
                    </span>
                    <span className="text-slate-400 text-xs hidden sm:inline">{item.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Exercice 2 : Verbes réguliers et auxiliaires */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
            Exercice 2 (6 points)
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Conjugue les verbes au présent
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Fais attention aux terminaisons selon chaque personne du singulier et du pluriel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
          {GRAMMAR_EXERCICE_2.map((item) => {
            const userVal = answersG2[item.id] || '';
            const isCorrect = cleanStr(userVal) === cleanStr(item.correct);

            return (
              <div
                key={item.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
              >
                <div className="flex flex-wrap items-center gap-1.5 font-medium text-slate-900">
                  <span className="font-bold">{item.subject}</span>
                  <input
                    type="text"
                    value={userVal}
                    onChange={(e) =>
                      setAnswersG2({ ...answersG2, [item.id]: e.target.value })
                    }
                    placeholder={item.verb}
                    className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-900 w-28 focus:border-indigo-500 focus:outline-hidden"
                  />
                  <span>{item.after}</span>
                </div>

                {isVerified && (
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/80">
                    <span className={isCorrect ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
                      {isCorrect ? '✓ Exact !' : `✗ Attendu : ${item.correct}`}
                    </span>
                    <span className="text-slate-400 text-xs hidden sm:inline">{item.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Exercice 3 : Trouve l'erreur et corrige */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
            Exercice 3 (4 points)
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Trouve l’erreur et réécris la phrase corrigée
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Identifie l'erreur de conjugaison ou d'accord dans chaque phrase et propose la version correcte.
          </p>
        </div>

        <div className="space-y-4">
          {GRAMMAR_EXERCICE_3.map((item) => {
            const userVal = answersG3[item.id] || '';
            const cleaned = cleanStr(userVal);
            const isCorrect =
              cleaned === cleanStr(item.correctedPhrase) ||
              item.alternativeCorrect?.some((alt) => cleanStr(alt) === cleaned) ||
              (item.id === 'g3_1' && cleaned.includes('brosses')) ||
              (item.id === 'g3_2' && (cleaned.includes('a treize') || cleaned.includes('a 13'))) ||
              (item.id === 'g3_3' && cleaned.includes('regardent')) ||
              (item.id === 'g3_4' && cleaned.includes('prends'));

            return (
              <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    Phrase avec erreur : <span className="text-rose-700 line-through decoration-rose-400">{item.original}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">1 point</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600">Correction →</span>
                  <input
                    type="text"
                    value={userVal}
                    onChange={(e) =>
                      setAnswersG3({ ...answersG3, [item.id]: e.target.value })
                    }
                    placeholder="Écris la phrase complète corrigée..."
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 font-medium focus:border-indigo-500 focus:outline-hidden"
                  />
                </div>

                {isVerified && (
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                        {isCorrect ? '✓ Phrase corrigée validée !' : '✗ Correction attendue :'}
                      </span>
                      <span className="font-semibold text-slate-900">{item.correctedPhrase}</span>
                    </div>
                    <p className="text-slate-500 italic">Règle : {item.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Exercice 4 : Remettre dans l'ordre */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
            Exercice 4 (3 points)
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Remets les mots dans l’ordre pour faire une phrase
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Clique sur les mots dans le bon ordre pour reconstruire chaque phrase.
          </p>
        </div>

        <div className="space-y-5">
          {GRAMMAR_EXERCICE_4.map((item, idx) => {
            const currentSelected = orderedTokens[item.id] || [];
            const remainingWords = item.words.filter((w) => {
              // count occurrences in item.words vs currentSelected
              const totalCount = item.words.filter((x) => x === w).length;
              const selectedCount = currentSelected.filter((x) => x === w).length;
              return selectedCount < totalCount;
            });

            const builtSentence = currentSelected.join(' ');
            const isCorrect = item.correctOrders.some(
              (o) => cleanStr(o) === cleanStr(builtSentence)
            );

            return (
              <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">Phrase {idx + 1} :</span>
                  <span className="text-slate-500 italic">{item.translation}</span>
                </div>

                {/* Built sentence area */}
                <div className="min-h-12 p-3 bg-white border border-dashed border-slate-300 rounded-xl flex flex-wrap items-center gap-1.5">
                  {currentSelected.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">
                      Clique sur les blocs ci-dessous pour composer la phrase...
                    </span>
                  ) : (
                    currentSelected.map((word, wIdx) => (
                      <button
                        key={wIdx}
                        onClick={() => handleRemoveToken(item.id, wIdx)}
                        className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-rose-50 text-indigo-900 hover:text-rose-700 border border-indigo-200 hover:border-rose-200 rounded-lg font-medium transition-colors cursor-pointer group flex items-center gap-1"
                        title="Cliquer pour retirer"
                      >
                        <span>{word}</span>
                        <X className="w-3 h-3 text-indigo-400 group-hover:text-rose-600" />
                      </button>
                    ))
                  )}
                </div>

                {/* Remaining word blocks to click */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {remainingWords.map((word, wIdx) => (
                      <button
                        key={wIdx}
                        onClick={() => handleAddToken(item.id, word)}
                        className="px-3 py-1.5 text-xs bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-800 font-semibold transition-all hover:scale-105 cursor-pointer shadow-2xs"
                      >
                        {word}
                      </button>
                    ))}
                  </div>

                  {currentSelected.length > 0 && (
                    <button
                      onClick={() => handleResetTokens(item.id)}
                      className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                      title="Effacer la phrase"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Réinitialiser</span>
                    </button>
                  )}
                </div>

                {isVerified && (
                  <div className="mt-2 text-xs p-2.5 bg-white border border-slate-200 rounded-lg">
                    <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                      {isCorrect ? '✓ Phrase correcte !' : '✗ Ordre attendu :'}
                    </span>{' '}
                    <span className="font-semibold text-slate-900">{item.correctOrders[0]}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification at end of tab */}
      <VerificationSummary
        sectionTitle="Grammaire & Conjugaison"
        earnedPoints={earnedPoints}
        totalPoints={totalPoints}
        isVerified={isVerified}
        onVerify={handleVerify}
        onReset={handleReset}
        customMessage="La grammaire et la conjugaison du présent sont indispensables pour réussir ton examen !"
      />
    </div>
  );
};
