"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const MAP_CENTER: [number, number] = [64.510298, 40.668121];
const MAP_SCRIPT_SRC = "https://api-maps.yandex.ru/2.1/?apikey=bb1de6be-cb8b-4e32-ad47-c28fa8103798&lang=ru_RU";

export default function FirstMeetingMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) {
      return;
    }

    const container = mapRef.current;
    let mapInstance: any = null;
    let cancelled = false;
    let loadHandler: (() => void) | null = null;

    const initializeMap = () => {
      if (cancelled) {
        return;
      }

      const ymapsGlobal = (window as typeof window & { ymaps?: any }).ymaps;
      if (!ymapsGlobal || !ymapsGlobal.Map) {
        return;
      }

      if (container.dataset.initialized === "true") {
        return;
      }

      mapInstance = new ymapsGlobal.Map(container, {
        center: MAP_CENTER,
        zoom: 11,
        controls: []
      });

      mapInstance.behaviors.disable("scrollZoom");

      const placemark = new ymapsGlobal.Placemark(
        MAP_CENTER,
        {
          balloonContentBody: "Первая встреча"
        },
        {
          preset: "islands#redHeartIcon"
        }
      );

      mapInstance.geoObjects.add(placemark);

      setTimeout(() => {
        if (!cancelled) {
          mapInstance?.setCenter(MAP_CENTER, 15, { duration: 900, timingFunction: "ease-in-out" });
        }
      }, 400);

      container.dataset.initialized = "true";
    };

    const ymapsExisting = (window as typeof window & { ymaps?: any }).ymaps;
    if (ymapsExisting) {
      ymapsExisting.ready(initializeMap);
    } else {
      const existingScript = document.querySelector(`script[src="${MAP_SCRIPT_SRC}"]`) as HTMLScriptElement | null;
      if (existingScript) {
        loadHandler = () => {
          (window as typeof window & { ymaps?: any }).ymaps?.ready(initializeMap);
        };
        existingScript.addEventListener("load", loadHandler, { once: true });
      } else {
        const script = document.createElement("script");
        script.src = MAP_SCRIPT_SRC;
        script.async = true;
        script.onload = () => {
          (window as typeof window & { ymaps?: any }).ymaps?.ready(initializeMap);
        };
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      container.innerHTML = "";
      delete container.dataset.initialized;
      mapInstance?.destroy();
      mapInstance = null;
      if (loadHandler) {
        const existingScript = document.querySelector(`script[src="${MAP_SCRIPT_SRC}"]`) as HTMLScriptElement | null;
        existingScript?.removeEventListener("load", loadHandler);
      }
    };
  }, []);

  return (
    <section className="py-12 sm:py-16">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-display font-semibold text-neutral-900 sm:text-4xl">
          Здесь мы встретились впервые
        </h2>
        <p className="max-w-2xl text-sm text-neutral-500 sm:text-base">
          Тут началась наша история.
        </p>
      </motion.div>

      <motion.div
        className="mx-auto mt-8 w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="glass-card relative overflow-hidden rounded-[32px] bg-white/70 p-4 shadow-xl">
          <div className="relative h-[360px] w-full overflow-hidden rounded-3xl sm:h-[420px]">
            <div ref={mapRef} className="h-full w-full" aria-label="Карта места первой встречи" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
