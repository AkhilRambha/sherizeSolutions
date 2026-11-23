import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { ScrollIndicator } from "./ScrollIndicator";
import { SceneBackdrop } from "@/components/three/SceneBackdrop";
import { useCapabilities } from "@/hooks/useCapabilities";
import { gsap, ScrollTrigger } from "@/lib/motion";

import dashboard from "@/assets/images/hero-dashboard.jpg";
import logo from "@/assets/images/logo.png";

/**
 * 2D fallback for the 3D hero screen: used when WebGL is unavailable, the user prefers
 * reduced motion, or the 3D chunk has not finished loading yet.
 */
function HeroPanel({ hidden }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22 });
  const sy = useSpring(my, { stiffness: 70, damping: 22 });
  const rotY = useTransform(sx, [-1, 1], [-20, -6]);
  const rotX = useTransform(sy, [-1, 1], [12, 2]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  return (
    <div
      className="relative mx-auto w-full max-w-[560px] transition-opacity duration-700"
      style={{ perspective: 1400, opacity: hidden ? 0 : 1 }}
      aria-hidden={hidden ? "true" : undefined}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateY: rotY, rotateX: rotX, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/3]"
      >
        <div
          className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.03]"
          style={{ transform: "translateZ(-70px) translate(22px, 22px)" }}
        />
        <div
          className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.05]"
          style={{ transform: "translateZ(-34px) translate(11px, 11px)" }}
        />
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
          style={{ transform: "translateZ(0)" }}
        >
          <img src={dashboard} alt="Sherize workspace" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0f1012]/50 via-transparent to-primary/10" />
        </div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-6 -left-6 sm:-left-10"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="h-16 w-40 overflow-hidden rounded-xl bg-white p-2 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]">
            <img src={logo} alt="Sherize" className="h-full w-full object-contain" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function CinematicHero() {
  const sectionRef = useRef(null);
  const progress = useRef(0);
  const [sceneReady, setSceneReady] = useState(false);
  const { webgl, reduced } = useCapabilities();
  const use3D = webgl && !reduced;

  // Scroll-driven camera: 0 at the top of the page, 1 once the hero has fully scrolled away.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="home" className="relative w-full min-h-[100svh] flex items-center overflow-hidden">
      <HeroBackground />
      {use3D && <SceneBackdrop scene="hero" progressRef={progress} onReady={() => setSceneReady(true)} />}

      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center pt-32 pb-24 lg:py-0">
        <HeroContent />
        <div className="hidden md:block pr-4 lg:pr-0">
          {/* The 3D screen replaces this panel once WebGL is up; it stays as the fallback. */}
          <HeroPanel hidden={use3D && sceneReady} />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
