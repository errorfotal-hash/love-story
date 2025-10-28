"use client";

import { useEffect, useState } from "react";
import { START_DATE } from "../constants";
import { getTimeParts, type TimeParts } from "../lib/time";

const labels: Record<keyof TimeParts, string> = {
  days: "Дней",
  hours: "Часов",
  minutes: "Минут",
  seconds: "Секунд"
};

export default function LoveCounter() {
  const [time, setTime] = useState<TimeParts | null>(null);
  const fallback: TimeParts = {
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--"
  };

  useEffect(() => {
    setTime(getTimeParts(START_DATE));
    const interval = setInterval(() => {
      setTime(getTimeParts(START_DATE));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const displayTime = time ?? fallback;

  return (
    <div className="mt-8">
      <div className="glass-card p-6 sm:p-8">
        <p className="text-center text-lg sm:text-xl text-neutral-600">
          Мы уже вместе
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(Object.entries(displayTime) as Array<[keyof TimeParts, string]>).map(
            ([key, value]) => (
              <div key={key} className="rounded-2xl bg-white/60 p-4 text-center shadow-sm">
                <p className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
                  {value}
                </p>
                <p className="mt-1 text-sm text-neutral-500 sm:text-base">
                  {labels[key]}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
