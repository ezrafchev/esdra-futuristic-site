"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import Navbar from "@/components/Navbar";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Olá, meu nome é Esdra.\n\nSou um visionário apaixonado por tecnologia, inovação e fé em Jesus Cristo.\n\nMinha missão é me tornar um empresário bilionário com propósito,\najudando milhares de pessoas com sabedoria, disciplina e conhecimento."
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: false,
      showCursor: true,
      cursorChar: "|",
      preStringTyped: () => {
        if (typedRef.current) {
          typedRef.current.style.opacity = "1";
        }
      }
    });

    // Add smooth scrolling
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      typed.destroy();
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen w-full overflow-x-hidden bg-black">
        <section id="hero" className="relative h-screen w-full">
          {!videoError ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              onError={handleVideoError}
              className="absolute top-0 left-0 min-h-full min-w-full object-cover opacity-30"
              poster="https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=1920"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div 
              className="absolute top-0 left-0 min-h-full min-w-full bg-cover bg-center opacity-30"
              style={{
                backgroundImage: "url('https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=1920')",
              }}
            />
          )}

          <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
            <div className="max-w-4xl rounded-xl bg-black/80 p-8 text-center backdrop-blur-xl shadow-2xl">
              <span
                ref={typedRef}
                className="inline-block whitespace-pre-line text-lg font-light leading-relaxed text-white opacity-0 transition-opacity duration-1000 md:text-2xl [text-shadow:_0_1px_10px_rgb(255_255_255_/_20%)]"
              ></span>
            </div>
          </div>
        </section>

        <Technologies />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
