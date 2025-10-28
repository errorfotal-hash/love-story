"use client";

import { motion } from "framer-motion";
import LoveCounter from "./LoveCounter";

type IntroSectionProps = {
  onScrollClick?: () => void;
};

export default function IntroSection({ onScrollClick }: IntroSectionProps) {
  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center gap-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card px-6 py-8 sm:px-10 sm:py-12"
      >
        <motion.h1
          className="text-4xl font-display font-semibold text-neutral-900 sm:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          6 месяцев вместе 💕
        </motion.h1>
        <motion.p
          className="mt-4 text-base text-neutral-600 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
        >
          Это маленькое путешествие по самым тёплым моментам наших отношений.
        </motion.p>
        <LoveCounter />
      </motion.div>

      <motion.button
        type="button"
        onClick={onScrollClick}
        className="heart-button flex items-center gap-2 rounded-full bg-white/70 px-6 py-3 text-sm font-medium text-neutral-700 shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Скролль вниз
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-xl"
        >
          ↓
        </motion.span>
      </motion.button>
    </section>
  );
}
