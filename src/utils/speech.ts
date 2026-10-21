/**
 * Speech synthesis utility for French pronunciation in the workshop.
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakFrench(
  text: string,
  rate = 0.95,
  onEnd?: () => void,
  onError?: () => void
): void {
  if (!isSpeechSupported()) {
    onEnd?.();
    return;
  }

  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = rate; // slightly slower for language learners
  utterance.pitch = 1.0;

  // Try to pick a French voice if available
  const voices = window.speechSynthesis.getVoices();
  const frVoice = voices.find((v) => v.lang.startsWith('fr') && !v.name.includes('Google') === false) ||
    voices.find((v) => v.lang.startsWith('fr'));
  if (frVoice) {
    utterance.voice = frVoice;
  }

  utterance.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };

  utterance.onerror = () => {
    currentUtterance = null;
    onError?.();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}
