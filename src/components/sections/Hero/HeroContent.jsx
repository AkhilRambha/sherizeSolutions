import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { Magnetic } from "@/components/shared/Magnetic";

export function HeroContent() {
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="relative z-10 w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } } }}
        className="flex flex-col items-start"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full p-1 pr-4 text-xs text-white/80 font-medium">
            <span className="bg-primary/15 text-primary rounded-full p-1.5 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            Premium Digital Innovation
          </div>
        </motion.div>

        <KineticHeading
          as="h1"
          delay={0.35}
          className="font-display font-semibold text-5xl sm:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-tight text-white mb-6"
        >
          We Build <span className="text-gradient">What's Next.</span>
        </KineticHeading>

        <motion.p variants={item} className="text-base sm:text-lg text-white/70 max-w-xl mb-3 leading-relaxed">
          From intelligent software to immersive digital experiences, Sherize transforms ideas into
          scalable technology.
        </motion.p>

        <motion.p variants={item} className="text-sm text-[#D6A35B] font-medium max-w-xl mb-10 leading-relaxed">
          Empowering businesses. Empowering women. Everywhere.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-3 sm:gap-4">
          <Magnetic>
            <Link
              to="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base btn-glow"
            >
              Explore Our Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>

          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-medium border border-[#D6A35B]/40 text-[#D6A35B] hover:bg-[#D6A35B]/10 hover:border-[#D6A35B] transition-all duration-300"
          >
            Start a Project
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>

          <a
            href="https://play.google.com/store/apps/details?id=in.sherize.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm sm:text-base font-medium btn-ghost-glass"
          >
            <FaGooglePlay className="h-4 w-4 text-[#00E676]" />
            Sherize BPO App
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
