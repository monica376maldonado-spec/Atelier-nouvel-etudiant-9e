import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, RotateCcw, Eye, EyeOff, Gauge } from 'lucide-react';
import { AudioListening } from '../../types/workshop';
import { speakFrench, stopSpeech } from '../../utils/speech';

interface AudioSimulatorProps {
  track: AudioListening;
}

export const AudioSimulator: React.FC<AudioSimulatorProps> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [rate, setRate] = useState<number>(0.9);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const handlePlayFull = () => {
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
      setActiveLineIndex(null);
      return;
    }

    setIsPlaying(true);
    let lineIdx = 0;

    const playNextLine = () => {
      if (lineIdx >= track.dialogue.length) {
        setIsPlaying(false);
        setActiveLineIndex(null);
        return;
      }

      setActiveLineIndex(lineIdx);
      const line = track.dialogue[lineIdx];
      speakFrench(
        line.text,
        rate,
        () => {
          lineIdx++;
          setTimeout(playNextLine, 400); // realistic pause between speakers
        },
        () => {
          setIsPlaying(false);
          setActiveLineIndex(null);
        }
      );
    };

    playNextLine();
  };

  const handlePlaySingleLine = (index: number) => {
    stopSpeech();
    setIsPlaying(true);
    setActiveLineIndex(index);
    speakFrench(
      track.dialogue[index].text,
      rate,
      () => {
        setIsPlaying(false);
        setActiveLineIndex(null);
      },
      () => {
        setIsPlaying(false);
        setActiveLineIndex(null);
      }
    );
  };

  const handleReset = () => {
    stopSpeech();
    setIsPlaying(false);
    setActiveLineIndex(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Audio & Compréhension</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-600 font-semibold">{track.theme}</span>
          </div>
          <h3 className="text-base font-semibold text-slate-900 mt-1">{track.title}</h3>
          <p className="text-xs text-slate-600 mt-0.5">{track.description}</p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs">
            <Gauge className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
            <select
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="bg-transparent text-slate-700 text-xs font-medium focus:outline-hidden cursor-pointer pr-1"
              aria-label="Vitesse d'écoute"
            >
              <option value="0.8">0.8x Lent</option>
              <option value="0.95">1.0x Normal</option>
              <option value="1.15">1.2x Rapide</option>
            </select>
          </div>

          <button
            onClick={handlePlayFull}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg text-white transition-all shadow-xs ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Écouter le dialogue</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Réinitialiser l'audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Audio Waveform / Status Bar */}
      <div className="mt-3 flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex items-end gap-1 h-4">
            <span
              className={`w-1 rounded-full bg-indigo-500 transition-all ${
                isPlaying ? 'animate-pulse h-4' : 'h-1.5'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-indigo-500 transition-all delay-75 ${
                isPlaying ? 'animate-pulse h-3' : 'h-1.5'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-indigo-500 transition-all delay-150 ${
                isPlaying ? 'animate-pulse h-4' : 'h-1.5'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-indigo-500 transition-all delay-100 ${
                isPlaying ? 'animate-pulse h-2.5' : 'h-1.5'
              }`}
            />
          </div>
          <span className="text-slate-600 font-medium">
            {isPlaying ? 'Lecture en cours (prononciation française)...' : 'Prêt pour l’écoute'}
          </span>
        </div>

        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="inline-flex items-center gap-1.5 text-xs text-indigo-700 hover:text-indigo-900 font-medium transition-colors"
        >
          {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showTranscript ? 'Masquer la transcription' : 'Afficher la transcription'}</span>
        </button>
      </div>

      {/* Transcript with Line-by-Line audio trigger */}
      {showTranscript && (
        <div className="mt-4 space-y-2 pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-400 mb-2 italic">
            Astuce : clique sur l’icône haut-parleur pour réécouter une réplique précise.
          </p>
          {track.dialogue.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 p-2.5 rounded-lg text-xs transition-colors ${
                activeLineIndex === idx
                  ? 'bg-indigo-50 border border-indigo-200 text-slate-900'
                  : 'bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <button
                onClick={() => handlePlaySingleLine(idx)}
                className="mt-0.5 p-1 rounded-md text-indigo-600 hover:bg-indigo-100 transition-colors shrink-0"
                title={`Écouter ${item.speaker}`}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <div className="flex-1">
                <span className="font-semibold text-slate-900 mr-2">{item.speaker} :</span>
                <span>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
