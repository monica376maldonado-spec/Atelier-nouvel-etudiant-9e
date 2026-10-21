import React, { useState } from 'react';
import { TabType } from './types/workshop';
import { Header } from './components/Header';
import { ComprehensionEcriteTab } from './components/Tabs/ComprehensionEcriteTab';
import { ComprehensionOraleTab } from './components/Tabs/ComprehensionOraleTab';
import { ProductionEcriteTab } from './components/Tabs/ProductionEcriteTab';
import { GrammaireTab } from './components/Tabs/GrammaireTab';
import { PdfViewerModal } from './components/Shared/PdfViewerModal';
import {
  FileText,
  Headphones,
  PenTool,
  BookOpen,
  Calendar,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('ecrite');
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const tabsConfig: {
    id: TabType;
    label: string;
    sub: string;
    icon: React.ElementType;
  }[] = [
    {
      id: 'ecrite',
      label: 'Compréhension écrite',
      sub: 'Lexique, exercices A & B, texte de Lucas',
      icon: BookOpen,
    },
    {
      id: 'orale',
      label: 'Compréhension orale',
      sub: '3 simulations audio & exercices',
      icon: Headphones,
    },
    {
      id: 'production',
      label: 'Production écrite',
      sub: 'Guide officiel, boîte à outils & checklist',
      icon: PenTool,
    },
    {
      id: 'grammaire',
      label: 'Grammaire',
      sub: 'Verbes pronominaux, présent & corrections',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onOpenPdf={() => setIsPdfOpen(true)}
      />

      {/* Hero Header Area */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                <span className="font-semibold text-indigo-700">Collège 9ème</span>
                <span aria-hidden="true">·</span>
                <span>Examen Cumulatif de Français</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  I période 2026-2027
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Atelier d’étude interactif
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                Prépare ton évaluation dans les quatre compétences fondamentales : entraîne-toi, teste tes connaissances et accède à la vérification instantanée de tes réponses à la fin de chaque section.
              </p>
            </div>

            {/* Quick quickstart indicator */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl shrink-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">4 sections interactives</div>
                <div className="text-slate-500">Vérification immédiate intégrée</div>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Grid Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {tabsConfig.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-indigo-50/70 border-indigo-400 shadow-xs ring-1 ring-indigo-400'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    )}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    {t.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {t.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'ecrite' && (
          <ComprehensionEcriteTab onNextTab={() => setActiveTab('orale')} />
        )}
        {activeTab === 'orale' && (
          <ComprehensionOraleTab onNextTab={() => setActiveTab('production')} />
        )}
        {activeTab === 'production' && (
          <ProductionEcriteTab onNextTab={() => setActiveTab('grammaire')} />
        )}
        {activeTab === 'grammaire' && (
          <GrammaireTab onRestartAll={() => setActiveTab('ecrite')} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Atelier d'étude : examen cumulatif de français · 9ème · I période 2026-2027
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPdfOpen(true)}
              className="hover:text-slate-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Document d'examen PDF</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>Compréhension écrite & orale · Production écrite · Grammaire</span>
          </div>
        </div>
      </footer>

      {/* Original PDF viewer modal */}
      <PdfViewerModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
      />
    </div>
  );
}
