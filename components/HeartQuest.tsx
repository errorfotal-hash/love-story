"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hearts } from "../data";

export default function HeartQuest({ onComplete }: { onComplete?: () => void }) {
  const [foundHearts, setFoundHearts] = useState<number[]>([]);

  const foundAll = useMemo(() => foundHearts.length === hearts.length, [foundHearts.length]);

  const handleHeartClick = (id: number) => {
    setFoundHearts((prev) => {
      if (prev.includes(id)) {
        return prev;
      }
      const next = [...prev, id];
      if (next.length === hearts.length) {
        onComplete?.();
      }
      return next;
    });
  };

  return (
    <section className="relative isolate overflow-hidden rounded-[40px] bg-white/50 p-8 shadow-xl sm:p-12">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/80 via-blush/20 to-champagne/20" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-display font-semibold text-neutral-900 sm:text-4xl">
          Нажми на 3 сердечка ❤️ на странице
        </h2>

        <p className="rounded-full bg-white/80 px-6 py-2 text-sm font-medium text-neutral-500 shadow">
          Сердечек: {foundHearts.length} / {hearts.length}
        </p>
      </div>

      <div className="relative mt-10 grid min-h-[320px] place-items-center">
        {hearts.map((heart) => (
          <motion.button
            key={heart.id}
            type="button"
            onClick={() => handleHeartClick(heart.id)}
            className="heart-button absolute text-3xl"
            animate={{ scale: foundHearts.includes(heart.id) ? 0 : [1, 1.1, 1] }}
            transition={{ duration: 1.6, repeat: foundHearts.includes(heart.id) ? 0 : Infinity, ease: "easeInOut" }}
            style={heart}
          >
            ❤️
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {foundAll && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[40px] bg-white/90 p-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
              className="glass-card max-w-md p-8"
            >
              <p className="text-2xl font-display text-neutral-900">Ты нажала на все сердечки! 💖</p>
              <p className="mt-4 text-neutral-600">
                Пролистывай дальше, там тебя ждёт самое главное послание.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
