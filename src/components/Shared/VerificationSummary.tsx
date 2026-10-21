import React from 'react';
import { CheckCircle2, AlertCircle, RotateCcw, Award, ChevronRight } from 'lucide-react';

interface VerificationSummaryProps {
  sectionTitle: string;
  earnedPoints: number;
  totalPoints: number;
  isVerified: boolean;
  onVerify: () => void;
  onReset: () => void;
  onNextSection?: () => void;
  nextSectionLabel?: string;
  customMessage?: string;
}

export const VerificationSummary: React.FC<VerificationSummaryProps> = ({
  sectionTitle,
  earnedPoints,
  totalPoints,
  isVerified,
  onVerify,
  onReset,
  onNextSection,
  nextSectionLabel,
  customMessage,
}) => {
  const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

  const getFeedbackTier = () => {
    if (percentage >= 90) {
      return {
        badge: 'Excellent !',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        textColor: 'text-emerald-800',
        message: 'Félicitations ! Tu maîtrises parfaitement cette section pour l’examen cumulatif.',
      };
    } else if (percentage >= 70) {
      return {
        badge: 'Très bien !',
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        textColor: 'text-blue-800',
        message: 'Bon travail ! Tu as acquis la grande majorité des notions. Analyse les corrections ci-dessus.',
      };
    } else if (percentage >= 50) {
      return {
        badge: 'En bonne voie !',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        textColor: 'text-amber-800',
        message: 'C’est un bon début. Relis bien le vocabulaire et les explications en vert pour progresser.',
      };
    } else {
      return {
        badge: 'À réviser !',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        textColor: 'text-rose-800',
        message: 'Prends le temps de relire la leçon, mémorise le lexique et refais les exercices.',
      };
    }
  };

  const feedback = getFeedbackTier();

  return (
    <div className="mt-10 pt-8 border-t border-slate-200">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Bilan de l'onglet</span>
              <span aria-hidden="true">·</span>
              <span>{sectionTitle}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Vérification des réponses
            </h3>
            <p className="text-sm text-slate-600">
              {isVerified
                ? 'Les réponses ont été analysées. Consulte tes résultats ci-dessous.'
                : 'Une fois tes exercices terminés, clique sur le bouton pour valider tes réponses.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {!isVerified ? (
              <button
                onClick={onVerify}
                className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Vérifier mes réponses</span>
              </button>
            ) : (
              <>
                <button
                  onClick={onReset}
                  className="px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recommencer l'onglet</span>
                </button>
                {onNextSection && nextSectionLabel && (
                  <button
                    onClick={onNextSection}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Passer à : {nextSectionLabel}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Results Card if verified */}
        {isVerified && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Score global</div>
                  <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                    {earnedPoints} / {totalPoints}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-base font-mono">
                  {percentage}%
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Pourcentage de réussite</div>
                  <div className="text-lg font-semibold text-slate-900">
                    {percentage >= 60 ? 'Objectif atteint' : 'Entraînement conseillé'}
                  </div>
                </div>
              </div>

              <div className={`border rounded-xl p-4 flex flex-col justify-center ${feedback.color}`}>
                <div className="text-xs font-bold uppercase tracking-wider">
                  {feedback.badge}
                </div>
                <div className="text-xs mt-0.5 leading-relaxed">
                  {customMessage || feedback.message}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                Les corrections détaillées avec explications s'affichent directement sous chaque question dans cet onglet.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
