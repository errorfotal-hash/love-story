"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { loveLetter } from "../data";
import useIsomorphicLayoutEffect from "../lib/useIsomorphicLayoutEffect";

export default function LoveLetterSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".letter-line",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: false
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 sm:py-16">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-[40px] bg-white/50 p-8 shadow-xl sm:p-14"
      >
        <div className="absolute inset-0 -z-10 bg-[url('/images/photo-soft.jpg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/80 via-white/70 to-transparent" />
        <div className="absolute -left-32 top-10 h-48 w-48 rounded-full bg-blush/40 blur-3xl" />
        <div className="absolute -right-24 bottom-6 h-56 w-56 rounded-full bg-champagne/40 blur-3xl" />

        <div className="relative mx-auto max-w-3xl space-y-6 text-center">
          <h2 className="text-3xl font-display font-semibold text-neutral-900 sm:text-4xl">
            Письмо
          </h2>
          <p className="text-neutral-500">
            Пролистывай вниз и позволь каждому слову раскрыться.
          </p>
          <div className="mt-8 space-y-6 text-left text-lg leading-relaxed text-neutral-700 sm:text-xl">
            {loveLetter.map((paragraph, index) => (
              <p key={index} className="letter-line">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
