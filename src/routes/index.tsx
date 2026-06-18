import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  MapPin,
  ArrowRight,
  Coffee,
  Trophy,
  Sparkles,
  Clock,
  Users,
  Zap,
  ArrowUpRight,
  Star,
  Heart,
  Navigation,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

import burger from "@/assets/burger.jpg";
import coffee from "@/assets/coffee.jpg";
import pizza from "@/assets/pizza.jpg";
import turfHero from "@/assets/turf-hero.jpg";
import galTurf1 from "@/assets/gallery-turf1.jpg";
import galBurger from "@/assets/gallery-burger.jpg";
import galTurf2 from "@/assets/gallery-turf2.jpg";
import galCoffee from "@/assets/gallery-coffee.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kraves — Surat's Favourite Sports Turf & Café" },
      {
        name: "description",
        content:
          "Where great food meets great play. Surat's premier sports turf & café experience in Vesu.",
      },
      { property: "og:title", content: "Kraves — Sports Turf & Café in Vesu, Surat" },
      {
        property: "og:description",
        content: "Play. Relax. Eat. Repeat. FIFA-grade turf, floodlit nights, and a café that lingers.",
      },
    ],
  }),
  component: Index,
});

/* ---------------- shared bits ---------------- */

const ease = [0.22, 1, 0.36, 1] as const;

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="text-[11px] font-semibold tracking-[0.3em] text-[var(--kraves-orange)]"
    >
      {n} — {label}
    </motion.p>
  );
}

function PrimaryButton({
  children,
  glow = false,
  className = "",
}: {
  children: React.ReactNode;
  glow?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full bg-[var(--kraves-orange)] px-7 py-4 text-sm font-bold tracking-wider text-black transition-all hover:bg-[var(--kraves-orange-glow)] hover:scale-[1.02] ${
        glow ? "animate-pulse-glow" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

function GhostButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[var(--kraves-border)] bg-white/[0.03] px-7 py-4 text-sm font-bold tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/[0.08] ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------------- navigation ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const items = ["About", "Menu", "Turf", "Gallery", "Reviews", "Visit"];
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease, delay: 0.2 }}
      className="fixed left-1/2 top-6 z-50 w-[min(1280px,calc(100%-2rem))] -translate-x-1/2"
    >
      <div
        className={`grid grid-cols-[auto_1fr_auto] items-center gap-6 rounded-full border border-[var(--kraves-border)] px-6 py-3 transition-all ${
          scrolled ? "bg-black/80 backdrop-blur-xl" : "bg-black/40 backdrop-blur-md"
        }`}
      >
        <a href="#top" className="font-display text-2xl tracking-wider">
          KR<span className="text-[var(--kraves-orange)]">A</span>VES
        </a>
        <ul className="hidden items-center justify-center gap-8 text-[11px] font-bold tracking-[0.25em] text-white/80 lg:flex">
          {items.map((i) => (
            <li key={i}>
              <a
                href={`#${i.toLowerCase()}`}
                className="transition-colors hover:text-[var(--kraves-orange)]"
              >
                {i.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="tel:+919773199950"
            className="hidden items-center gap-2 rounded-full border border-[var(--kraves-border)] bg-white/[0.03] px-4 py-2.5 text-xs font-bold tracking-wider sm:inline-flex"
          >
            <Phone className="h-4 w-4 text-[var(--kraves-orange)]" />
            +91 97731 99950
          </a>
          <a
            href="#visit"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--kraves-orange)] px-5 py-2.5 text-xs font-bold tracking-widest text-black"
          >
            <MapPin className="h-4 w-4" /> VISIT
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

/* ---------------- hero ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-32"
    >
      <motion.div
        style={{ y: yBg, backgroundImage: `url(${heroBg})` }}
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-transparent to-black" />

      {/* badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease }}
        className="absolute top-24 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 rounded-full border border-[var(--kraves-border)] bg-black/60 px-4 py-2 text-[10px] font-bold tracking-[0.3em] backdrop-blur-md"
      >
        <Star className="h-3 w-3 fill-[var(--kraves-orange)] text-[var(--kraves-orange)]" />
        4.1 ★ ON GOOGLE · VESU, SURAT
      </motion.div>

      {/* floating images */}
      <motion.div
        style={{ y: yLeft }}
        className="pointer-events-none absolute left-[4%] top-[42%] hidden md:block"
      >
        <div className="animate-float">
          <div className="h-44 w-44 overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(255,90,31,0.35)]">
            <img src={coffee} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </motion.div>
      <motion.div
        style={{ y: yRight }}
        className="pointer-events-none absolute right-[5%] top-[28%] hidden md:block"
      >
        <div className="animate-float [animation-delay:-2s]">
          <div className="h-52 w-52 overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(255,90,31,0.4)]">
            <img src={burger} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </motion.div>
      <motion.div
        style={{ y: yRight }}
        className="pointer-events-none absolute right-[10%] bottom-[18%] hidden md:block"
      >
        <div className="animate-float [animation-delay:-4s]">
          <div className="h-40 w-40 overflow-hidden rounded-2xl rotate-6 ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(255,90,31,0.4)]">
            <img src={pizza} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-[5] mx-auto max-w-[1400px] px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="font-display uppercase text-white"
          style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
        >
          <span className="block">Surat's</span>
          <span className="block">Favourite</span>
          <span className="block">
            <span className="text-[var(--kraves-orange)]">Sports</span> Turf
          </span>
          <span className="block">& Cafe</span>
          <span className="block text-stroke-white">Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mx-auto mt-10 max-w-xl text-base text-white/70 md:text-lg"
        >
          Play. Relax. Eat. Repeat. — Where great food meets great play.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 text-[10px] font-bold tracking-[0.4em] text-white/40"
        >
          SCROLL
        </motion.p>
        <div className="mt-3 flex justify-center">
          <div className="animate-scroll-hint h-8 w-px bg-white/40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <PrimaryButton glow>
            <MapPin className="h-4 w-4" /> EXPLORE MENU <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
          <GhostButton>
            BOOK TURF <ArrowRight className="h-4 w-4" />
          </GhostButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- marquee ---------------- */

function Marquee() {
  const words = ["Sports", "Vibes", "Coffee", "Turf"];
  const row = [...words, ...words, ...words, ...words];
  return (
    <section className="relative overflow-hidden border-y border-[var(--kraves-border)] py-12">
      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            <span
              className={`font-display uppercase ${i % 2 === 0 ? "text-stroke" : "text-white"}`}
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
            >
              {w}
            </span>
            <span className="h-3 w-3 rounded-full bg-[var(--kraves-orange)]" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- about ---------------- */

function About() {
  const features = [
    { icon: Coffee, title: "Café Culture", desc: "Specialty coffee, comfort food and a vibe that lingers." },
    { icon: Trophy, title: "Sports Turf", desc: "FIFA-quality grass, floodlit nights, weekend leagues." },
    { icon: Sparkles, title: "The Vibe", desc: "Music, lights and the buzz of friends — every single day." },
  ];
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto mb-24 max-w-3xl text-2xl leading-relaxed text-white md:text-3xl"
        >
          Kraves is where the energy of the turf meets the warmth of the café. We crafted a destination
          where every match ends with a flat-white, every weekend turns into a memory, and every plate
          feels like a celebration.
        </motion.p>

        <div className="grid items-end gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel n="01" label="ABOUT KRAVES" />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display mt-5 uppercase text-white"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              More Than
              <br />A <span className="text-[var(--kraves-orange)]">Café.</span>
              <br />
              <span className="text-stroke-white">A Lifestyle.</span>
            </motion.h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="group rounded-2xl border border-[var(--kraves-border)] bg-white/[0.02] p-6 transition-all hover:border-[var(--kraves-orange)]/40 hover:bg-white/[0.04]"
              >
                <f.icon className="h-7 w-7 text-[var(--kraves-orange)]" strokeWidth={2} />
                <h3 className="mt-6 text-sm font-bold tracking-[0.2em] uppercase">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- menu strip ---------------- */

function MenuStrip() {
  const items = [
    { tag: "SIGNATURE", title: "Coffee", desc: "Single-origin pours, oat-milk lattes and an espresso bar that hums all day." },
    { tag: "STONE-BAKED", title: "Pizza", desc: "Wood-fired bases, slow-fermented dough and unapologetic cheese pulls." },
    { tag: "MATCH-DAY", title: "Snacks", desc: "Loaded fries, peri-peri wings, nachos & game-time platters." },
    { tag: "SWEET THINGS", title: "Desserts", desc: "Molten chocolate, gelato stacks and the famous brownie sundae." },
    { tag: "COOLERS", title: "Mocktails", desc: "Fresh citrus, smoked basil, mint pop — built for hot Surat afternoons." },
  ];
  return (
    <section id="menu" className="relative px-6 py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel n="02" label="THE MENU" />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display mt-5 uppercase"
              style={{ fontSize: "clamp(3rem, 6.5vw, 6rem)" }}
            >
              Plates that <span className="text-[var(--kraves-orange)]">play</span>.
            </motion.h2>
          </div>
          <p className="max-w-sm text-white/60">
            Built for post-match cravings and lazy afternoon scrolls. Every dish is a reason to stay
            longer.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-[var(--kraves-border)] bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-all hover:-translate-y-1 hover:border-[var(--kraves-orange)]/40"
            >
              <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--kraves-orange)]">
                {it.tag}
              </p>
              <h3 className="font-display mt-4 text-3xl uppercase">{it.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60">{it.desc}</p>
              <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-white/30 transition-all group-hover:text-[var(--kraves-orange)] group-hover:rotate-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- turf ---------------- */

function Turf() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const stats = [
    { icon: Clock, label: "OPEN HOURS", val: "10AM — 1AM" },
    { icon: Users, label: "SQUAD SIZE", val: "5-a-side · 7-a-side" },
    { icon: Zap, label: "SURFACE", val: "FIFA-Grade Turf" },
    { icon: ArrowRight, label: "LIGHTING", val: "Floodlit Nights" },
  ];
  return (
    <section
      id="turf"
      ref={ref}
      className="relative overflow-hidden px-6 py-32"
    >
      <motion.div
        style={{ y, backgroundImage: `url(${turfHero})` }}
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/70 to-black" />

      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2">
        <div>
          <SectionLabel n="03" label="SPORTS TURF" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="font-display mt-5 uppercase"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
          >
            Bring the
            <br />
            <span className="text-[var(--kraves-orange)]">Noise.</span>
          </motion.h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-white/70">
            Floodlit nights. FIFA-grade grass. Friends, rivals & full-throttle action — book your slot
            and own the field.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton>BOOK YOUR SLOT <ArrowRight className="h-4 w-4" /></PrimaryButton>
            <GhostButton>WHATSAPP US <ArrowRight className="h-4 w-4" /></GhostButton>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 self-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="rounded-3xl border border-[var(--kraves-border)] bg-gradient-to-br from-white/[0.06] to-transparent p-6 backdrop-blur"
            >
              <s.icon className="h-6 w-6 text-[var(--kraves-orange)]" strokeWidth={2} />
              <p className="mt-6 text-[10px] font-bold tracking-[0.3em] text-white/50">{s.label}</p>
              <p className="mt-2 text-xl font-bold">{s.val}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- gallery ---------------- */

function Gallery() {
  const imgs = [galTurf1, galBurger, galTurf2, galCoffee];
  return (
    <section id="gallery" className="relative px-6 py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel n="04" label="GALLERY" />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display mt-5 uppercase"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
            >
              Inside The
              <br />
              <span className="text-stroke-white">Moments.</span>
            </motion.h2>
          </div>
          <p className="max-w-md text-white/60">
            A scroll through the energy, the plates and the people that make Kraves, Kraves.
          </p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-3 px-3 md:grid-cols-4 md:gap-4 md:px-0">
        {imgs.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            className="group relative aspect-[3/4] overflow-hidden"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- stats ---------------- */

function Stats() {
  const data = [
    { icon: Star, val: "4.1★", label: "GOOGLE RATING" },
    { icon: Heart, val: "12,000+", label: "HAPPY CUSTOMERS" },
    { icon: Coffee, val: "350+", label: "CUPS SERVED DAILY" },
    { icon: Users, val: "200+", label: "PLAYERS WEEKLY" },
  ];
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-[1400px] text-center">
        <SectionLabel n="05" label="WHY KRAVES" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="font-display mt-5 uppercase"
          style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
        >
          Loved By
          <br />
          <span className="text-[var(--kraves-orange)]">Surat.</span>
        </motion.h2>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {data.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              className="rounded-3xl border border-[var(--kraves-border)] bg-white/[0.03] p-8"
            >
              <d.icon className="h-7 w-7 text-[var(--kraves-orange)]" strokeWidth={2} />
              <p className="font-display mt-10 text-6xl text-white md:text-7xl">{d.val}</p>
              <p className="mt-3 text-[10px] font-bold tracking-[0.3em] text-white/50">{d.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- reviews ---------------- */

const REVIEWS = [
  { name: "Aarav Shah", role: "Local Guide · 24 reviews", stars: 5, text: "Best turf in Vesu hands down. Pitch is buttery and the coffee after the match is unreal." },
  { name: "Priya Mehta", role: "Reviewer · 8 reviews", stars: 4, text: "Lovely vibe, friendly staff. The pizza is genuinely good — comes hot, cheesy, no shortcuts." },
  { name: "Karan Mehta", role: "Reviewer · 14 reviews", stars: 4, text: "Perfect place to chill with friends. We come every Friday — the energy is incredible." },
  { name: "Riya Patel", role: "Local Guide · 30 reviews", stars: 5, text: "Floodlit nights are magic. Booked the turf for a birthday — Kraves made it special." },
  { name: "Devansh Joshi", role: "Reviewer · 5 reviews", stars: 4, text: "Loaded fries + a 7-a-side with the boys = ideal Saturday. Will be back next week." },
];

function Reviews() {
  const [i, setI] = useState(2);
  const filters = ["Great Ambience", "Friendly Staff", "Delicious Food", "Sports Community", "Affordable Pricing"];
  const r = REVIEWS[i];

  return (
    <section id="reviews" className="relative px-6 py-32">
      <div className="mx-auto max-w-[1400px] text-center">
        <SectionLabel n="06" label="REVIEWS" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="font-display mt-5 uppercase"
          style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
        >
          What Surat
          <br />
          Is <span className="text-stroke-white">Saying.</span>
        </motion.h2>

        <div className="mx-auto mt-16 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease }}
              className="relative rounded-3xl border border-[var(--kraves-border)] bg-white/[0.03] p-10 text-left md:p-14"
            >
              <Quote className="absolute right-8 bottom-8 h-16 w-16 text-[var(--kraves-orange)]/30" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-5 w-5 ${
                      s < r.stars
                        ? "fill-[var(--kraves-orange)] text-[var(--kraves-orange)]"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-8 text-2xl leading-relaxed md:text-3xl">"{r.text}"</p>
              <div className="mt-10 flex items-center justify-between border-t border-[var(--kraves-border)] pt-6">
                <div>
                  <p className="font-display text-xl uppercase">{r.name}</p>
                  <p className="mt-1 text-xs text-white/50">{r.role}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setI((p) => (p - 1 + REVIEWS.length) % REVIEWS.length)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[var(--kraves-border)] transition-colors hover:bg-white/10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setI((p) => (p + 1) % REVIEWS.length)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[var(--kraves-border)] transition-colors hover:bg-white/10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1 rounded-full transition-all ${
                  idx === i ? "w-10 bg-[var(--kraves-orange)]" : "w-5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <span
              key={f}
              className="rounded-full border border-[var(--kraves-border)] bg-white/[0.03] px-6 py-3 text-[11px] font-bold tracking-[0.2em] uppercase"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- find us ---------------- */

function FindUs() {
  return (
    <section id="visit" className="relative px-6 py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel n="07" label="FIND US" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="font-display mt-5 uppercase"
          style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
        >
          Vesu,
          <br />
          <span className="text-[var(--kraves-orange)]">Surat.</span>
        </motion.h2>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[var(--kraves-border)] bg-white/[0.03] p-8 md:p-10">
            {[
              { icon: MapPin, label: "ADDRESS", val: "Balaji Rd, near Punyabhoomi Building,\nOpp. Govindji Sports Ground,\nVesu, Surat, Gujarat" },
              { icon: Phone, label: "PHONE", val: "+91 97731 99950" },
              { icon: Clock, label: "HOURS", val: "Daily · 10:00 AM — 1:00 AM" },
            ].map((c) => (
              <div key={c.label} className="flex gap-5 border-b border-[var(--kraves-border)] py-6 last:border-b-0">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/[0.04]">
                  <c.icon className="h-5 w-5 text-[var(--kraves-orange)]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-white/50">{c.label}</p>
                  <p className="mt-2 whitespace-pre-line text-lg">{c.val}</p>
                </div>
              </div>
            ))}
            <button className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--kraves-orange)] px-6 py-5 text-sm font-bold tracking-widest text-black transition-colors hover:bg-[var(--kraves-orange-glow)]">
              <Navigation className="h-4 w-4" /> GET DIRECTIONS
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[var(--kraves-border)] min-h-[420px]">
            <iframe
              title="Kraves location"
              src="https://www.google.com/maps?q=Balaji+Rd+Vesu+Surat&output=embed"
              className="h-full w-full grayscale-[0.4] invert-[0.85] hue-rotate-180"
              style={{ minHeight: 420, border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- final CTA ---------------- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-40 text-center">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${turfHero})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/60 to-black" />
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel n="08" label="YOUR MOVE" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="font-display mt-6 uppercase"
          style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
        >
          Ready For Your
          <br />
          Next <span className="text-[var(--kraves-orange)]">Hangout?</span>
        </motion.h2>
        <p className="mx-auto mt-10 max-w-xl text-lg text-white/70">
          Bring the squad. Book the turf. Order the burger. Stay for the vibe.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton glow>
            <MapPin className="h-4 w-4" /> VISIT KRAVES
          </PrimaryButton>
          <GhostButton>
            <Phone className="h-4 w-4" /> CALL NOW
          </GhostButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-[var(--kraves-border)] px-6 pt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl">
              KR<span className="text-[var(--kraves-orange)]">A</span>VES
            </p>
            <p className="mt-6 max-w-xs text-white/60">
              Where great food meets great play. Surat's premier sports turf & café experience in Vesu.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-white/40">VISIT</p>
            <div className="mt-5 flex items-start gap-3 text-white/80">
              <MapPin className="mt-1 h-4 w-4 text-[var(--kraves-orange)]" />
              Balaji Rd, Vesu, Surat, Gujarat
            </div>
            <div className="mt-3 flex items-center gap-3 text-white/80">
              <Phone className="h-4 w-4 text-[var(--kraves-orange)]" />
              +91 97731 99950
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-white/40">FOLLOW</p>
            <a
              href="#"
              className="mt-5 inline-grid h-12 w-12 place-items-center rounded-2xl border border-[var(--kraves-border)] transition-colors hover:bg-white/10"
            >
              <Instagram className="h-5 w-5 text-[var(--kraves-orange)]" />
            </a>
            <p className="mt-8 text-[10px] font-bold tracking-[0.3em] text-white/40">OPEN DAILY</p>
            <p className="mt-2 text-white/80">10:00 AM — 1:00 AM</p>
          </div>
        </div>

        <div className="mt-20 overflow-hidden">
          <p
            className="font-display select-none bg-gradient-to-b from-white/40 to-transparent bg-clip-text text-center uppercase text-transparent"
            style={{ fontSize: "clamp(5rem, 22vw, 22rem)", lineHeight: 0.9 }}
          >
            KRAVES
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--kraves-border)] py-8 text-xs text-white/40">
          <p>© 2026 Kraves Sports Turf & Café. All rights reserved.</p>
          <p className="tracking-[0.2em]">CRAFTED IN SURAT</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- page ---------------- */

function Index() {
  return (
    <main className="relative bg-[var(--kraves-bg)] text-white">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <MenuStrip />
      <Turf />
      <Gallery />
      <Stats />
      <Reviews />
      <FindUs />
      <FinalCTA />
      <Footer />
    </main>
  );
}
