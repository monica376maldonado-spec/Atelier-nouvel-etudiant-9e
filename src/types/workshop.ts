export type TabType = 'ecrite' | 'orale' | 'production' | 'grammaire';

export interface VocabItem {
  id: string;
  word: string;
  definition: string;
  es: string;
  example?: string;
  category?: string;
}

export interface MatchingItem {
  id: string;
  word: string;
  correctLetter: string;
}

export interface FillBlankItem {
  id: string;
  prefix: string;
  suffix?: string;
  middle?: string;
  endSuffix?: string;
  correctAnswers: string[];
}

export interface TrueFalseItem {
  id: string;
  statement: string;
  correctValue: 'VRAI' | 'FAUX';
  quoteInText: string;
  point: number;
}

export interface MultipleChoiceItem {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctOption: string;
  point: number;
}

export interface TextQuestionItem {
  id: string;
  question: string;
  expectedKeywords: string[];
  sampleAnswer: string;
  point: number;
}

export interface AudioListening {
  id: string;
  title: string;
  description: string;
  theme: string;
  speaker: string;
  dialogue: { speaker: string; text: string }[];
  fullTranscript: string;
  vocab: VocabItem[];
}

export interface ErrorCorrectionItem {
  id: string;
  original: string;
  errorWord: string;
  correctedPhrase: string;
  alternativeCorrect?: string[];
  explanation: string;
}

export interface WordOrderExerciseItem {
  id: string;
  words: string[];
  correctOrders: string[];
  translation: string;
}

export interface SectionScore {
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  isCompleted: boolean;
}
