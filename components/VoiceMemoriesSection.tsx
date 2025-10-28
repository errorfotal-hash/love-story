"use client";

import { motion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { voiceNotes } from "../data";

type VoiceNote = {
  id: number;
  title: string;
  description?: string;
  media: string;
};

const notes = voiceNotes as VoiceNote[];

const gradients = [
  "bg-gradient-to-br from-blush/70 via-white/70 to-champagne/70",
  "bg-gradient-to-br from-white/70 via-champagne/70 to-blush/60",
  "bg-gradient-to-br from-champagne/70 via-white/70 to-blush/60"
];

export default function VoiceMemoriesSection() {
  const mediaRefs = useRef<Record<number, HTMLVideoElement | HTMLAudioElement | null>>({});
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({});

  const handleToggle = useCallback(
    async (id: number) => {
      const media = mediaRefs.current[id];
      if (!media) return;

      const pauseMedia = (mediaId: number) => {
        const ref = mediaRefs.current[mediaId];
        if (!ref) return;
        ref.pause();
        if (ref instanceof HTMLVideoElement) {
          ref.currentTime = 0;
        }
        setIsPlaying((prev) => ({ ...prev, [mediaId]: false }));
      };

      if (!media.paused) {
        pauseMedia(id);
        setCurrentId(null);
        return;
      }

      if (currentId !== null && currentId !== id) {
        pauseMedia(currentId);
      }

      try {
        if (media instanceof HTMLVideoElement) {
          media.muted = false;
          media.playsInline = true;
        }
        await media.play();
        setCurrentId(id);
        setIsPlaying((prev) => ({ ...prev, [id]: true }));
      } catch (error) {
        console.error("Не удалось воспроизвести кружочек", error);
      }
    },
    [currentId]
  );

  const handleEnded = useCallback((id: number) => {
    setIsPlaying((prev) => ({ ...prev, [id]: false }));
    setCurrentId((prev) => (prev === id ? null : prev));
  }, []);

  const hasContent = useMemo(() => notes.length > 0, []);

  if (!hasContent) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h2 className="text-3xl font-display font-semibold text-neutral-900 sm:text-4xl">
          Кружочки, которые хочется пересматривать
        </h2>
        <p className="mt-3 text-neutral-500">
          Те самые кружочки, в которых живёт твой голос и самые искренние эмоции.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {notes.map((note, index) => {
          const gradientClass = gradients[index % gradients.length];
          const playing = Boolean(isPlaying[note.id]);
          const isVideo = /\.(mp4|webm|ogg)$/i.test(note.media);

          return (
            <motion.article
              key={note.id}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.button
                type="button"
                onClick={() => handleToggle(note.id)}
                className={`relative flex aspect-square w-full max-w-xs items-center justify-center overflow-hidden rounded-full shadow-lg backdrop-blur ${gradientClass}`}
                aria-label={playing ? "Поставить на паузу" : "Воспроизвести кружочек"}
              >
                {isVideo ? (
                  <video
                    ref={(node) => {
                      mediaRefs.current[note.id] = node;
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                    src={note.media}
                    preload="metadata"
                    playsInline
                    onEnded={() => handleEnded(note.id)}
                  />
                ) : (
                  <audio
                    ref={(node) => {
                      mediaRefs.current[note.id] = node;
                    }}
                    src={note.media}
                    preload="metadata"
                    onEnded={() => handleEnded(note.id)}
                  />
                )}

                <motion.span
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  animate={{ opacity: playing ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-black/35 text-3xl text-white backdrop-blur-sm">
                    ▶
                  </span>
                </motion.span>

                <motion.span
                  className="pointer-events-none absolute inset-1 rounded-full border border-white/40"
                  animate={{
                    opacity: playing ? [0.15, 0.55, 0.15] : 0,
                    scale: playing ? [0.97, 1.03, 0.97] : 1
                  }}
                  transition={{ duration: 2.4, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
                />
                <motion.span
                  className="pointer-events-none absolute inset-2 rounded-full border border-white/25"
                  animate={{ rotate: playing ? 360 : 0 }}
                  transition={{ duration: playing ? 16 : 0, repeat: playing ? Infinity : 0, ease: "linear" }}
                />
              </motion.button>

              <div className="mt-6 space-y-2 px-4">
                <h3 className="text-xl font-display font-semibold text-neutral-800">
                  {note.title}
                </h3>
                {note.description && (
                  <p className="text-sm text-neutral-600 sm:text-base">
                    {note.description}
                  </p>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
