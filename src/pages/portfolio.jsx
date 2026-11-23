import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { PageShell, PageHero, CTASection } from "@/components/layout/PageShell";
import { DepthReveal } from "@/components/shared/DepthReveal";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { dataService } from "@/services/dataService";

import dashboard from "@/assets/images/hero-dashboard.jpg";
import aboutHero from "@/assets/images/about_hero.jpg";
import galleryHero from "@/assets/images/gallery_hero.jpg";
import servicesHero from "@/assets/images/services_hero_bg.jpg";
import empowerment from "@/assets/images/empowerment.jpg";

// Only assets that already ship with the site; captions reuse their existing alt text.
const MOMENTS = [
  { src: dashboard, title: "Sherize workspace", span: "md:col-span-2 md:row-span-2" },
  { src: galleryHero, title: "Sherize Culture", span: "" },
  { src: servicesHero, title: "Digital Services", span: "" },
  { src: empowerment, title: "Empowerment at Sherize", span: "" },
  { src: aboutHero, title: "About Sherize", span: "md:col-span-2" },
];

export default function PortfolioPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const load = () => setServices(dataService.getServices() || []);
    load();
    window.addEventListener("sherize_data_updated", load);
    return () => window.removeEventListener("sherize_data_updated", load);
  }, []);

  const list = useMemo(() => services.filter((s) => s && s.img && s.title), [services]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio"
        title="Our work,"
        highlight="at a glance"
        subtitle="The services we deliver and the spaces we build them in."
        scene="portfolio"
      />

      <ServiceMarquee single />

      <section className="relative pb-20 bg-[#FAF9F6] pt-12">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s, i) => (
              <DepthReveal key={s.title} delay={(i % 3) * 0.08}>
                <Tilt3D className="h-full rounded-2xl">
                <article
                  className="group relative h-full overflow-hidden rounded-2xl border border-[rgba(16,29,43,0.1)] bg-white shadow-soft transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      decoding="async"
                      className="mf-img h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-black">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4F789E] line-clamp-3">{s.desc}</p>
                    <Link
                      to="/contact"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                      Inquire Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
                </Tilt3D>
              </DepthReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 bg-[#FAF9F6] border-t border-[rgba(16,29,43,0.06)]">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] md:grid-cols-3 md:gap-5">
            {MOMENTS.map((m, i) => (
              <DepthReveal key={m.title} delay={i * 0.06} className={m.span}>
                <Tilt3D className="h-full w-full rounded-2xl">
                <figure className="group relative h-full w-full overflow-hidden rounded-2xl border border-[rgba(16,29,43,0.1)] shadow-md">
                  <img
                    src={m.src}
                    alt={m.title}
                    loading="lazy"
                    decoding="async"
                    className="mf-img h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B]/85 via-transparent to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 font-display text-base text-white sm:text-lg">
                    {m.title}
                  </figcaption>
                </figure>
                </Tilt3D>
              </DepthReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Let's collaborate"
        title="Let's Build Something"
        highlight="Great Together"
        text="Whether you need a website, app, design support, digital marketing, telecalling, or BPO solutions, Sherize helps your business grow with creativity, technology, and reliable support."
        actions={
          <>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm btn-glow">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium btn-ghost-glass">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        }
      />
    </PageShell>
  );
}
