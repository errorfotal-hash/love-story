"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type WelcomeModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative mx-4 flex max-w-lg flex-col items-center gap-6 rounded-[32px] bg-white/80 p-8 text-center shadow-2xl backdrop-blur"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="pointer-events-none absolute -top-14 left-8 text-5xl text-blush opacity-70">♥</span>
            <span className="pointer-events-none absolute -bottom-10 right-6 text-4xl text-champagne opacity-70">♥</span>

            <motion.h2
              className="text-3xl font-display font-semibold text-neutral-900 sm:text-4xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            >
              Привет, любимая 💖
            </motion.h2>
            <motion.p
              className="text-base text-neutral-600 sm:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5, ease: "easeOut" }}
            >
              Ты знаешь, что ты самая лучшая?
            </motion.p>
            <motion.button
              type="button"
              onClick={onClose}
              className="heart-button inline-flex items-center gap-2 rounded-full bg-blush/80 px-8 py-3 text-base font-medium text-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Конечно знаю 💕
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
