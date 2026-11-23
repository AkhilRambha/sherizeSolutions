import { Marquee } from "@/components/shared/Marquee";
import { SERVICES_MENU } from "@/config/servicesMenu";

const ALL = SERVICES_MENU.flatMap((col) =>
  col.items.map((item) => (typeof item === "string" ? item : item.name))
);
const HALF = Math.ceil(ALL.length / 2);

/** Two counter-moving rows of the real service names (same data as the navbar menu). */
export function ServiceMarquee({ single = false }) {
  return (
    <section aria-label="Sherize services" className="relative overflow-hidden py-10 sm:py-14 bg-[#FAF9F6] border-y border-[rgba(16,29,43,0.06)]">
      <Marquee items={single ? ALL : ALL.slice(0, HALF)} direction={1} duration={single ? 110 : 85} />
      {!single && (
        <Marquee items={ALL.slice(HALF)} direction={-1} duration={95} className="mt-3 sm:mt-5" />
      )}
    </section>
  );
}
