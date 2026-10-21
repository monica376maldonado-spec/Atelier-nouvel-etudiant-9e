import React, { useState, useMemo } from 'react';
import { PRODUCTION_GUIDE } from '../../data/workshopData';
import { VerificationSummary } from '../Shared/VerificationSummary';
import {
  PenTool,
  CheckSquare,
  Sparkles,
  Volume2,
  Copy,
  Check,
  BookOpen,
  HelpCircle,
  Clock,
  ArrowRight,
  ListChecks,
} from 'lucide-react';
import { speakFrench } from '../../utils/speech';

interface ProductionEcriteTabProps {
  onNextTab: () => void;
}

export const ProductionEcriteTab: React.FC<ProductionEcriteTabProps> = ({ onNextTab }) => {
  // Free text writing state
  const [essayText, setEssayText] = useState<string>(
    "Bonjour, je m'appelle "
  );

  // Scaffolded phrases state
  const [scaffoldAnswers, setScaffoldAnswers] = useState<Record<string, string>>({
    s1_name: '',
    s1_age: '',
    s2_verb: 'réveille',
    s2_hour: '6h30',
    s2_action: 'prends mon petit-déjeuner',
    s3_verb: 'vais',
    s3_hour: '7h50',
    s4_cours: 'cours',
    s4_hour: '15h',
    s4_action: 'fais mes devoirs',
    s5_action: 'dîne avec mes parents',
    s5_hour: '19h30',
    s5_verb: 'couche',
    s5_bedHour: '21h30',
  });

  // User manual checklist checks
  const [manualChecks, setManualChecks] = useState<Record<string, boolean>>({
    c1: false,
    c2: false,
    c3: false,
    c4: false,
    c5: false,
    c6: false,
  });

  const [activeTabMode, setActiveTabMode] = useState<'editor' | 'scaffold'>('editor');
  const [copied, setCopied] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Live text analysis
  const analysis = useMemo(() => {
    const text = essayText.trim();
    const words = text ? text.split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;

    const lower = text.toLowerCase();

    // Connectors detection
    const connectorsList = ["d'abord", 'ensuite', 'puis', 'apres', 'après', 'enfin', 'alors', 'aussi'];
    const foundConnectors = connectorsList.filter((c) => lower.includes(c));

    // Time/hours detection
    const hourRegex = /(\b\d{1,2}\s*h(\s*\d{2})?\b)|(\bmidi\b)|(\bheures?\b)/gi;
    const foundHours = text.match(hourRegex) || [];

    // Parts of the day detection
    const hasMatin = lower.includes('matin');
    const hasApresMidi = lower.includes('apres-midi') || lower.includes('après-midi') || lower.includes('midi');
    const hasSoir = lower.includes('soir');
    const hasPresentation = lower.includes("m'appelle") || lower.includes('m’appelle') || lower.includes('ans');

    // Pronominal verbs detection
    const pronominalList = [
      'me reveille', 'me réveille',
      'me leve', 'me lève',
      'me brosse',
      "m'habille", 'm’habille',
      'me lave',
      'me depeche', 'me dépêche',
      'me couche',
    ];
    const foundPronominals = pronominalList.filter((p) => lower.includes(p));

    // Key verbs
    const hasEtre = lower.includes('suis') || lower.includes('es ') || lower.includes('est ');
    const hasAvoir = lower.includes("j'ai") || lower.includes('j’ai') || lower.includes('as ') || lower.includes('a ');
    const hasPrendre = lower.includes('prends') || lower.includes('prend ');
    const hasErVerb = lower.includes('mange') || lower.includes('arrive') || lower.includes('ecoute') || lower.includes('écoute') || lower.includes('etudie') || lower.includes('étudie') || lower.includes('regarde') || lower.includes('dine') || lower.includes('dîne');

    // Calculated criteria satisfaction
    const critStructure = hasPresentation && hasMatin && (hasApresMidi || lower.includes('cours')) && hasSoir;
    const critHours = foundHours.length >= 2;
    const critConnectors = foundConnectors.length >= 3;
    const critVerbs = foundPronominals.length >= 1 && (hasEtre || hasAvoir || hasPrendre) && hasErVerb;
    const critWordCount = wordCount >= 60; // target is ~80 words

    return {
      wordCount,
      foundConnectors,
      foundHours,
      hasPresentation,
      hasMatin,
      hasApresMidi,
      hasSoir,
      foundPronominals,
      hasEtre,
      hasAvoir,
      hasPrendre,
      hasErVerb,
      critStructure,
      critHours,
      critConnectors,
      critVerbs,
      critWordCount,
    };
  }, [essayText]);

  // Handle inserting helper chips into essay
  const handleInsertPhrase = (phrase: string) => {
    setEssayText((prev) => {
      const cleanPrev = prev.trimEnd();
      const separator = cleanPrev.endsWith('.') || cleanPrev.endsWith(',') || cleanPrev === '' ? ' ' : ' ';
      return `${cleanPrev}${separator}${phrase} `;
    });
  };

  // Compile scaffold into essay
  const handleCompileScaffold = () => {
    const s = scaffoldAnswers;
    const name = s.s1_name || 'Lucas';
    const age = s.s1_age || '14';
    const compiled = `Bonjour, je m'appelle ${name} et j'ai ${age} ans. Le matin, je me ${s.s2_verb} à ${s.s2_hour}. Puis, je ${s.s2_action}. Ensuite, je ${s.s3_verb} à l'école. J'arrive à ${s.s3_hour}. L'après-midi, j'ai ${s.s4_cours} jusqu'à ${s.s4_hour}. Après, je ${s.s4_action}. Le soir, je ${s.s5_action} à ${s.s5_hour}. Enfin, je me ${s.s5_verb} à ${s.s5_bedHour}.`;
    setEssayText(compiled);
    setActiveTabMode('editor');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(essayText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleListenEssay = () => {
    speakFrench(essayText, 0.9);
  };

  // Verification points calculation
  let earnedPoints = 0;
  if (analysis.critStructure) earnedPoints += 2;
  if (analysis.critHours) earnedPoints += 2;
  if (analysis.critConnectors) earnedPoints += 2;
  if (analysis.critVerbs) earnedPoints += 2;
  if (analysis.critWordCount) earnedPoints += 2;
  const totalPoints = 10;

  const handleVerify = () => {
    setIsVerified(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleReset = () => {
    setEssayText("Bonjour, je m'appelle ");
    setIsVerified(false);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-12">
      {/* Intro Header */}
      <div className="bg-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
          <span>Partie 3</span>
          <span aria-hidden="true">·</span>
          <span>Examen Cumulatif 9ème</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
          Production écrite & Guide de rédaction
        </h2>
        <div className="mt-3 p-4 bg-indigo-950/60 rounded-xl border border-indigo-700/50 text-indigo-100 text-xs sm:text-sm leading-relaxed">
          <strong className="text-white block mb-1">Consigne officielle :</strong>
          {PRODUCTION_GUIDE.consigne}
        </div>
      </div>

      {/* 3.1 Boîte à outils interactive */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3.1 Boîte à outils</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Lexique et expressions prêtes à l'emploi
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Clique sur n’importe quelle expression pour l’insérer instantanément dans ta rédaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCTION_GUIDE.boiteAoutils.map((group, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <span className="font-bold text-xs text-indigo-900 uppercase tracking-wide">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    onClick={() => handleInsertPhrase(item)}
                    className="px-2.5 py-1 text-xs bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 rounded-lg transition-all text-left cursor-pointer shadow-2xs"
                    title="Cliquer pour insérer dans le texte"
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3.2 Exemple décortiqué de Camila */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <BookOpen className="w-3.5 h-3.5" />
            <span>3.2 Modèle officiel de référence</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            {PRODUCTION_GUIDE.sampleText.title}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Observe la structure attendue : chaque étape commence par un moment de la journée ou un connecteur logique.
          </p>
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 font-serif text-sm sm:text-base leading-relaxed text-slate-800">
          <p>
            <span className="bg-rose-100 text-rose-900 px-1 py-0.5 rounded font-sans text-xs font-bold mr-1">Présentation</span>
            "Bonjour, je m'appelle Camila et j'ai treize ans."
          </p>
          <p>
            <span className="bg-sky-100 text-sky-900 px-1 py-0.5 rounded font-sans text-xs font-bold mr-1">Matin</span>
            "Le matin, je me réveille à 6h et demie. Je prends mon petit-déjeuner à 7h, <span className="font-bold text-indigo-600">puis</span> je me brosse les dents et je m'habille. <span className="font-bold text-indigo-600">Ensuite</span>, je vais à l'école et j'arrive à 8h."
          </p>
          <p>
            <span className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-sans text-xs font-bold mr-1">Après-midi</span>
            "L'après-midi, j'ai cours jusqu'à trois heures et je rentre à la maison. <span className="font-bold text-indigo-600">Après</span>, je fais mes devoirs."
          </p>
          <p>
            <span className="bg-emerald-100 text-emerald-900 px-1 py-0.5 rounded font-sans text-xs font-bold mr-1">Soir & Fin</span>
            "Le soir, je dîne à sept heures. <span className="font-bold text-indigo-600">Enfin</span>, je me lave et je me couche à 9h."
          </p>
        </div>

        {/* Structure sequence banner */}
        <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex flex-wrap items-center gap-2">
          <span className="font-bold">Structure clé :</span>
          <span>Présentation (nom, âge)</span>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          <span>Le matin (heures précises)</span>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          <span>L'après-midi (cours & activités)</span>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          <span>Le soir (repas & coucher)</span>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          <span>Fin avec « enfin »</span>
        </div>
      </div>

      {/* 3.3 À toi d'écrire */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <PenTool className="w-3.5 h-3.5" />
              <span>3.3 À toi d’écrire</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Rédige ta routine quotidienne
            </h3>
          </div>

          {/* Mode switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTabMode('editor')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTabMode === 'editor'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mode Rédaction Libre
            </button>
            <button
              onClick={() => setActiveTabMode('scaffold')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTabMode === 'scaffold'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mode Canevas Guidé
            </button>
          </div>
        </div>

        {activeTabMode === 'scaffold' ? (
          /* Guided sentence completion */
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Complète les 5 étapes pas-à-pas de l'exercice 3.3 du document, puis clique sur « Transférer dans ma rédaction » :
            </p>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
                <span>1. Bonjour, je m'appelle</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s1_name}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s1_name: e.target.value })}
                  placeholder="ton prénom"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs w-28 focus:border-indigo-500 focus:outline-hidden"
                />
                <span>et j'ai</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s1_age}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s1_age: e.target.value })}
                  placeholder="14"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs w-16 focus:border-indigo-500 focus:outline-hidden"
                />
                <span>ans.</span>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
                <span>2. Le matin, je me</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s2_verb}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s2_verb: e.target.value })}
                  placeholder="réveille / lève"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs w-28 focus:border-indigo-500 focus:outline-hidden"
                />
                <span>à</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s2_hour}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s2_hour: e.target.value })}
                  placeholder="6h30"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs w-20 focus:border-indigo-500 focus:outline-hidden"
                />
                <span>. Puis, je</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s2_action}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s2_action: e.target.value })}
                  placeholder="prends mon petit-déjeuner et m'habille"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs flex-1 min-w-[200px] focus:border-indigo-500 focus:outline-hidden"
                />
                <span>.</span>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
                <span>3. Ensuite, je</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s3_verb}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s3_verb: e.target.value })}
                  placeholder="vais / pars"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs w-28 focus:border-indigo-500 focus:outline-hidden"
                />
                <span>à l'école. J'arrive à</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s3_hour}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s3_hour: e.target.value })}
                  placeholder="8h"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs w-20 focus:border-indigo-500 focus:outline-hidden"
                />
                <span>.</span>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
                <span>4. L'après-midi, j'ai</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s4_cours}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s4_cours: e.target.value })}
                  placeholder="cours"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs w-24 focus:border-indigo-500 focus:outline-hidden"
                />
                <span>jusqu'à</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s4_hour}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s4_hour: e.target.value })}
                  placeholder="15h"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs w-20 focus:border-indigo-500 focus:outline-hidden"
                />
                <span>. Après, je</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s4_action}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s4_action: e.target.value })}
                  placeholder="rentre et fais mes devoirs"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs flex-1 min-w-[200px] focus:border-indigo-500 focus:outline-hidden"
                />
                <span>.</span>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2">
                <span>5. Le soir, je</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s5_action}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s5_action: e.target.value })}
                  placeholder="dîne en famille"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs flex-1 min-w-[150px] focus:border-indigo-500 focus:outline-hidden"
                />
                <span>à</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s5_hour}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s5_hour: e.target.value })}
                  placeholder="19h30"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs w-20 focus:border-indigo-500 focus:outline-hidden"
                />
                <span>. Enfin, je me</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s5_verb}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s5_verb: e.target.value })}
                  placeholder="couche"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs w-24 focus:border-indigo-500 focus:outline-hidden"
                />
                <span>à</span>
                <input
                  type="text"
                  value={scaffoldAnswers.s5_bedHour}
                  onChange={(e) => setScaffoldAnswers({ ...scaffoldAnswers, s5_bedHour: e.target.value })}
                  placeholder="21h"
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs w-20 focus:border-indigo-500 focus:outline-hidden"
                />
                <span>.</span>
              </div>
            </div>

            <button
              onClick={handleCompileScaffold}
              className="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Transférer dans l'éditeur de rédaction</span>
            </button>
          </div>
        ) : (
          /* Free text editor with live detector */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>Nombre de mots :</span>
                <span
                  className={`font-mono font-bold px-2 py-0.5 rounded-md ${
                    analysis.wordCount >= 70 && analysis.wordCount <= 95
                      ? 'bg-emerald-100 text-emerald-800'
                      : analysis.wordCount < 70
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {analysis.wordCount} / ~80 mots
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleListenEssay}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                  title="Écouter ma rédaction lue en français"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Écouter</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copié !' : 'Copier'}</span>
                </button>
              </div>
            </div>

            <textarea
              rows={8}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Rédige ta routine ici en respectant les 4 étapes de la journée et les connecteurs logiques..."
              className="w-full p-4 bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:bg-white rounded-xl text-sm text-slate-900 leading-relaxed focus:outline-hidden transition-all shadow-inner font-sans"
            />

            {/* Live detector chips */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-slate-700">Détection automatique en direct :</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                <div>
                  • <strong>Connecteurs détectés ({analysis.foundConnectors.length}) :</strong>{' '}
                  {analysis.foundConnectors.length > 0 ? (
                    <span className="text-indigo-600 font-semibold">{analysis.foundConnectors.join(', ')}</span>
                  ) : (
                    <span className="text-slate-400">aucun (ajoute puis, ensuite, après...)</span>
                  )}
                </div>
                <div>
                  • <strong>Heures détectées ({analysis.foundHours.length}) :</strong>{' '}
                  {analysis.foundHours.length > 0 ? (
                    <span className="text-indigo-600 font-semibold">{analysis.foundHours.join(', ')}</span>
                  ) : (
                    <span className="text-slate-400">aucune (ex : à 7h, à midi...)</span>
                  )}
                </div>
                <div>
                  • <strong>Verbes pronominaux ({analysis.foundPronominals.length}) :</strong>{' '}
                  {analysis.foundPronominals.length > 0 ? (
                    <span className="text-indigo-600 font-semibold">{analysis.foundPronominals.join(', ')}</span>
                  ) : (
                    <span className="text-slate-400">aucun (ex : me réveille, me brosse...)</span>
                  )}
                </div>
                <div>
                  • <strong>Moments de la journée :</strong>{' '}
                  <span className={analysis.hasMatin ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>Matin</span> ·{' '}
                  <span className={analysis.hasApresMidi ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>Après-midi</span> ·{' '}
                  <span className={analysis.hasSoir ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>Soir</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3.4 Liste de contrôle interactive */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <ListChecks className="w-3.5 h-3.5" />
            <span>3.4 Liste de contrôle officielle (Grille d'évaluation)</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Auto-évaluation avant vérification finale
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Coche les critères respectés dans ton texte. Les pastilles vertes indiquent la détection automatique du système.
          </p>
        </div>

        <div className="space-y-3">
          {PRODUCTION_GUIDE.checklist.map((item) => {
            const isAutoDetected =
              item.detectKey === 'structure'
                ? analysis.critStructure
                : item.detectKey === 'hours'
                ? analysis.critHours
                : item.detectKey === 'connectors'
                ? analysis.critConnectors
                : item.detectKey === 'verbs'
                ? analysis.critVerbs
                : true;

            const isChecked = manualChecks[item.id] || false;

            return (
              <label
                key={item.id}
                className="flex items-start gap-3 p-3.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() =>
                    setManualChecks({ ...manualChecks, [item.id]: !isChecked })
                  }
                  className="mt-0.5 w-4 h-4 text-indigo-600 rounded-sm border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <div className="flex-1 text-xs sm:text-sm text-slate-800">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{item.label}</span>
                    {isAutoDetected && (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                        Détecté dans ton texte
                      </span>
                    )}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Verification at end of tab */}
      <VerificationSummary
        sectionTitle="Production écrite"
        earnedPoints={earnedPoints}
        totalPoints={totalPoints}
        isVerified={isVerified}
        onVerify={handleVerify}
        onReset={handleReset}
        onNextSection={onNextTab}
        nextSectionLabel="Grammaire"
        customMessage={
          analysis.wordCount >= 65 && analysis.critConnectors && analysis.critHours
            ? 'Superbe production écrite ! Ta routine contient les moments de la journée, les heures et les connecteurs requis.'
            : 'Pense à bien vérifier la longueur (~80 mots), les 3 connecteurs et les heures précises.'
        }
      />
    </div>
  );
};
