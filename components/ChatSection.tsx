"use client";

import { motion } from "framer-motion";
import { chatMessages } from "../data";

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function ChatSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-3xl font-display font-semibold text-neutral-900 sm:text-4xl">
          Начало наших отношений
        </h2>
        <p className="mt-3 text-neutral-500">
          Так начиналась история нашей любви — каждое сообщение сохранило то волнение.
        </p>
      </div>

      <div className="glass-card mx-auto max-w-3xl space-y-4 rounded-[32px] bg-white/70 p-6 sm:p-8">
        {chatMessages.map((message) => (
          <motion.div
            key={message.id}
            variants={messageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4, margin: "-15% 0px" }}
            className={`flex w-full ${
              message.side === "left" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-3xl px-4 py-3 text-left shadow-sm sm:max-w-[70%] ${
                message.side === "left"
                  ? "bg-white text-neutral-800"
                  : "bg-blush/70 text-neutral-900"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-neutral-500">
                  {message.author}
                </span>
                <span className="text-xs text-neutral-400">{message.time}</span>
              </div>
              <p className="mt-2 text-base leading-relaxed">
                {message.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
