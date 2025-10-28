"use client";

import { useCallback, useRef, useState } from "react";
import FinalSection from "../components/FinalSection";
import ChatSection from "../components/ChatSection";
import HeartQuest from "../components/HeartQuest";
import IntroSection from "../components/IntroSection";
import LoveLetterSection from "../components/LoveLetterSection";
import TimelineSection from "../components/TimelineSection";

export default function HomePage() {
  const chatAnchorRef = useRef<HTMLDivElement | null>(null);
  const finalAnchorRef = useRef<HTMLDivElement | null>(null);
  const [questComplete, setQuestComplete] = useState(false);

  const handleScrollToTimeline = useCallback(() => {
    chatAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleQuestComplete = useCallback(() => {
    setQuestComplete((prev) => {
      if (!prev) {
        setTimeout(() => {
          finalAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 600);
      }
      return true;
    });
  }, []);

  return (
    <main className="flex flex-col gap-20 pb-20 pt-12 sm:gap-24 sm:pb-28 sm:pt-16">
      <IntroSection onScrollClick={handleScrollToTimeline} />

      <div ref={chatAnchorRef}>
        <ChatSection />
      </div>

      <TimelineSection />

      <LoveLetterSection />

      <HeartQuest onComplete={handleQuestComplete} />

      <div ref={finalAnchorRef}>
        <FinalSection visible={questComplete} />
      </div>
    </main>
  );
}
