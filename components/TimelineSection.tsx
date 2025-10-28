"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { timeline } from "../data";

const variants = {
  hidden: { opacity: 0, y: 80 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.12, duration: 0.8, ease: "easeOut" }
  })
};

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-12 sm:py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-display font-semibold text-neutral-900 sm:text-4xl">
          Лента наших воспоминаний
        </h2>
        <p className="mt-3 text-neutral-500">
          Каждая фотография — маленькая история, которую мы прожили вместе.
        </p>
      </div>

      <div className="space-y-8">
        {timeline.map((item, index) => (
          <motion.article
            key={item.image ?? index}
            className="glass-card flex flex-col items-center gap-6 rounded-3xl p-6 sm:flex-row sm:items-center sm:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            custom={index}
            variants={variants}
          >
            <div className="mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white/60 shadow-lg sm:mx-0 sm:h-32 sm:w-32">
              <Image
                src={item.image}
                alt={item.memory}
                width={256}
                height={256}
                className="h-full w-full object-cover"
                priority={index === 0}
              />
            </div>
            <div className="max-w-xl text-center sm:text-left">
              {item.title && (
                <h3 className="text-2xl font-display font-semibold text-neutral-800">
                  {item.title}
                </h3>
              )}
              <p className="text-base text-neutral-600 sm:text-lg">{item.memory}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
