import React, { useState } from 'react';
import {
  VOCAB_ECRITE,
  MATCHING_DEFINITIONS,
  ECRITE_EXERCICE_A,
  ECRITE_EXERCICE_B,
  ECRITE_EXERCICE_B_OPTIONS,
  TEXTE_LUCAS,
  TEXTE_LUCAS_QUESTIONS,
} from '../../data/workshopData';
import { VocabularySection } from '../Shared/VocabularySection';
import { VerificationSummary } from '../Shared/VerificationSummary';
import { Volume2, Check, X, HelpCircle, BookOpen, Clock, FileCheck } from 'lucide-react';
import { speakFrench } from '../../utils/speech';

interface ComprehensionEcriteTabProps {
  onNextTab: () => void;
}

export const ComprehensionEcriteTab: React.FC<ComprehensionEcriteTabProps> = ({ onNextTab }) => {
  // Exercice A state
  const [answersA, setAnswersA] = useState<Record<string, string>>({
    ea1: '',
    ea2: '',
    ea3: '',
    ea4: '',
    ea5: '',
    ea6: '',
  });

  // Exercice B state
  const [answersB, setAnswersB] = useState<Record<string, string>>({
    eb1: '',
    eb2: '',
    eb3_1: '',
    eb3_2: '',
    eb4: '',
    eb5: '',
    eb6_1: '',
    eb6_2: '',
  });

  // Text comprehension questions state
  const [answersText, setAnswersText] = useState<{
    q1: string;
    q2_choice: 'VRAI' | 'FAUX' | '';
    q2_justif: string;
    q3: string;
    q4_choice: 'VRAI' | 'FAUX' | '';
    q4_justif: string;
    q5: string;
    q6: string;
    q7_choice: 'VRAI' | 'FAUX' | '';
    q7_justif: string;
    q8: string;
    q9: string;
  }>({
    q1: '',
    q2_choice: '',
    q2_justif: '',
    q3: '',
    q4_choice: '',
    q4_justif: '',
    q5: '',
    q6: '',
    q7_choice: '',
    q7_justif: '',
    q8: '',
    q9: '',
  });

  // Verification state
  const [isVerified, setIsVerified] = useState(false);

  // Normalize string helper
  const cleanStr = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/['’]/g, "'");

  // Calculate scores
  let scoreA = 0;
  ECRITE_EXERCICE_A.forEach((item) => {
    if (answersA[item.id]?.toUpperCase() === item.correctLetter) {
      scoreA += 1;
    }
  });

  let scoreB = 0;
  if (cleanStr(answersB.eb1) === 'se leve') scoreB += 1;
  if (cleanStr(answersB.eb2) === 'prend') scoreB += 1;
  if (cleanStr(answersB.eb3_1) === 'pres') scoreB += 1;
  if (cleanStr(answersB.eb3_2) === 'a pied') scoreB += 1;
  if (cleanStr(answersB.eb4) === 'dure') scoreB += 1;
  if (cleanStr(answersB.eb5) === 'dejeune') scoreB += 1;
  if (cleanStr(answersB.eb6_1) === 'fatigue') scoreB += 1;
  if (cleanStr(answersB.eb6_2) === 'eteint') scoreB += 1;

  let scoreText = 0;
  // Q1
  if (cleanStr(answersText.q1).includes('6h45') || cleanStr(answersText.q1).includes('6 h 45') || cleanStr(answersText.q1).includes('quarante-cinq')) {
    scoreText += 1;
  }
  // Q2
  if (answersText.q2_choice === 'FAUX') {
    scoreText += 0.5;
    if (cleanStr(answersText.q2_justif).includes('tot') || cleanStr(answersText.q2_justif).includes('toujours') || cleanStr(answersText.q2_justif).includes('week-end')) {
      scoreText += 0.5;
    }
  }
  // Q3
  if (answersText.q3 === 'a') scoreText += 1;
  // Q4
  if (answersText.q4_choice === 'FAUX') {
    scoreText += 0.5;
    if (cleanStr(answersText.q4_justif).includes('loin')) {
      scoreText += 0.5;
    }
  }
  // Q5
  if (answersText.q5 === 'b') scoreText += 1;
  // Q6
  if (answersText.q6 === 'b') scoreText += 1;
  // Q7
  if (answersText.q7_choice === 'FAUX') {
    scoreText += 0.5;
    if (cleanStr(answersText.q7_justif).includes('gouter') || cleanStr(answersText.q7_justif).includes('puis') || cleanStr(answersText.q7_justif).includes('16h30')) {
      scoreText += 0.5;
    }
  }
  // Q8
  if (answersText.q8 === 'a') scoreText += 1;
  // Q9
  if (cleanStr(answersText.q9).includes('musique') || cleanStr(answersText.q9).includes('ecouter')) {
    scoreText += 1;
  }

  const totalPoints = 6 + 8 + 9; // 23 points
  const earnedPoints = scoreA + scoreB + Math.round(scoreText);

  const handleVerify = () => {
    setIsVerified(true);
    // Smooth scroll to results
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswersA({ ea1: '', ea2: '', ea3: '', ea4: '', ea5: '', ea6: '' });
    setAnswersB({
      eb1: '',
      eb2: '',
      eb3_1: '',
      eb3_2: '',
      eb4: '',
      eb5: '',
      eb6_1: '',
      eb6_2: '',
    });
    setAnswersText({
      q1: '',
      q2_choice: '',
      q2_justif: '',
      q3: '',
      q4_choice: '',
      q4_justif: '',
      q5: '',
      q6: '',
      q7_choice: '',
      q7_justif: '',
      q8: '',
      q9: '',
    });
    setIsVerified(false);
  };

  const handleReadFullStory = () => {
    const fullText = TEXTE_LUCAS.paragraphs.join(' ');
    speakFrench(fullText, 0.9);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-12">
      {/* Introduction banner */}
      <div className="bg-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
          <span>Partie 1</span>
          <span aria-hidden="true">·</span>
          <span>Examen Cumulatif 9ème</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
          Compréhension écrite
        </h2>
        <p className="text-indigo-100 text-sm mt-2 max-w-2xl leading-relaxed">
          Cette section comprend le lexique officiel de la routine quotidienne, des exercices d'association et de phrases à trous, ainsi que le texte de lecture « La journée de Lucas à l’école » avec 9 questions de compréhension.
        </p>
      </div>

      {/* 1.1 Lexique interactif */}
      <VocabularySection
        items={VOCAB_ECRITE}
        title="1.1 Vocabulaire du texte (La journée scolaire & la routine)"
        subtitle="22 mots clés du document officiel. Écoute leur prononciation et découvre la traduction en espagnol."
      />

      {/* 1.2 Exercices de vocabulaire */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <FileCheck className="w-3.5 h-3.5" />
            <span>1.2 Exercices de vocabulaire</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Exercice A. Associe chaque mot à sa définition
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Sélectionne la lettre correspondante (A, B, C, D, E ou F) pour chaque mot.
          </p>
        </div>

        {/* Reference definitions box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="text-xs font-bold text-slate-700 mb-2">Définitions de référence :</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {MATCHING_DEFINITIONS.map((def) => (
              <div key={def.letter} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200/80">
                <span className="font-bold text-indigo-600 w-5">{def.letter}.</span>
                <span className="text-slate-700">{def.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Association questions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ECRITE_EXERCICE_A.map((item) => {
            const userVal = answersA[item.id] || '';
            const isCorrect = userVal.toUpperCase() === item.correctLetter;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <span className="font-semibold text-xs sm:text-sm text-slate-900">
                  {item.word}
                </span>

                <div className="flex items-center gap-2">
                  <select
                    value={userVal}
                    onChange={(e) =>
                      setAnswersA({ ...answersA, [item.id]: e.target.value.toUpperCase() })
                    }
                    className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-indigo-500"
                    aria-label={`Lettre pour ${item.word}`}
                  >
                    <option value="">Choisir...</option>
                    {MATCHING_DEFINITIONS.map((d) => (
                      <option key={d.letter} value={d.letter}>
                        {d.letter}
                      </option>
                    ))}
                  </select>

                  {isVerified && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div
                          className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center"
                          title={`Réponse correcte : ${item.correctLetter}`}
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
          <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong>Corrigé de l'Exercice A :</strong> 1-F (le réveil), 2-D (le trajet), 3-B (la cantine), 4-A (le goûter), 5-C (la récréation), 6-E (les devoirs).
          </div>
        )}
      </div>

      {/* Exercice B */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Exercice B. Complète les phrases avec les mots proposés
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Mots à utiliser :
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {ECRITE_EXERCICE_B_OPTIONS.map((opt) => (
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
          {/* Sentence 1 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>1. Pablo</span>
            <input
              type="text"
              value={answersB.eb1}
              onChange={(e) => setAnswersB({ ...answersB, eb1: e.target.value })}
              placeholder="se lève..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-28 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>à six heures et demie.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.eb1) === 'se leve' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (se lève)</span>
                )}
              </span>
            )}
          </div>

          {/* Sentence 2 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>2. Il</span>
            <input
              type="text"
              value={answersB.eb2}
              onChange={(e) => setAnswersB({ ...answersB, eb2: e.target.value })}
              placeholder="prend..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-24 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>son petit-déjeuner à sept heures.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.eb2) === 'prend' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (prend)</span>
                )}
              </span>
            )}
          </div>

          {/* Sentence 3 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>3. Il habite</span>
            <input
              type="text"
              value={answersB.eb3_1}
              onChange={(e) => setAnswersB({ ...answersB, eb3_1: e.target.value })}
              placeholder="près..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-20 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>de l'école, alors il va à l'école</span>
            <input
              type="text"
              value={answersB.eb3_2}
              onChange={(e) => setAnswersB({ ...answersB, eb3_2: e.target.value })}
              placeholder="à pied..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-24 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.eb3_1) === 'pres' && cleanStr(answersB.eb3_2) === 'a pied' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (près / à pied)</span>
                )}
              </span>
            )}
          </div>

          {/* Sentence 4 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>4. Le trajet</span>
            <input
              type="text"
              value={answersB.eb4}
              onChange={(e) => setAnswersB({ ...answersB, eb4: e.target.value })}
              placeholder="dure..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-20 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>dix minutes.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.eb4) === 'dure' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (dure)</span>
                )}
              </span>
            )}
          </div>

          {/* Sentence 5 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>5. À midi, il</span>
            <input
              type="text"
              value={answersB.eb5}
              onChange={(e) => setAnswersB({ ...answersB, eb5: e.target.value })}
              placeholder="déjeune..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-24 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>à la cantine.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.eb5) === 'dejeune' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (déjeune)</span>
                )}
              </span>
            )}
          </div>

          {/* Sentence 6 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
            <span>6. Le soir, il est</span>
            <input
              type="text"
              value={answersB.eb6_1}
              onChange={(e) => setAnswersB({ ...answersB, eb6_1: e.target.value })}
              placeholder="fatigué..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-24 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>et il</span>
            <input
              type="text"
              value={answersB.eb6_2}
              onChange={(e) => setAnswersB({ ...answersB, eb6_2: e.target.value })}
              placeholder="éteint..."
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium w-24 focus:border-indigo-500 focus:outline-hidden"
            />
            <span>la lumière à neuf heures.</span>
            {isVerified && (
              <span className="text-xs font-semibold ml-2">
                {cleanStr(answersB.eb6_1) === 'fatigue' && cleanStr(answersB.eb6_2) === 'eteint' ? (
                  <span className="text-emerald-700">✓ Correct</span>
                ) : (
                  <span className="text-rose-700">✗ (fatigué / éteint)</span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 1.3 Texte pour pratiquer : La journée de Lucas à l'école */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <BookOpen className="w-3.5 h-3.5" />
              <span>1.3 Texte de compréhension</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              {TEXTE_LUCAS.title}
            </h3>
          </div>
          <button
            onClick={handleReadFullStory}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4" />
            <span>Écouter le texte complet</span>
          </button>
        </div>

        {/* Narrative text card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm sm:text-base text-slate-800 leading-relaxed space-y-3 font-serif">
          {TEXTE_LUCAS.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* 9 Questions */}
        <div className="space-y-6 pt-4">
          <h4 className="text-base font-bold text-slate-900">
            Questions sur le texte (9 points)
          </h4>

          {/* Q1 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900 flex justify-between">
              <span>1. À quelle heure le réveil de Lucas sonne-t-il ? (1 point)</span>
            </div>
            <input
              type="text"
              value={answersText.q1}
              onChange={(e) => setAnswersText({ ...answersText, q1: e.target.value })}
              placeholder="Écris ta réponse..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-indigo-500"
            />
            {isVerified && (
              <div className="mt-2 text-xs p-2 rounded-md bg-white border border-slate-200">
                <span className="font-bold text-indigo-700">Réponse attendue :</span> {TEXTE_LUCAS_QUESTIONS.q1.modelAnswer}
              </div>
            )}
          </div>

          {/* Q2 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900">
              2. Lucas se lève tard le week-end. VRAI / FAUX (1 point)
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="q2"
                  value="VRAI"
                  checked={answersText.q2_choice === 'VRAI'}
                  onChange={() => setAnswersText({ ...answersText, q2_choice: 'VRAI' })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold">VRAI</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="q2"
                  value="FAUX"
                  checked={answersText.q2_choice === 'FAUX'}
                  onChange={() => setAnswersText({ ...answersText, q2_choice: 'FAUX' })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold">FAUX</span>
              </label>
            </div>
            <div>
              <span className="block text-xs text-slate-600 mb-1">
                Justification (une phrase du texte) :
              </span>
              <input
                type="text"
                value={answersText.q2_justif}
                onChange={(e) => setAnswersText({ ...answersText, q2_justif: e.target.value })}
                placeholder="Ex : « Lucas se lève toujours tôt... »"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
            {isVerified && (
              <div className="mt-2 text-xs p-2 rounded-md bg-white border border-slate-200">
                <span className="font-bold text-emerald-700">FAUX.</span> Justification : {TEXTE_LUCAS_QUESTIONS.q2.modelJustification}
              </div>
            )}
          </div>

          {/* Q3 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900">
              3. Qu’est-ce que Lucas fait le matin ? (1 point)
            </div>
            <div className="space-y-1.5">
              {TEXTE_LUCAS_QUESTIONS.q3.options.map((opt) => (
                <label key={opt.id} className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200/80 cursor-pointer hover:bg-slate-100/60">
                  <input
                    type="radio"
                    name="q3"
                    value={opt.id}
                    checked={answersText.q3 === opt.id}
                    onChange={() => setAnswersText({ ...answersText, q3: opt.id })}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>
            {isVerified && (
              <div className="mt-2 text-xs p-2 rounded-md bg-white border border-slate-200">
                <span className="font-bold text-emerald-700">Réponse a.</span> {TEXTE_LUCAS_QUESTIONS.q3.explanation}
              </div>
            )}
          </div>

          {/* Q4 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900">
              4. Lucas habite près de son école. VRAI / FAUX (1 point)
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="q4"
                  value="VRAI"
                  checked={answersText.q4_choice === 'VRAI'}
                  onChange={() => setAnswersText({ ...answersText, q4_choice: 'VRAI' })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold">VRAI</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="q4"
                  value="FAUX"
                  checked={answersText.q4_choice === 'FAUX'}
                  onChange={() => setAnswersText({ ...answersText, q4_choice: 'FAUX' })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold">FAUX</span>
              </label>
            </div>
            <div>
              <span className="block text-xs text-slate-600 mb-1">
                Justification (une phrase du texte) :
              </span>
              <input
                type="text"
                value={answersText.q4_justif}
                onChange={(e) => setAnswersText({ ...answersText, q4_justif: e.target.value })}
                placeholder="Ex : « Lucas habite loin de son école. »"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
            {isVerified && (
              <div className="mt-2 text-xs p-2 rounded-md bg-white border border-slate-200">
                <span className="font-bold text-emerald-700">FAUX.</span> Justification : {TEXTE_LUCAS_QUESTIONS.q4.modelJustification}
              </div>
            )}
          </div>

          {/* Q5 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900">
              5. Comment Lucas va-t-il à l’école ? (1 point)
            </div>
            <div className="space-y-1.5">
              {TEXTE_LUCAS_QUESTIONS.q5.options.map((opt) => (
                <label key={opt.id} className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200/80 cursor-pointer hover:bg-slate-100/60">
                  <input
                    type="radio"
                    name="q5"
                    value={opt.id}
                    checked={answersText.q5 === opt.id}
                    onChange={() => setAnswersText({ ...answersText, q5: opt.id })}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>
            {isVerified && (
              <div className="mt-2 text-xs p-2 rounded-md bg-white border border-slate-200">
                <span className="font-bold text-emerald-700">Réponse b.</span> {TEXTE_LUCAS_QUESTIONS.q5.explanation}
              </div>
            )}
          </div>

          {/* Q6 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900">
              6. Où Lucas déjeune-t-il à midi ? (1 point)
            </div>
            <div className="space-y-1.5">
              {TEXTE_LUCAS_QUESTIONS.q6.options.map((opt) => (
                <label key={opt.id} className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200/80 cursor-pointer hover:bg-slate-100/60">
                  <input
                    type="radio"
                    name="q6"
                    value={opt.id}
                    checked={answersText.q6 === opt.id}
                    onChange={() => setAnswersText({ ...answersText, q6: opt.id })}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>
            {isVerified && (
              <div className="mt-2 text-xs p-2 rounded-md bg-white border border-slate-200">
                <span className="font-bold text-emerald-700">Réponse b.</span> {TEXTE_LUCAS_QUESTIONS.q6.explanation}
              </div>
            )}
          </div>

          {/* Q7 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900">
              7. Lucas fait ses devoirs avant le goûter. VRAI / FAUX (1 point)
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="q7"
                  value="VRAI"
                  checked={answersText.q7_choice === 'VRAI'}
                  onChange={() => setAnswersText({ ...answersText, q7_choice: 'VRAI' })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold">VRAI</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="q7"
                  value="FAUX"
                  checked={answersText.q7_choice === 'FAUX'}
                  onChange={() => setAnswersText({ ...answersText, q7_choice: 'FAUX' })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold">FAUX</span>
              </label>
            </div>
            <div>
              <span className="block text-xs text-slate-600 mb-1">
                Justification (une phrase du texte) :
              </span>
              <input
                type="text"
                value={answersText.q7_justif}
                onChange={(e) => setAnswersText({ ...answersText, q7_justif: e.target.value })}
                placeholder="Ex : « Il prend son goûter à 16h30, puis il fait ses devoirs... »"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
            {isVerified && (
              <div className="mt-2 text-xs p-2 rounded-md bg-white border border-slate-200">
                <span className="font-bold text-emerald-700">FAUX.</span> Justification : {TEXTE_LUCAS_QUESTIONS.q7.modelJustification}
              </div>
            )}
          </div>

          {/* Q8 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900">
              8. À quelle heure toute la famille passe-t-elle à table ? (1 point)
            </div>
            <div className="space-y-1.5">
              {TEXTE_LUCAS_QUESTIONS.q8.options.map((opt) => (
                <label key={opt.id} className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200/80 cursor-pointer hover:bg-slate-100/60">
                  <input
                    type="radio"
                    name="q8"
                    value={opt.id}
                    checked={answersText.q8 === opt.id}
                    onChange={() => setAnswersText({ ...answersText, q8: opt.id })}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>
            {isVerified && (
              <div className="mt-2 text-xs p-2 rounded-md bg-white border border-slate-200">
                <span className="font-bold text-emerald-700">Réponse a.</span> {TEXTE_LUCAS_QUESTIONS.q8.explanation}
              </div>
            )}
          </div>

          {/* Q9 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900">
              9. Qu’est-ce que Lucas aime faire avant de dormir ? (1 point)
            </div>
            <input
              type="text"
              value={answersText.q9}
              onChange={(e) => setAnswersText({ ...answersText, q9: e.target.value })}
              placeholder="Écris ta réponse..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-indigo-500"
            />
            {isVerified && (
              <div className="mt-2 text-xs p-2 rounded-md bg-white border border-slate-200">
                <span className="font-bold text-indigo-700">Réponse attendue :</span> {TEXTE_LUCAS_QUESTIONS.q9.modelAnswer}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Verification Summary at the end of the tab */}
      <VerificationSummary
        sectionTitle="Compréhension écrite"
        earnedPoints={earnedPoints}
        totalPoints={totalPoints}
        isVerified={isVerified}
        onVerify={handleVerify}
        onReset={handleReset}
        onNextSection={onNextTab}
        nextSectionLabel="Compréhension orale"
      />
    </div>
  );
};
