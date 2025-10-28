"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { timeline } from "../data";

type TimelineItem = {
  memory: string;
  image: string;
  title?: string;
};

const timelineItems = timeline as TimelineItem[];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function TimelineSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let nearestIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollByCard = (direction: 1 | -1) => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    const nextIndex = Math.min(
      Math.max(activeIndex + direction, 0),
      cards.length - 1
    );
    const nextCard = cards[nextIndex];
    container.scrollTo({
      behavior: "smooth",
      left: nextCard.offsetLeft - container.clientWidth / 2 + nextCard.clientWidth / 2
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    handleScroll();
  }, [handleScroll]);

  return (
    <section id="timeline" className="py-12 sm:py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-display font-semibold text-neutral-900 sm:text-4xl">
          Лента наших воспоминаний
        </h2>
        <p className="mt-3 text-neutral-500">
          Пролистывай, чтобы снова пережить самые тёплые моменты.
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden items-center sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="pointer-events-auto heart-button rounded-full bg-white/80 p-3 text-2xl text-neutral-600 shadow-lg backdrop-blur"
            aria-label="Предыдущая карточка"
            disabled={activeIndex === 0}
          >
            ‹
          </button>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden items-center sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="pointer-events-auto heart-button rounded-full bg-white/80 p-3 text-2xl text-neutral-600 shadow-lg backdrop-blur"
            aria-label="Следующая карточка"
            disabled={activeIndex === timelineItems.length - 1}
          >
            ›
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pl-1 pr-1 sm:pl-10 sm:pr-10"
        >
          {timelineItems.map((item, index) => (
            <motion.article
              key={`${item.image}-${index}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="glass-card relative flex snap-center flex-col overflow-hidden rounded-[32px] bg-white/70 shadow-xl backdrop-blur-lg"
              style={{ minWidth: "min(90vw, 560px)" }}
            >
              <div className="relative h-80 w-full overflow-hidden sm:h-[420px]">
                <Image
                  src={item.image}
                  alt={item.memory}
                  fill
                  sizes="(max-width: 640px) 90vw, 560px"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              <div className="flex flex-col gap-3 p-6 text-center sm:p-8">
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

        <div className="mt-6 flex justify-center gap-2">
          {timelineItems.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === activeIndex ? "scale-125 bg-blush" : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
