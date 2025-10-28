"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

const floatingHearts = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  delay: index * 0.35,
  x: index % 2 === 0 ? -1 : 1
}));

export default function FinalSection({ visible }: { visible: boolean }) {
  const positions = useMemo(
    () => floatingHearts.map(() => Math.random() * 100),
    []
  );

  const handleReset = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden rounded-[40px] bg-neutral-900 text-white"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,182,193,0.25)_0%,_rgba(0,0,0,0.8)_70%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-20" />

          <div className="relative z-10 max-w-3xl px-6 text-center">
            <motion.h2
              className="text-4xl font-display font-semibold sm:text-5xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Я тебя очень сильно люблю 💖
            </motion.h2>
            <motion.p
              className="mt-6 text-lg text-white/80 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 1, ease: "easeOut" }}
            >
              Каждая секунда рядом с тобой — это маленькое чудо. Пусть наши отношения продолжаются ещё более ярко.
            </motion.p>
            <motion.button
              type="button"
              onClick={handleReset}
              className="heart-button mt-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-3 text-base font-medium text-white shadow-lg backdrop-blur"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Снова пройти
            </motion.button>
          </div>

          {floatingHearts.map((heart, index) => (
            <motion.span
              key={heart.id}
              className="absolute text-4xl text-blush opacity-80"
              style={{ left: `${positions[index]}%`, bottom: "-10%" }}
              animate={{
                y: [0, -500],
                x: [0, heart.x * 80],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                delay: heart.delay,
                ease: "easeInOut"
              }}
            >
              ♥
            </motion.span>
          ))}

          <audio
            className="hidden"
            src="/audio/love.mp3"
            preload="auto"
            loop
            autoPlay
          />
          {/* Добавьте мягкую мелодию по пути /public/audio/love.mp3 */}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
