import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { Magnetic } from "@/components/shared/Magnetic";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { SceneBackdrop } from "@/components/three/SceneBackdrop";

export function OrbCTA() {
  return (
    <section className="relative py-20 bg-[#FAF9F6]">
      <div className="w-full max-w-[1100px] mx-auto px-6">
        <Reveal>
          <Tilt3D max={3} lift={1.005} className="rounded-[1.75rem]">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[rgba(16,29,43,0.1)] bg-[#FAF9F6] px-6 py-16 sm:py-20 text-center shadow-soft">
              <div aria-hidden className="absolute inset-0 grid-pattern opacity-40" />
              <SceneBackdrop scene="ambient" variant="cta" desktopOnly />
              <div className="relative z-10 flex flex-col items-center">
                <KineticHeading as="h2" className="text-4xl sm:text-6xl font-display font-semibold tracking-tight leading-tight text-black">
                  Let's Build <span className="text-gradient">Together</span>
                </KineticHeading>

                <Magnetic className="mt-9">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-sm sm:text-base btn-glow"
                  >
                    Start a Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Tilt3D>
        </Reveal>
      </div>
    </section>
  );
}
