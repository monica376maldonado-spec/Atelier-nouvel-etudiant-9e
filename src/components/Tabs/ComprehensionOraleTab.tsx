import React, { useState } from 'react';
import {
  AUDIO_TRACKS,
  VOCAB_ECOUTE_1,
  VOCAB_ECOUTE_2,
  VOCAB_ECOUTE_3,
  ORALE_EXERCICE_A,
  ORALE_EXERCICE_B,
  ORALE_EXERCICE_B_OPTIONS,
  ORALE_COMPREHENSION_QUESTIONS,
} from '../../data/workshopData';
import { AudioSimulator } from '../Shared/AudioSimulator';
import { VocabularySection } from '../Shared/VocabularySection';
import { VerificationSummary } from '../Shared/VerificationSummary';
import { Headphones, Check, X, Volume2, MessageSquare, BookOpen } from 'lucide-react';
import { speakFrench } from '../../utils/speech';

interface ComprehensionOraleTabProps {
  onNextTab: () => void;
}

export const ComprehensionOraleTab: React.FC<ComprehensionOraleTabProps> = ({ onNextTab }) => {
  // Exercice A (F ou I)
  const [answersA, setAnswersA] = useState<Record<string, string>>({
    oa1: '',
    oa2: '',
    oa3: '',
    oa4: '',
    oa5: '',
    oa6: '',
  });

  // Exercice B (mots à compléter)
  const [answersB, setAnswersB] = useState<Record<string, string>>({
    ob1: '',
    ob2: '',
    ob3: '',
    ob4: '',
    ob5: '',
    ob6_1: '',
    ob6_2: '',
  });

  // Exercice C (Questions d'écoute audio)
  const [answersC, setAnswersC] = useState<Record<string, string>>({
    oc1: '',
    oc2: '',
    oc3: '',
    oc4: '',
  });

  const [activeVocabTab, setActiveVocabTab] = useState<'e1' | 'e2' | 'e3'>('e1');
  const [isVerified, setIsVerified] = useState(false);

  const cleanStr = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  // Calculate scores
  let scoreA = 0;
  ORALE_EXERCICE_A.forEach((item) => {
    if (answersA[item.id]?.toUpperCase() === item.correct) {
      scoreA += 1;
    }
  });

  let scoreB = 0;
  if (cleanStr(answersB.ob1) === 'chanteuse') scoreB += 1;
  if (cleanStr(answersB.ob2) === 'rappeur') scoreB += 1;
  if (cleanStr(answersB.ob3) === 'paroles') scoreB += 1;
  if (cleanStr(answersB.ob4) === 'motive') scoreB += 1;
  if (cleanStr(answersB.ob5) === 'presente') scoreB += 1;
  if (cleanStr(answersB.ob6_1) === 'sac' && cleanStr(answersB.ob6_2) === 'baskets') {
    scoreB += 1;
  } else if (cleanStr(answersB.ob6_1) === 'sac' || cleanStr(answersB.ob6_2) === 'baskets') {
    scoreB += 0.5;
  }

  let scoreC = 0;
  ORALE_COMPREHENSION_QUESTIONS.forEach((q) => {
    if (answersC[q.id] === q.correctOption) {
      scoreC += 1;
    }
  });

  const totalPoints = 6 + 6 + 4; // 16 points
  const earnedPoints = scoreA + Math.round(scoreB) + scoreC;

  const handleVerify = () => {
    setIsVerified(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswersA({ oa1: '', oa2: '', oa3: '', oa4: '', oa5: '', oa6: '' });
    setAnswersB({
      ob1: '',
      ob2: '',
      ob3: '',
      ob4: '',
      ob5: '',
      ob6_1: '',
      ob6_2: '',
    });
    setAnswersC({ oc1: '', oc2: '', oc3: '', oc4: '' });
    setIsVerified(false);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-12">
      {/* Intro header */}
      <div className="bg-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
          <span>Partie 2</span>
          <span aria-hidden="true">·</span>
          <span>Examen Cumulatif 9ème</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
          Compréhension orale
        </h2>
        <p className="text-indigo-100 text-sm mt-2 max-w-2xl leading-relaxed">
          Entraîne-toi à l’écoute grâce aux simulateurs audio interactifs basés sur les trois écoutes de l'atelier : musique et artistes, cours de sport et présentation, salutations formelles et informelles.
        </p>
      </div>

      {/* 2.1 Vocabulaire des trois écoutes */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <BookOpen className="w-3.5 h-3.5" />
              <span>2.1 Vocabulaire des trois écoutes</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Lexique ciblé par enregistrement
            </h3>
          </div>

          {/* Tab selector for Ecoute 1, 2, 3 */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveVocabTab('e1')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeVocabTab === 'e1'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Écoute 1 : Musique
            </button>
            <button
              onClick={() => setActiveVocabTab('e2')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeVocabTab === 'e2'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Écoute 2 : Sport
            </button>
            <button
              onClick={() => setActiveVocabTab('e3')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeVocabTab === 'e3'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Écoute 3 : Salutations
            </button>
          </div>
        </div>

        {/* Content depending on selected vocab tab */}
        {activeVocabTab === 'e1' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-500 font-medium">
              12 mots clés sur les goûts musicaux, les artistes et les émotions.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {VOCAB_ECOUTE_1.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-xs text-slate-900">{item.word}</span>
                    <button
                      onClick={() => speakFrench(item.word)}
                      className="text-slate-400 hover:text-indigo-600 p-1"
                      title="Écouter"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">{item.definition}</div>
                  <div className="mt-2 pt-2 border-t border-slate-200 text-xs font-medium text-emerald-700">
                    {item.es}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeVocabTab === 'e2' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-500 font-medium">
              11 mots clés pour le cours de sport et la présentation.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {VOCAB_ECOUTE_2.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-xs text-slate-900">{item.word}</span>
                    <button
                      onClick={() => speakFrench(item.word)}
                      className="text-slate-400 hover:text-indigo-600 p-1"
                      title="Écouter"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">{item.definition}</div>
                  <div className="mt-2 pt-2 border-t border-slate-200 text-xs font-medium text-emerald-700">
                    {item.es}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeVocabTab === 'e3' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-500 font-medium">
              Expressions de salutations : distinguer l'usage avec un adulte (formel « vous ») et entre amis (informel « tu »).
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Expression</th>
                    <th className="py-2.5 px-3">Quand l'utiliser ?</th>
                    <th className="py-2.5 px-3">Español</th>
                    <th className="py-2.5 px-3 text-right">Audio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {VOCAB_ECOUTE_3.map((exp, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {exp.expression}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{exp.quand}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">{exp.es}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => speakFrench(exp.expression)}
                          className="p-1 text-slate-400 hover:text-indigo-600 rounded-md"
                          title="Écouter"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Simulateurs audio des 3 écoutes */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Headphones className="w-5 h-5 text-indigo-600" />
          <h3 className="text-xl font-bold text-slate-900">
            Simulateurs d'écoute audio
          </h3>
        </div>
        <p className="text-xs text-slate-600 -mt-4">
          Écoute attentivement chaque document sonore avant de répondre aux exercices.
        </p>

        <div className="space-y-4">
          {AUDIO_TRACKS.map((track) => (
            <AudioSimulator key={track.id} track={track} />
          ))}
        </div>
      </div>

      {/* 2.2 Exercices de vocabulaire */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>2.2 Exercices de vocabulaire</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Exercice A. Formel (on dit « vous ») ou informel (on dit « tu ») ?
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Indique pour chaque situation s'il s'agit d'un registre formel (<strong>F</strong>) ou informel (<strong>I</strong>).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {ORALE_EXERCICE_A.map((item) => {
            const userChoice = answersA[item.id] || '';
            const isCorrect = userChoice.toUpperCase() === item.correct;
            return (
              <div
                key={item.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-2 pr-2">
                  <span className="font-semibold text-xs sm:text-sm text-slate-900">
                    {item.phrase}
                  </span>
                  <button
                    onClick={() => speakFrench(item.phrase)}
                    className="p-1 text-slate-400 hover:text-indigo-600 rounded-md"
                    title="Écouter la réplique"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex bg-white rounded-lg border border-slate-300 p-0.5">
                    <button
                      onClick={() => setAnswersA({ ...answersA, [item.id]: 'F' })}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                        userChoice === 'F'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      F
                    </button>
                    <button
                      onClick={() => setAnswersA({ ...answersA, [item.id]: 'I' })}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                        userChoice === 'I'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      I
                    </button>
                  </div>

                  {isVerified && (
                    <div>
                      {isCorrect ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div
                          className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center"
                          title={`Réponse attendue : ${item.correct} - ${item.explanation}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {isVerified && (
          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
            <strong>Explications :</strong>
            <p>• 1, 4, 6 sont <strong>Formels (F)</strong> car on emploie les formules de politesse « madame », « monsieur » ou le pronom « vous ».</p>
            <p>• 2, 3, 5 sont <strong>Informels (I)</strong> car on s'adresse à des pairs avec « salut », « coucou » ou « les amis ».</p>
          </div>
        )}
      </div>

      {/* Exercice B */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Exercice B. Complète avec les mots du lexique
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Mots disponibles :
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {ORALE_EXERCICE_B_OPTIONS.map((opt) => (
              <span
                key={opt}
                className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md border border-indigo-100"
              >
                {opt}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-800">
          {/* 1 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>1. Angèle est une</span>
            <input
              type="text"
              value={answersB.ob1}
              onChange={(e) => setAnswersB({ ...answersB, ob1: e.target.value })}
              placeholder="chanteuse..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-28 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>belge.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.ob1) === 'chanteuse' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (chanteuse)</span>
                )}
              </span>
            )}
          </div>

          {/* 2 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>2. Soprano est un</span>
            <input
              type="text"
              value={answersB.ob2}
              onChange={(e) => setAnswersB({ ...answersB, ob2: e.target.value })}
              placeholder="rappeur..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-28 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>français.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.ob2) === 'rappeur' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (rappeur)</span>
                )}
              </span>
            )}
          </div>

          {/* 3 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>3. Les</span>
            <input
              type="text"
              value={answersB.ob3}
              onChange={(e) => setAnswersB({ ...answersB, ob3: e.target.value })}
              placeholder="paroles..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-28 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>de cette chanson sont très belles.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.ob3) === 'paroles' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (paroles)</span>
                )}
              </span>
            )}
          </div>

          {/* 4 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>4. Cette chanson me</span>
            <input
              type="text"
              value={answersB.ob4}
              onChange={(e) => setAnswersB({ ...answersB, ob4: e.target.value })}
              placeholder="motive..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-28 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>quand j'ai des doutes.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.ob4) === 'motive' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (motive)</span>
                )}
              </span>
            )}
          </div>

          {/* 5 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>5. Le prof</span>
            <input
              type="text"
              value={answersB.ob5}
              onChange={(e) => setAnswersB({ ...answersB, ob5: e.target.value })}
              placeholder="présente..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-28 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>un nouvel élève à la classe.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.ob5) === 'presente' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (présente)</span>
                )}
              </span>
            )}
          </div>

          {/* 6 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>6. Dans mon</span>
            <input
              type="text"
              value={answersB.ob6_1}
              onChange={(e) => setAnswersB({ ...answersB, ob6_1: e.target.value })}
              placeholder="sac..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-24 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>, il y a mes</span>
            <input
              type="text"
              value={answersB.ob6_2}
              onChange={(e) => setAnswersB({ ...answersB, ob6_2: e.target.value })}
              placeholder="baskets..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-24 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>de sport.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.ob6_1) === 'sac' && cleanStr(answersB.ob6_2) === 'baskets' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (sac / baskets)</span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Exercice C : Questions d'écoute */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Exercice C. Questions de compréhension des documents audio
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Réponds aux questions en t'appuyant sur les dialogues entendus dans les simulateurs.
          </p>
        </div>

        <div className="space-y-5">
          {ORALE_COMPREHENSION_QUESTIONS.map((q, idx) => {
            const userChoice = answersC[q.id];
            const isCorrect = userChoice === q.correctOption;
            return (
              <div key={q.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="font-semibold text-xs sm:text-sm text-slate-900">
                  {idx + 1}. {q.question}
                </div>
                <div className="space-y-1.5">
                  {q.options.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 text-xs sm:text-sm"
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.id}
                        checked={userChoice === opt.id}
                        onChange={() => setAnswersC({ ...answersC, [q.id]: opt.id })}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{opt.text}</span>
                    </label>
                  ))}
                </div>

                {isVerified && (
                  <div className="mt-2 text-xs p-2 rounded-md bg-white border border-slate-200">
                    <span className="font-bold text-emerald-700">
                      {isCorrect ? '✓ Exact !' : `✗ Réponse ${q.correctOption}.`}
                    </span>{' '}
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification at end of tab */}
      <VerificationSummary
        sectionTitle="Compréhension orale"
        earnedPoints={earnedPoints}
        totalPoints={totalPoints}
        isVerified={isVerified}
        onVerify={handleVerify}
        onReset={handleReset}
        onNextSection={onNextTab}
        nextSectionLabel="Production écrite"
      />
    </div>
  );
};
