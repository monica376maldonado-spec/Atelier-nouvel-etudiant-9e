import {
  VocabItem,
  MatchingItem,
  FillBlankItem,
  TrueFalseItem,
  MultipleChoiceItem,
  TextQuestionItem,
  AudioListening,
  ErrorCorrectionItem,
  WordOrderExerciseItem,
} from '../types/workshop';

// ==========================================
// 1. COMPRÉHENSION ÉCRITE
// ==========================================

export const VOCAB_ECRITE: VocabItem[] = [
  { id: '1', word: 'le réveil', definition: 'Objet qui sonne le matin pour se lever.', es: 'el despertador' },
  { id: '2', word: 'sonner', definition: 'Faire du bruit : le réveil sonne à 7h.', es: 'sonar' },
  { id: '3', word: 'se lever', definition: 'Sortir du lit.', es: 'levantarse' },
  { id: '4', word: 'tôt ≠ tard', definition: 'Avant l’heure habituelle ≠ après l’heure habituelle.', es: 'temprano ≠ tarde' },
  { id: '5', word: 'le petit-déjeuner', definition: 'Le repas du matin.', es: 'el desayuno' },
  { id: '6', word: 'se brosser les dents', definition: 'Nettoyer ses dents avec une brosse à dents.', es: 'cepillarse los dientes' },
  { id: '7', word: "s'habiller", definition: 'Mettre ses vêtements.', es: 'vestirse' },
  { id: '8', word: 'être prêt(e)', definition: 'Être préparé(e) pour partir.', es: 'estar listo(a)' },
  { id: '9', word: 'habiter près / loin', definition: 'Vivre à petite distance / à grande distance.', es: 'vivir cerca / lejos' },
  { id: '10', word: 'à pied / à vélo', definition: 'En marchant / avec une bicyclette.', es: 'a pie / en bicicleta' },
  { id: '11', word: 'le trajet', definition: 'Le chemin entre la maison et l’école.', es: 'el trayecto' },
  { id: '12', word: 'durer', definition: 'Avoir une durée : le trajet dure 15 minutes.', es: 'durar' },
  { id: '13', word: 'la récréation', definition: 'La pause entre les cours.', es: 'el recreo' },
  { id: '14', word: 'la cantine', definition: 'Le restaurant de l’école.', es: 'el comedor escolar' },
  { id: '15', word: 'déjeuner', definition: 'Manger à midi.', es: 'almorzar' },
  { id: '16', word: 'reprendre les cours', definition: 'Recommencer les cours.', es: 'retomar las clases' },
  { id: '17', word: 'le goûter', definition: 'Le petit repas de l’après-midi.', es: 'la merienda' },
  { id: '18', word: 'les devoirs (m.)', definition: 'Le travail scolaire à faire à la maison.', es: 'la tarea' },
  { id: '19', word: 'se laver', definition: 'Nettoyer son corps.', es: 'lavarse' },
  { id: '20', word: 'éteindre la lumière', definition: 'Arrêter la lumière.', es: 'apagar la luz' },
  { id: '21', word: 'fatigué(e)', definition: 'Qui a besoin de se reposer.', es: 'cansado(a)' },
  { id: '22', word: 'tout le monde', definition: 'Toutes les personnes.', es: 'todo el mundo' },
];

export const MATCHING_DEFINITIONS = [
  { letter: 'A', text: "Le petit repas de l'après-midi." },
  { letter: 'B', text: "Le restaurant de l'école." },
  { letter: 'C', text: 'La pause entre les cours.' },
  { letter: 'D', text: "Le chemin entre la maison et l'école." },
  { letter: 'E', text: 'Le travail à faire à la maison.' },
  { letter: 'F', text: 'Il sonne le matin.' },
];

export const ECRITE_EXERCICE_A: MatchingItem[] = [
  { id: 'ea1', word: '1. le réveil', correctLetter: 'F' },
  { id: 'ea2', word: '2. le trajet', correctLetter: 'D' },
  { id: 'ea3', word: '3. la cantine', correctLetter: 'B' },
  { id: 'ea4', word: '4. le goûter', correctLetter: 'A' },
  { id: 'ea5', word: '5. la récréation', correctLetter: 'C' },
  { id: 'ea6', word: '6. les devoirs', correctLetter: 'E' },
];

export const ECRITE_EXERCICE_B_OPTIONS = [
  'se lève',
  'prend',
  'près',
  'à pied',
  'dure',
  'fatigué',
  'éteint',
  'déjeune',
];

export const ECRITE_EXERCICE_B = [
  {
    id: 'eb1',
    textBefore: '1. Pablo',
    textAfter: 'à six heures et demie.',
    correct: 'se lève',
    alt: ['se leve'],
  },
  {
    id: 'eb2',
    textBefore: '2. Il',
    textAfter: 'son petit-déjeuner à sept heures.',
    correct: 'prend',
    alt: [],
  },
  {
    id: 'eb3',
    textBefore: '3. Il habite',
    middle: "de l'école, alors il va à l'école",
    textAfter: '.',
    correct1: 'près',
    alt1: ['pres'],
    correct2: 'à pied',
    alt2: ['a pied'],
  },
  {
    id: 'eb4',
    textBefore: '4. Le trajet',
    textAfter: 'dix minutes.',
    correct: 'dure',
    alt: [],
  },
  {
    id: 'eb5',
    textBefore: '5. À midi, il',
    textAfter: 'à la cantine.',
    correct: 'déjeune',
    alt: ['dejeune'],
  },
  {
    id: 'eb6',
    textBefore: '6. Le soir, il est',
    middle: 'et il',
    textAfter: 'la lumière à neuf heures.',
    correct1: 'fatigué',
    alt1: ['fatigue'],
    correct2: 'éteint',
    alt2: ['eteint'],
  },
];

export const TEXTE_LUCAS = {
  title: "La journée de Lucas à l'école",
  paragraphs: [
    "Du lundi au vendredi, le réveil de Lucas sonne à 6h45. Lucas se lève toujours tôt, même le week-end. Il se lave, s'habille et prend son petit-déjeuner à 7h15. Il est prêt à 7h45. Lucas habite loin de son école. Il va à l'école en bus. Le trajet dure 40 minutes. Les cours commencent à 8h30. La récréation est à 10h15 et elle dure 20 minutes.",
    "À midi, Lucas rentre à la maison et il déjeune avec sa grand-mère. L'après-midi, il reprend les cours à 13h30 jusqu'à 15h.",
    "Quand il arrive chez lui, il est fatigué. Il prend son goûter à 16h30, puis il fait ses devoirs jusqu'à 17h30. Ensuite, il regarde la télé ou joue avec sa petite sœur. À 19h30, toute la famille est à table pour manger. Avant de dormir, Lucas aime écouter de la musique et il éteint la lumière à 21h.",
  ],
};

export const TEXTE_LUCAS_QUESTIONS = {
  q1: {
    id: 'tl_q1',
    num: 1,
    question: 'À quelle heure le réveil de Lucas sonne-t-il ?',
    type: 'text',
    point: 1,
    keywords: ['6h45', '6 h 45', 'six heures quarante-cinq', 'sept heures moins le quart'],
    modelAnswer: 'Le réveil de Lucas sonne à 6h45.',
  },
  q2: {
    id: 'tl_q2',
    num: 2,
    question: 'Lucas se lève tard le week-end.',
    type: 'true_false',
    point: 1,
    correctValue: 'FAUX',
    justificationKeywords: ['tôt', 'toujours', 'même le week-end', 'meme le week-end'],
    modelJustification: '« Lucas se lève toujours tôt, même le week-end. »',
  },
  q3: {
    id: 'tl_q3',
    num: 3,
    question: "Qu'est-ce que Lucas fait le matin ?",
    type: 'mcq',
    point: 1,
    options: [
      { id: 'a', text: 'Il se lave, s’habille et prend son petit-déjeuner.' },
      { id: 'b', text: 'Il regarde la télé.' },
      { id: 'c', text: 'Il prend son goûter.' },
    ],
    correctOption: 'a',
    explanation: 'Le texte précise : « Il se lave, s’habille et prend son petit-déjeuner à 7h15. »',
  },
  q4: {
    id: 'tl_q4',
    num: 4,
    question: 'Lucas habite près de son école.',
    type: 'true_false',
    point: 1,
    correctValue: 'FAUX',
    justificationKeywords: ['loin', 'école', 'ecole'],
    modelJustification: '« Lucas habite loin de son école. »',
  },
  q5: {
    id: 'tl_q5',
    num: 5,
    question: 'Comment Lucas va-t-il à l’école ?',
    type: 'mcq',
    point: 1,
    options: [
      { id: 'a', text: 'À pied.' },
      { id: 'b', text: 'En bus.' },
      { id: 'c', text: 'À vélo.' },
    ],
    correctOption: 'b',
    explanation: 'Le texte indique expressément : « Il va à l’école en bus. »',
  },
  q6: {
    id: 'tl_q6',
    num: 6,
    question: 'Où Lucas déjeune-t-il à midi ?',
    type: 'mcq',
    point: 1,
    options: [
      { id: 'a', text: 'À la cantine.' },
      { id: 'b', text: 'À la maison.' },
      { id: 'c', text: 'Au restaurant.' },
    ],
    correctOption: 'b',
    explanation: 'Le texte dit : « À midi, Lucas rentre à la maison et il déjeune avec sa grand-mère. »',
  },
  q7: {
    id: 'tl_q7',
    num: 7,
    question: 'Lucas fait ses devoirs avant le goûter.',
    type: 'true_false',
    point: 1,
    correctValue: 'FAUX',
    justificationKeywords: ['goûter', 'gouter', '16h30', 'puis', 'devoirs'],
    modelJustification: '« Il prend son goûter à 16h30, puis il fait ses devoirs jusqu’à 17h30. »',
  },
  q8: {
    id: 'tl_q8',
    num: 8,
    question: 'À quelle heure toute la famille passe-t-elle à table ?',
    type: 'mcq',
    point: 1,
    options: [
      { id: 'a', text: 'À 19h30.' },
      { id: 'b', text: 'À 20h.' },
      { id: 'c', text: 'À 21h.' },
    ],
    correctOption: 'a',
    explanation: 'Le texte précise : « À 19h30, toute la famille est à table pour manger. »',
  },
  q9: {
    id: 'tl_q9',
    num: 9,
    question: "Qu'est-ce que Lucas aime faire avant de dormir ?",
    type: 'text',
    point: 1,
    keywords: ['musique', 'écouter', 'ecouter'],
    modelAnswer: 'Avant de dormir, Lucas aime écouter de la musique.',
  },
};

// ==========================================
// 2. COMPRÉHENSION ORALE
// ==========================================

export const VOCAB_ECOUTE_1: VocabItem[] = [
  { id: 'e1_1', word: 'un(e) artiste préféré(e)', definition: 'La personne que tu aimes le plus.', es: 'artista favorito(a)' },
  { id: 'e1_2', word: 'un chanteur / une chanteuse', definition: 'Personne qui chante.', es: 'cantante' },
  { id: 'e1_3', word: 'un rappeur', definition: 'Artiste qui fait du rap.', es: 'rapero' },
  { id: 'e1_4', word: 'belge / français(e)', definition: 'De Belgique / de France.', es: 'belga / francés(esa)' },
  { id: 'e1_5', word: 'une chanson', definition: 'Une musique avec des paroles.', es: 'canción' },
  { id: 'e1_6', word: 'les paroles (f.)', definition: 'Les mots d’une chanson.', es: 'la letra' },
  { id: 'e1_7', word: 'joyeux / joyeuse', definition: 'Qui exprime la joie.', es: 'alegre' },
  { id: 'e1_8', word: 'vivre le moment présent', definition: 'Profiter de maintenant.', es: 'vivir el presente' },
  { id: 'e1_9', word: 'un rêve', definition: 'Ce qu’on veut réaliser dans la vie.', es: 'un sueño' },
  { id: 'e1_10', word: 'motiver ≠ démotivé(e)', definition: 'Donner de l’énergie ≠ sans énergie.', es: 'motivar ≠ desmotivado' },
  { id: 'e1_11', word: 'un doute', definition: 'Quand on n’est pas sûr de soi.', es: 'una duda' },
  { id: 'e1_12', word: 'triste', definition: 'Pas content(e).', es: 'triste' },
];

export const VOCAB_ECOUTE_2: VocabItem[] = [
  { id: 'e2_1', word: 'le prof de sport', definition: 'Le professeur d’éducation physique.', es: 'profesor de educación física' },
  { id: 'e2_2', word: 'présenter quelqu’un', definition: 'Dire qui est une personne aux autres.', es: 'presentar a alguien' },
  { id: 'e2_3', word: 'se présenter', definition: 'Dire son nom : « Je m’appelle… ».', es: 'presentarse' },
  { id: 'e2_4', word: 'un élève / un copain', definition: 'Personne qui étudie / un ami.', es: 'alumno / amigo' },
  { id: 'e2_5', word: 'Bienvenue !', definition: 'Mot pour accueillir quelqu’un.', es: '¡Bienvenido!' },
  { id: 'e2_6', word: 'Voici… / Ce sont…', definition: 'Pour montrer : Voici Aldo. Ce sont mes baskets.', es: 'Aquí está… / Son…' },
  { id: 'e2_7', word: 'un sac', definition: 'On y met ses affaires.', es: 'una mochila' },
  { id: 'e2_8', word: 'les baskets (f.)', definition: 'Les chaussures de sport.', es: 'zapatillas deportivas' },
  { id: 'e2_9', word: 'une casquette', definition: 'Un chapeau avec une visière.', es: 'una gorra' },
  { id: 'e2_10', word: 'cool', definition: 'Super, très bien.', es: 'genial' },
  { id: 'e2_11', word: 'il y a', definition: 'Quelque chose est présent.', es: 'hay' },
];

export const VOCAB_ECOUTE_3: { expression: string; quand: string; es: string }[] = [
  { expression: 'Bonjour, madame / monsieur', quand: 'Pour dire bonjour à un adulte (on dit « vous »).', es: 'buenos días / buenas tardes' },
  { expression: 'Salut', quand: 'Entre amis, pour dire bonjour ou au revoir.', es: 'hola / chao' },
  { expression: 'Coucou', quand: 'Entre amis proches, très informel.', es: 'holi' },
  { expression: 'Ça va ? Ça va et toi ? / Ça va et vous ?', quand: 'Pour demander des nouvelles (toi = ami, vous = adulte).', es: '¿Cómo estás? ¿Y tú? / ¿Y usted?' },
  { expression: 'Au revoir', quand: 'Pour partir (plus formel).', es: 'adiós' },
  { expression: 'À demain / À bientôt', quand: 'On se voit demain / on se voit bientôt.', es: 'hasta mañana / hasta pronto' },
];

export const AUDIO_TRACKS: AudioListening[] = [
  {
    id: 'track1',
    title: 'Écoute 1 : Mes artistes préférés et la musique',
    theme: 'Musique, artistes et émotions',
    description: 'Une discussion enthousiaste entre deux collégiens sur leurs chanteurs préférés, les paroles et la motivation.',
    speaker: 'Lucas et Camille',
    dialogue: [
      { speaker: 'Camille', text: 'Dis Lucas, quel est ton artiste préféré ?' },
      { speaker: 'Lucas', text: 'Moi, c’est Soprano ! C’est un rappeur français formidable. Ses chansons me motivent quand j’ai des doutes.' },
      { speaker: 'Camille', text: 'Ah oui ! Et moi, j’adore Angèle. C’est une chanteuse belge talentueuse. Ses paroles sont joyeuses et parlent de vivre le moment présent.' },
      { speaker: 'Lucas', text: 'C’est vrai ! La musique donne de l’énergie pour réaliser nos rêves.' },
    ],
    fullTranscript:
      'Camille : Dis Lucas, quel est ton artiste préféré ? Lucas : Moi, c’est Soprano ! C’est un rappeur français formidable. Ses chansons me motivent quand j’ai des doutes. Camille : Ah oui ! Et moi, j’adore Angèle. C’est une chanteuse belge talentueuse. Ses paroles sont joyeuses et parlent de vivre le moment présent. Lucas : C’est vrai ! La musique donne de l’énergie pour réaliser nos rêves.',
    vocab: VOCAB_ECOUTE_1,
  },
  {
    id: 'track2',
    title: 'Écoute 2 : Le cours d’EPS et le nouvel élève',
    theme: 'Sport, présentation et affaires scolaires',
    description: 'Le professeur d’éducation physique présente un nouvel élève et fait l’inventaire des affaires de sport.',
    speaker: 'Monsieur Dupont (Professeur) et Aldo',
    dialogue: [
      { speaker: 'Professeur', text: 'Bonjour tout le monde ! Silence s’il vous plaît. Aujourd’hui, nous accueillons un nouvel élève : voici Aldo ! Souhaitez-lui la bienvenue.' },
      { speaker: 'Aldo', text: 'Bonjour monsieur, salut les copains ! Je suis très content d’être ici.' },
      { speaker: 'Professeur', text: 'Très bien Aldo. Montre-nous ton équipement. Est-ce que tu as toutes tes affaires ?' },
      { speaker: 'Aldo', text: 'Oui monsieur ! Dans mon sac de sport, il y a mes baskets, une casquette et ma gourde d’eau. C’est cool !' },
    ],
    fullTranscript:
      'Professeur : Bonjour tout le monde ! Silence s’il vous plaît. Aujourd’hui, nous accueillons un nouvel élève : voici Aldo ! Souhaitez-lui la bienvenue. Aldo : Bonjour monsieur, salut les copains ! Je suis très content d’être ici. Professeur : Très bien Aldo. Montre-nous ton équipement. Est-ce que tu as toutes tes affaires ? Aldo : Oui monsieur ! Dans mon sac de sport, il y a mes baskets, une casquette et ma gourde d’eau. C’est cool !',
    vocab: VOCAB_ECOUTE_2,
  },
  {
    id: 'track3',
    title: 'Écoute 3 : Salutations au collège (Formel ou Informel)',
    theme: 'Formules de politesse et registres de langue',
    description: 'Différentes situations de salutations enregistrées à l’entrée du collège.',
    speaker: 'Les élèves et les professeurs',
    dialogue: [
      { speaker: 'Situation 1', text: '— Bonjour, madame Dubois ! Comment allez-vous ? — Bonjour Thomas, je vais très bien merci.' },
      { speaker: 'Situation 2', text: '— Salut, Nathan, ça va ? — Oui super cool et toi ?' },
      { speaker: 'Situation 3', text: '— Coucou, les amis ! Vous venez à la récréation ? — Oui, on arrive !' },
      { speaker: 'Situation 4', text: '— Au revoir, monsieur. Bonne fin de journée ! — Au revoir, à demain.' },
      { speaker: 'Situation 5', text: '— Salut, à demain pour le match ! — Ciao, à demain !' },
      { speaker: 'Situation 6', text: '— Bonjour professeur, ça va et vous ? — Très bien merci, entrez en classe.' },
    ],
    fullTranscript:
      'Situation 1 : Bonjour, madame Dubois ! Comment allez-vous ? Situation 2 : Salut, Nathan, ça va ? Situation 3 : Coucou, les amis ! Situation 4 : Au revoir, monsieur. Situation 5 : Salut, à demain. Situation 6 : Ça va et vous ?',
    vocab: VOCAB_ECOUTE_1,
  },
];

export const ORALE_EXERCICE_A = [
  { id: 'oa1', phrase: '1. Bonjour, madame Dubois.', correct: 'F', explanation: 'On s’adresse à une adulte avec "madame" et le vouvoiement : Formel (F).' },
  { id: 'oa2', phrase: '2. Salut, Nathan, ça va ?', correct: 'I', explanation: 'On salue un copain par son prénom avec "Salut" : Informel (I).' },
  { id: 'oa3', phrase: '3. Coucou, les amis !', correct: 'I', explanation: 'Formule familière entre amis très proches : Informel (I).' },
  { id: 'oa4', phrase: '4. Au revoir, monsieur.', correct: 'F', explanation: 'Politesse formelle avec un adulte ("monsieur") : Formel (F).' },
  { id: 'oa5', phrase: '5. Salut, à demain.', correct: 'I', explanation: 'Salutation entre camarades : Informel (I).' },
  { id: 'oa6', phrase: '6. Ça va et vous ?', correct: 'F', explanation: 'Utilisation du pronom "vous" de politesse envers un adulte : Formel (F).' },
];

export const ORALE_EXERCICE_B_OPTIONS = [
  'rappeur',
  'chanteuse',
  'paroles',
  'motive',
  'présente',
  'baskets',
  'sac',
];

export const ORALE_EXERCICE_B = [
  { id: 'ob1', textBefore: '1. Angèle est une', textAfter: 'belge.', correct: 'chanteuse' },
  { id: 'ob2', textBefore: '2. Soprano est un', textAfter: 'français.', correct: 'rappeur' },
  { id: 'ob3', textBefore: '3. Les', textAfter: 'de cette chanson sont très belles.', correct: 'paroles' },
  { id: 'ob4', textBefore: '4. Cette chanson me', textAfter: 'quand j’ai des doutes.', correct: 'motive' },
  { id: 'ob5', textBefore: '5. Le prof', textAfter: 'un nouvel élève à la classe.', correct: 'présente', alt: 'presente' },
  { id: 'ob6', textBefore: '6. Dans mon', middle: ', il y a mes', textAfter: 'de sport.', correct1: 'sac', correct2: 'baskets' },
];

export const ORALE_COMPREHENSION_QUESTIONS = [
  {
    id: 'oc1',
    question: 'Dans l’Écoute 1, de quelle nationalité est la chanteuse Angèle ?',
    options: [
      { id: 'a', text: 'Française' },
      { id: 'b', text: 'Belge' },
      { id: 'c', text: 'Canadienne' },
    ],
    correctOption: 'b',
    explanation: 'Camille dit : « Angèle est une chanteuse belge talentueuse. »',
  },
  {
    id: 'oc2',
    question: 'Pourquoi Lucas écoute-t-il Soprano ?',
    options: [
      { id: 'a', text: 'Parce que ses chansons le motivent quand il a des doutes.' },
      { id: 'b', text: 'Parce qu’il aime écouter du rock.' },
      { id: 'c', text: 'Parce que son professeur lui a demandé.' },
    ],
    correctOption: 'a',
    explanation: 'Lucas explique : « Ses chansons me motivent quand j’ai des doutes. »',
  },
  {
    id: 'oc3',
    question: 'Dans l’Écoute 2, quel nouvel élève est présenté par le professeur d’EPS ?',
    options: [
      { id: 'a', text: 'Lucas' },
      { id: 'b', text: 'Nathan' },
      { id: 'c', text: 'Aldo' },
    ],
    correctOption: 'c',
    explanation: 'Le professeur dit : « Aujourd’hui, nous accueillons un nouvel élève : voici Aldo ! »',
  },
  {
    id: 'oc4',
    question: 'Qu’y a-t-il dans le sac de sport d’Aldo ?',
    options: [
      { id: 'a', text: 'Des cahiers et des stylos' },
      { id: 'b', text: 'Des baskets, une casquette et une gourde' },
      { id: 'c', text: 'Un repas et un réveil' },
    ],
    correctOption: 'b',
    explanation: 'Aldo indique : « Dans mon sac de sport, il y a mes baskets, une casquette et ma gourde d’eau. »',
  },
];

// ==========================================
// 3. PRODUCTION ÉCRITE
// ==========================================

export const PRODUCTION_GUIDE = {
  consigne:
    'Présente-toi brièvement, puis décris ta routine quotidienne. Explique ce que tu fais le matin, l’après-midi et le soir. Précise les heures et les activités. (environ 80 mots)',
  boiteAoutils: [
    {
      category: 'Me présenter',
      items: [
        "Je m'appelle...",
        "J'ai ... ans",
        'Je suis collégien / collégienne',
        "J'habite à...",
      ],
    },
    {
      category: 'Situer dans la journée',
      items: ['le matin', "l'après-midi", 'le soir', 'à midi'],
    },
    {
      category: 'Organiser les idées (Connecteurs)',
      items: ["d'abord", 'ensuite', 'puis', 'après', 'enfin'],
    },
    {
      category: "Dire l'heure",
      items: [
        'à 6h30 / à six heures et demie',
        'à 7h / à sept heures',
        'à 7h15 / à sept heures et quart',
        'à 8h / à huit heures',
        'à midi',
        'jusqu’à 15h / jusqu’à trois heures',
        'à 19h30',
        'à 21h',
      ],
    },
    {
      category: 'Verbes pronominaux essentiels',
      items: [
        'je me réveille',
        'je me lève',
        'je me brosse les dents',
        "je m'habille",
        'je me lave',
        'je me dépêche',
        'je me couche',
      ],
    },
    {
      category: 'Verbes en -ER, être, avoir, prendre',
      items: [
        "j'arrive à l'école",
        'je mange',
        "j'étudie",
        "j'écoute de la musique",
        'je suis en 9ème',
        "j'ai cours jusqu'à...",
        'je prends mon petit-déjeuner / mon goûter',
      ],
    },
  ],
  sampleText: {
    title: 'Exemple officiel décortiqué : La routine de Camila',
    fullText:
      "Bonjour, je m'appelle Camila et j'ai treize ans. Le matin, je me réveille à 6h et demie. Je prends mon petit-déjeuner à 7h, puis je me brosse les dents et je m'habille. Ensuite, je vais à l'école et j'arrive à 8h. L'après-midi, j'ai cours jusqu'à trois heures et je rentre à la maison. Après, je fais mes devoirs. Le soir, je dîne à sept heures. Enfin, je me lave et je me couche à 9h.",
    breakdown: [
      {
        part: 'Présentation',
        color: 'rose',
        text: "Bonjour, je m'appelle Camila et j'ai treize ans.",
        note: 'Nom + Âge (verbe avoir : j’ai)',
      },
      {
        part: 'Le matin',
        color: 'sky',
        text: "Le matin, je me réveille à 6h et demie. Je prends mon petit-déjeuner à 7h, puis je me brosse les dents et je m'habille. Ensuite, je vais à l'école et j'arrive à 8h.",
        note: 'Moments + Heures précises + Verbes pronominaux + Connecteurs (puis, ensuite)',
      },
      {
        part: 'L’après-midi',
        color: 'amber',
        text: "L'après-midi, j'ai cours jusqu'à trois heures et je rentre à la maison. Après, je fais mes devoirs.",
        note: 'Heures (jusqu’à) + Connecteur (après)',
      },
      {
        part: 'Le soir & Conclusion',
        color: 'emerald',
        text: "Le soir, je dîne à sept heures. Enfin, je me lave et je me couche à 9h.",
        note: 'Heures + Verbes pronominaux (me lave, me couche) + Connecteur final (enfin)',
      },
    ],
  },
  checklist: [
    {
      id: 'c1',
      label: 'J’ai un texte structuré avec présentation, matin, après-midi et soir.',
      detectKey: 'structure',
    },
    {
      id: 'c2',
      label: 'J’ai écrit des heures précises (ex : à 7h, à 8h15, jusqu’à 15h, etc.).',
      detectKey: 'hours',
    },
    {
      id: 'c3',
      label: 'J’ai utilisé au moins 3 connecteurs logiques (d’abord, ensuite, puis, après, enfin).',
      detectKey: 'connectors',
    },
    {
      id: 'c4',
      label: 'J’ai utilisé les verbes être, avoir, prendre, au moins un verbe pronominal et un verbe en -ER.',
      detectKey: 'verbs',
    },
    {
      id: 'c5',
      label: 'Tous mes verbes sont conjugués au présent de l’indicatif.',
      detectKey: 'present',
    },
    {
      id: 'c6',
      label: 'J’ai relu mes accords (sujet-verbe) et mon orthographe.',
      detectKey: 'proofread',
    },
  ],
  scaffoldPrompts: [
    {
      id: 's1',
      prompt: '1. Bonjour, je m’appelle [ton prénom] et j’ai [ton âge] ans.',
      defaultVal: 'Bonjour, je m’appelle Lucas et j’ai quatorze ans.',
    },
    {
      id: 's2',
      prompt: '2. Le matin, je me [verbe] à [heure]. Puis, je [activité]...',
      defaultVal: 'Le matin, je me réveille à 6h30. Puis, je prends mon petit-déjeuner et je m’habille.',
    },
    {
      id: 's3',
      prompt: '3. Ensuite, je [transport/déplacement] à l’école. J’arrive à [heure].',
      defaultVal: 'Ensuite, je vais à l’école en bus. J’arrive à 8h.',
    },
    {
      id: 's4',
      prompt: '4. L’après-midi, j’ai [cours] jusqu’à [heure]. Après, je [activité].',
      defaultVal: 'L’après-midi, j’ai cours jusqu’à 15h. Après, je rentre à la maison et je fais mes devoirs.',
    },
    {
      id: 's5',
      prompt: '5. Le soir, je [repas/activité] à [heure]. Enfin, je me [verbe] à [heure].',
      defaultVal: 'Le soir, je dîne en famille à 19h30. Enfin, je me lave et je me couche à 21h30.',
    },
  ],
};

// ==========================================
// 4. GRAMMAIRE
// ==========================================

export const GRAMMAR_MEMOS = [
  {
    title: 'Les verbes pronominaux au présent',
    rule: 'Ils se conjuguent avec un pronom réfléchi de la même personne que le sujet :',
    table: [
      { subject: 'Je', pronoun: 'me / m’', example: 'je me lave, je m’habille' },
      { subject: 'Tu', pronoun: 'te / t’', example: 'tu te laves, tu t’habilles' },
      { subject: 'Il / Elle / On', pronoun: 'se / s’', example: 'il se lave, elle s’habille' },
      { subject: 'Nous', pronoun: 'nous', example: 'nous nous lavons' },
      { subject: 'Vous', pronoun: 'vous', example: 'vous vous lavez' },
      { subject: 'Ils / Elles', pronoun: 'se / s’', example: 'ils se lavent, elles se réveillent' },
    ],
  },
  {
    title: 'Verbes réguliers en -ER & Verbes fondamentaux',
    rule: 'Terminaisons régulières du présent : -e, -es, -e, -ons, -ez, -ent.',
    notes: [
      'ÊTRE : je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont',
      'AVOIR : j’ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont (utilisé pour exprimer l’âge !)',
      'PRENDRE : je prends, tu prends, il/elle prend, nous prenons, vous prenez, ils/elles prennent',
    ],
  },
];

export const GRAMMAR_EXERCICE_1 = [
  {
    id: 'g1_1',
    subject: '1. Je',
    verb: '(se lever)',
    after: 'à sept heures.',
    correct: 'me lève',
    alt: ['me leve'],
    explanation: 'Sujet "Je" -> pronom "me" + terminaison "-e" (lever -> se lève).',
  },
  {
    id: 'g1_2',
    subject: '2. Tu',
    verb: '(se laver)',
    after: 'le soir.',
    correct: 'te laves',
    alt: [],
    explanation: 'Sujet "Tu" -> pronom "te" + terminaison "-es" (laver -> te laves).',
  },
  {
    id: 'g1_3',
    subject: '3. Marie',
    verb: "(s'habiller)",
    after: 'rapidement.',
    correct: "s'habille",
    alt: ["s’habille"],
    explanation: 'Sujet "Marie" (3e pers. sing.) -> pronom élidé "s’" devant voyelle/h + "-e".',
  },
  {
    id: 'g1_4',
    subject: '4. Nous',
    verb: '(se dépêcher)',
    after: 'pour arriver à l’heure.',
    correct: 'nous dépêchons',
    alt: ['nous depechons'],
    explanation: 'Sujet "Nous" -> pronom "nous" + terminaison "-ons" (nous dépêchons).',
  },
  {
    id: 'g1_5',
    subject: '5. Vous',
    verb: '(se coucher)',
    after: 'à neuf heures.',
    correct: 'vous couchez',
    alt: [],
    explanation: 'Sujet "Vous" -> pronom "vous" + terminaison "-ez" (vous couchez).',
  },
  {
    id: 'g1_6',
    subject: '6. Ils',
    verb: '(se réveiller)',
    after: 'tôt.',
    correct: 'se réveillent',
    alt: ['se reveillent'],
    explanation: 'Sujet "Ils" (3e pers. plur.) -> pronom "se" + terminaison "-ent" (se réveillent).',
  },
];

export const GRAMMAR_EXERCICE_2 = [
  {
    id: 'g2_1',
    subject: '1. Elles',
    verb: '(parler)',
    after: 'espagnol à la maison.',
    correct: 'parlent',
    explanation: '3e personne du pluriel (Elles) des verbes en -ER : terminaison "-ent".',
  },
  {
    id: 'g2_2',
    subject: '2. Nous',
    verb: '(être)',
    after: 'à la cantine.',
    correct: 'sommes',
    explanation: 'Verbe être au présent avec nous : "nous sommes".',
  },
  {
    id: 'g2_3',
    subject: '3. Tu',
    verb: '(avoir)',
    after: 'un nouveau sac.',
    correct: 'as',
    explanation: 'Verbe avoir au présent avec tu : "tu as".',
  },
  {
    id: 'g2_4',
    subject: '4. Je',
    verb: '(regarder)',
    after: 'la télé.',
    correct: 'regarde',
    explanation: 'Verbe regarder (1ère pers. sing.) : terminaison "-e".',
  },
  {
    id: 'g2_5',
    subject: '5. Vous',
    verb: '(jouer)',
    after: 'au football.',
    correct: 'jouez',
    explanation: 'Verbe jouer avec vous : terminaison "-ez" ("vous jouez").',
  },
  {
    id: 'g2_6',
    subject: '6. Il',
    verb: '(prendre)',
    after: 'son goûter à quatre heures.',
    correct: 'prend',
    explanation: 'Verbe prendre (3e pers. sing.) : prend (attention pas de "t" ni "s", juste "-d").',
  },
];

export const GRAMMAR_EXERCICE_3: ErrorCorrectionItem[] = [
  {
    id: 'g3_1',
    original: '1. Tu te brosse les dents.',
    errorWord: 'brosse',
    correctedPhrase: 'Tu te brosses les dents.',
    alternativeCorrect: ['tu te brosses les dents', 'Tu te brosses les dents'],
    explanation: 'Avec "tu", les verbes du premier groupe prennent un "-s" à la fin : tu te brosses.',
  },
  {
    id: 'g3_2',
    original: '2. Il est treize ans.',
    errorWord: 'est',
    correctedPhrase: 'Il a treize ans.',
    alternativeCorrect: ['il a treize ans', 'Il a 13 ans.', 'il a 13 ans'],
    explanation: 'En français, pour indiquer l’âge, on emploie le verbe AVOIR (« il a treize ans ») et non être (« il est »).',
  },
  {
    id: 'g3_3',
    original: '3. Ils regarde la télé.',
    errorWord: 'regarde',
    correctedPhrase: 'Ils regardent la télé.',
    alternativeCorrect: ['ils regardent la télé.', 'ils regardent la tele.'],
    explanation: 'Le sujet "Ils" est à la 3e personne du pluriel : la terminaison est "-ent" (ils regardent).',
  },
  {
    id: 'g3_4',
    original: '4. Je prend mon goûter à seize heures.',
    errorWord: 'prend',
    correctedPhrase: 'Je prends mon goûter à seize heures.',
    alternativeCorrect: [
      'je prends mon goûter à seize heures.',
      'je prends mon gouter a seize heures.',
      'Je prends mon goûter à 16h.',
      'Je prends mon goûter à 16 heures.',
    ],
    explanation: 'Le verbe prendre à la première personne prend un "-s" final : "je prends".',
  },
];

export const GRAMMAR_EXERCICE_4: WordOrderExerciseItem[] = [
  {
    id: 'g4_1',
    words: ['habille', 'elle', "s'", 'à sept heures et demie'],
    correctOrders: [
      "Elle s'habille à sept heures et demie.",
      "Elle s’habille à sept heures et demie.",
      "À sept heures et demie, elle s'habille.",
      "À sept heures et demie elle s'habille.",
    ],
    translation: 'Ella se viste a las siete y media.',
  },
  {
    id: 'g4_2',
    words: ['déjeunons', 'nous', 'à la cantine', 'à midi'],
    correctOrders: [
      'Nous déjeunons à la cantine à midi.',
      'Nous déjeunons à midi à la cantine.',
      'À midi, nous déjeunons à la cantine.',
      'À midi nous déjeunons à la cantine.',
    ],
    translation: 'Nosotros almorzamos en el comedor escolar al mediodía.',
  },
  {
    id: 'g4_3',
    words: ['ils', 'se', 'le soir', 'couchent', 'à neuf heures'],
    correctOrders: [
      'Le soir, ils se couchent à neuf heures.',
      'Le soir ils se couchent à neuf heures.',
      'Ils se couchent à neuf heures le soir.',
      'Ils se couchent le soir à neuf heures.',
    ],
    translation: 'Por la noche, ellos se acuestan a las nueve.',
  },
];
