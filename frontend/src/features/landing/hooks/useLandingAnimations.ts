import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface UseLandingAnimationsOptions {
  scope: RefObject<HTMLElement | null>;
  enabled: boolean;
}

export function useLandingAnimations({
  scope,
  enabled,
}: UseLandingAnimationsOptions) {
  useLayoutEffect(() => {
    if (!enabled || !scope.current) return;
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      // Make sure animated-in elements are visible without motion
      const root = scope.current;
      root
        .querySelectorAll<HTMLElement>(
          "[data-anim], [data-anim-fade], [data-anim-section], [data-anim-project-card], [data-anim-capability], [data-anim-career-item], [data-anim-career-card], [data-anim-career-dot], [data-anim-career-detail], [data-anim-career-chip], [data-anim-spine-cap], [data-anim-skill-tile], [data-anim-prompt-card], [data-anim-prompt-console], [data-anim-prompt-line], [data-anim-prompt-input], [data-anim-education-card]",
        )
        .forEach((el) => {
          gsap.set(el, {
            opacity: 1,
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotate: 0,
            clipPath: "none",
          });
        });
      root
        .querySelectorAll<HTMLElement>("[data-anim-career-item]")
        .forEach((el) => {
          el.setAttribute("data-anim-visible", "true");
          el.setAttribute("data-anim-active", "true");
        });
      root
        .querySelectorAll<HTMLElement>("[data-anim-spine-fill]")
        .forEach((el) => {
          gsap.set(el, { height: "100%", scaleY: 1 });
        });
      return;
    }

    let cleanupMouseMove: (() => void) | undefined;
    let cleanupScrollProgress: (() => void) | undefined;
    const cleanupHeroInteractions: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // ============ INTRO TIMELINE ============
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      tl.fromTo(
        "[data-landing-header]",
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0,
      )
        .fromTo(
          '[data-anim="hero-badge"]',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.25,
        )
        .fromTo(
          '[data-anim="hero-name"]',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          0.35,
        )
        .fromTo(
          '[data-anim="hero-role"]',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          0.48,
        )
        .fromTo(
          '[data-anim="hero-title"]',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.62,
        )
        .fromTo(
          '[data-anim="hero-actions"]',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.92,
        )
        .fromTo(
          '[data-anim="hero-tech"]',
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          1.08,
        )
        .fromTo(
          '[data-anim="floating-panel"]',
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          },
          1.16,
        );

      // Description is optional (backend may omit it) — animate only if present.
      const heroDescription = scope.current?.querySelector<HTMLElement>(
        '[data-anim="hero-description"]',
      );
      if (heroDescription) {
        tl.fromTo(
          heroDescription,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.78,
        );
      }

      // ============ MOUSE PARALLAX (hero scene) ============
      const sceneWrap = scope.current?.querySelector<HTMLElement>(
        '[data-anim-section="hero"]',
      );
      const panels = scope.current?.querySelectorAll<HTMLElement>(
        '[data-anim="floating-panel"]',
      );

      if (sceneWrap && panels && panels.length > 0) {
        const setters = Array.from(panels).map((el, i) => ({
          xTo: gsap.quickTo(el, "x", {
            duration: 0.7 + i * 0.05,
            ease: "power3.out",
          }),
          yTo: gsap.quickTo(el, "y", {
            duration: 0.7 + i * 0.05,
            ease: "power3.out",
          }),
          factor: 8 + i * 3,
        }));

        const onMove = (event: MouseEvent) => {
          const rect = sceneWrap.getBoundingClientRect();
          const dx =
            (event.clientX - (rect.left + rect.width / 2)) / rect.width;
          const dy =
            (event.clientY - (rect.top + rect.height / 2)) / rect.height;
          setters.forEach(({ xTo, yTo, factor }, i) => {
            const sign = i % 2 === 0 ? 1 : -1;
            xTo(dx * factor * sign);
            yTo(dy * factor * sign);
          });
        };

        window.addEventListener("mousemove", onMove);
        cleanupMouseMove = () =>
          window.removeEventListener("mousemove", onMove);
      }

      // ============ HERO CURSOR GLOW ============
      const heroSection = scope.current?.querySelector<HTMLElement>(
        '[data-anim-section="hero"]',
      );
      const cursorGlow = scope.current?.querySelector<HTMLElement>(
        "[data-hero-cursor-glow]",
      );

      if (heroSection && cursorGlow) {
        const glowX = gsap.quickTo(cursorGlow, "x", {
          duration: 0.5,
          ease: "power3.out",
        });
        const glowY = gsap.quickTo(cursorGlow, "y", {
          duration: 0.5,
          ease: "power3.out",
        });
        const onEnter = () =>
          gsap.to(cursorGlow, { opacity: 1, duration: 0.4 });
        const onLeave = () =>
          gsap.to(cursorGlow, { opacity: 0, duration: 0.4 });
        const onGlowMove = (event: MouseEvent) => {
          const rect = heroSection.getBoundingClientRect();
          glowX(event.clientX - rect.left);
          glowY(event.clientY - rect.top);
        };
        heroSection.addEventListener("mouseenter", onEnter);
        heroSection.addEventListener("mouseleave", onLeave);
        heroSection.addEventListener("mousemove", onGlowMove);
        cleanupHeroInteractions.push(() => {
          heroSection.removeEventListener("mouseenter", onEnter);
          heroSection.removeEventListener("mouseleave", onLeave);
          heroSection.removeEventListener("mousemove", onGlowMove);
        });
      }

      // ============ MAGNETIC BUTTONS ============
      scope.current
        ?.querySelectorAll<HTMLElement>("[data-hero-magnetic]")
        .forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", {
            duration: 0.4,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(btn, "y", {
            duration: 0.4,
            ease: "power3.out",
          });
          const onMagMove = (event: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            xTo((event.clientX - (rect.left + rect.width / 2)) * 0.3);
            yTo((event.clientY - (rect.top + rect.height / 2)) * 0.4);
          };
          const onMagLeave = () => {
            xTo(0);
            yTo(0);
          };
          btn.addEventListener("mousemove", onMagMove);
          btn.addEventListener("mouseleave", onMagLeave);
          cleanupHeroInteractions.push(() => {
            btn.removeEventListener("mousemove", onMagMove);
            btn.removeEventListener("mouseleave", onMagLeave);
          });
        });

      // ============ HERO BACKDROP SCROLL PARALLAX ============
      // Only move layers WITHOUT a CSS transform animation (image, orbs
      // container) so we don't fight the aurora/orb keyframes.
      if (heroSection) {
        const parallaxLayers: Array<[string, number]> = [
          ['[data-hero-parallax="image"]', 8],
          ['[data-hero-parallax="orbs"]', 26],
        ];
        parallaxLayers.forEach(([selector, amount]) => {
          const layer = scope.current?.querySelector<HTMLElement>(selector);
          if (!layer) return;
          gsap.to(layer, {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        });
      }

      // ============ SECTION SCROLL REVEALS ============
      const fadeItems =
        scope.current?.querySelectorAll<HTMLElement>("[data-anim-fade]");

      fadeItems?.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      // Skill tiles — staggered reveal (overrides the generic data-anim-fade
      // path so we get a tighter, choreographed entrance for the grid).
      const skillTiles = scope.current?.querySelectorAll<HTMLElement>(
        "[data-anim-skill-tile]",
      );
      if (skillTiles && skillTiles.length > 0) {
        gsap.set(skillTiles, { autoAlpha: 0, y: 18, scale: 0.92 });
        ScrollTrigger.create({
          trigger: skillTiles[0],
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(skillTiles, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: "back.out(1.4)",
              stagger: { each: 0.05, from: "start" },
            });
          },
        });
      }

      // Career timeline — spine fill scrubbed against scroll, items slide
      // in from their alternating side, dots get a one-shot pulse when seen.
      const promptCards = scope.current?.querySelectorAll<HTMLElement>(
        "[data-anim-prompt-card]",
      );
      const promptConsole = scope.current?.querySelector<HTMLElement>(
        "[data-anim-prompt-console]",
      );
      const promptLines = scope.current?.querySelectorAll<HTMLElement>(
        "[data-anim-prompt-line]",
      );
      const promptInput = scope.current?.querySelector<HTMLElement>(
        "[data-anim-prompt-input]",
      );

      if (promptCards && promptCards.length > 0) {
        gsap.set(promptCards, { autoAlpha: 0, x: -30, y: 12 });
        ScrollTrigger.create({
          trigger: promptCards[0],
          start: "top 86%",
          once: true,
          onEnter: () => {
            gsap.to(promptCards, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.58,
              ease: "power3.out",
              stagger: 0.08,
            });
          },
        });
      }

      if (promptConsole) {
        const promptLineItems = promptLines ? Array.from(promptLines) : [];
        gsap.set(promptConsole, { autoAlpha: 0, x: 44, rotate: 1.1 });
        if (promptLineItems.length > 0) {
          gsap.set(promptLineItems, { autoAlpha: 0, y: 10 });
        }
        if (promptInput) {
          gsap.set(promptInput, { autoAlpha: 0, y: 16, scale: 0.96 });
        }

        ScrollTrigger.create({
          trigger: promptConsole,
          start: "top 84%",
          once: true,
          onEnter: () => {
            const promptTl = gsap.timeline({
              defaults: { ease: "power3.out" },
            });
            promptTl.to(promptConsole, {
              autoAlpha: 1,
              x: 0,
              rotate: 0,
              duration: 0.72,
            });
            if (promptLineItems.length > 0) {
              promptTl.to(
                promptLineItems,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.42,
                  stagger: 0.075,
                },
                "-=0.28",
              );
            }
            if (promptInput) {
              promptTl.to(
                promptInput,
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.42,
                  ease: "back.out(1.35)",
                },
                "-=0.12",
              );
            }
          },
        });
      }

      const timeline = scope.current?.querySelector<HTMLElement>(
        "[data-anim-timeline]",
      );
      const spineFill = scope.current?.querySelector<HTMLElement>(
        "[data-anim-spine-fill]",
      );
      const careerItems = scope.current?.querySelectorAll<HTMLElement>(
        "[data-anim-career-item]",
      );

      const spineCaps = scope.current?.querySelectorAll<HTMLElement>(
        "[data-anim-spine-cap]",
      );

      if (timeline && spineFill) {
        gsap.set(spineFill, { scaleY: 0, transformOrigin: "top center" });
        gsap.to(spineFill, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 74%",
            end: "bottom 78%",
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });
      }

      if (spineCaps && spineCaps.length > 0) {
        gsap.set(spineCaps, { autoAlpha: 0, scale: 0.55 });
        ScrollTrigger.create({
          trigger: timeline ?? spineCaps[0],
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(spineCaps, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.45,
              ease: "back.out(1.8)",
              stagger: 0.12,
            });
          },
        });
      }

      careerItems?.forEach((item, idx) => {
        // Card lives in grid column 1 (left side) on even indices, column 3
        // (right side) on odd indices — matches the CSS .itemLeft / .itemRight
        // alternation. On mobile (<880px) the grid collapses to one column,
        // so we always slide from the left.
        const isMobile = window.matchMedia("(max-width: 880px)").matches;
        const enterFromLeft = isMobile ? true : idx % 2 === 0;
        const enterDistance = isMobile ? 34 : 64;
        const card = item.querySelector<HTMLElement>("[data-anim-career-card]");
        const dot = item.querySelector<HTMLElement>("[data-anim-career-dot]");
        const details = item.querySelectorAll<HTMLElement>(
          "[data-anim-career-detail]",
        );
        const chips = item.querySelectorAll<HTMLElement>(
          "[data-anim-career-chip]",
        );

        gsap.set(item, { autoAlpha: 1 });
        gsap.set(card, {
          autoAlpha: 0,
          x: enterFromLeft ? -enterDistance : enterDistance,
          y: 22,
          rotate: enterFromLeft ? -1.2 : 1.2,
          transformOrigin: enterFromLeft ? "right center" : "left center",
        });
        gsap.set(dot, { autoAlpha: 0, scale: 0.35 });
        gsap.set(details, { autoAlpha: 0, y: 14 });
        gsap.set(chips, { autoAlpha: 0, y: 10, scale: 0.92 });

        ScrollTrigger.create({
          trigger: item,
          start: "top 84%",
          once: true,
          onEnter: () => {
            item.setAttribute("data-anim-visible", "true");
            const itemTl = gsap.timeline({
              defaults: { ease: "power3.out" },
            });
            itemTl
              .to(dot, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.44,
                ease: "back.out(2)",
              })
              .to(
                card,
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  duration: 0.78,
                },
                "-=0.18",
              )
              .to(
                details,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.46,
                  stagger: 0.055,
                },
                "-=0.38",
              )
              .to(
                chips,
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.36,
                  stagger: 0.035,
                  ease: "back.out(1.35)",
                },
                "-=0.24",
              );
          },
        });

        ScrollTrigger.create({
          trigger: item,
          start: "top 58%",
          end: "bottom 46%",
          onEnter: () => item.setAttribute("data-anim-active", "true"),
          onEnterBack: () => item.setAttribute("data-anim-active", "true"),
          onLeave: () => item.setAttribute("data-anim-active", "false"),
          onLeaveBack: () => item.setAttribute("data-anim-active", "false"),
        });
      });

      // Eyebrow badges — clip-path slide in from left
      scope.current
        ?.querySelectorAll<HTMLElement>("[data-anim-section] .landing-eyebrow")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)", opacity: 0.6 },
            {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

      // Section titles
      scope.current
        ?.querySelectorAll<HTMLElement>(
          "[data-anim-section] .landing-section-title",
        )
        .forEach((el) => {
          gsap.fromTo(
            el,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

      // Section ledes
      scope.current
        ?.querySelectorAll<HTMLElement>(
          "[data-anim-section] .landing-section-lede",
        )
        .forEach((el) => {
          gsap.fromTo(
            el,
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

      // ============ SCROLL PROGRESS BAR ============
      // Native passive listener is more reliable than ScrollTrigger "max"
      // for computing the full-page scroll ceiling.
      const progressBar = scope.current?.querySelector<HTMLElement>(
        "[data-scroll-progress]",
      );
      if (progressBar) {
        const onScrollProgress = () => {
          const scrolled = window.scrollY;
          const total =
            document.documentElement.scrollHeight - window.innerHeight;
          progressBar.style.width =
            total > 0 ? `${(scrolled / total) * 100}%` : "0%";
        };
        window.addEventListener("scroll", onScrollProgress, { passive: true });
        cleanupScrollProgress = () =>
          window.removeEventListener("scroll", onScrollProgress);
      }

      // ============ HEADER GLOW ON SCROLL ============
      const header = scope.current?.querySelector<HTMLElement>(
        "[data-landing-header]",
      );
      if (header) {
        ScrollTrigger.create({
          start: "80px top",
          onEnter: () => header.setAttribute("data-scrolled", "true"),
          onLeaveBack: () => header.removeAttribute("data-scrolled"),
        });
      }

      // ============ PROJECT CARDS STAGGER ============
      const projectCards = scope.current?.querySelectorAll<HTMLElement>(
        "[data-anim-project-card]",
      );
      if (projectCards && projectCards.length > 0) {
        gsap.set(projectCards, { autoAlpha: 0, y: 40, scale: 0.96 });
        ScrollTrigger.create({
          trigger: projectCards[0],
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(projectCards, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              ease: "power3.out",
              stagger: { each: 0.1, from: "start" },
            });
          },
        });
      }

      // ============ CAPABILITY ITEMS STAGGER ============
      const capabilities = scope.current?.querySelectorAll<HTMLElement>(
        "[data-anim-capability]",
      );
      if (capabilities && capabilities.length > 0) {
        gsap.set(capabilities, { autoAlpha: 0, x: -28 });
        ScrollTrigger.create({
          trigger: capabilities[0],
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(capabilities, {
              autoAlpha: 1,
              x: 0,
              duration: 0.55,
              ease: "power2.out",
              stagger: { each: 0.07, from: "start" },
            });
          },
        });
      }

      // ============ STAT COUNTERS ============
      const statValues = scope.current?.querySelectorAll<HTMLElement>(
        "[data-anim-stat-value]",
      );
      if (statValues && statValues.length > 0) {
        ScrollTrigger.create({
          trigger: statValues[0],
          start: "top 85%",
          once: true,
          onEnter: () => {
            statValues.forEach((el) => {
              const target = parseFloat(el.dataset.statTarget ?? "0");
              const suffix = el.dataset.statSuffix ?? "";
              const counter = { val: 0 };
              gsap.to(counter, {
                val: target,
                duration: 1.8,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = Math.ceil(counter.val) + suffix;
                },
              });
            });
          },
        });
      }

      // ============ EDUCATION CARDS — flip-up stagger ============
      const educationCards = scope.current?.querySelectorAll<HTMLElement>(
        "[data-anim-education-card]",
      );
      if (educationCards && educationCards.length > 0) {
        gsap.set(educationCards, {
          autoAlpha: 0,
          y: 60,
          rotateX: -8,
          transformPerspective: 700,
        });
        ScrollTrigger.create({
          trigger: educationCards[0],
          start: "top 86%",
          once: true,
          onEnter: () => {
            gsap.to(educationCards, {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              duration: 0.78,
              ease: "back.out(1.2)",
              stagger: { each: 0.14, from: "start" },
            });
          },
        });
      }

      ScrollTrigger.refresh();
    }, scope);

    return () => {
      cleanupMouseMove?.();
      cleanupScrollProgress?.();
      cleanupHeroInteractions.forEach((fn) => fn());
      ctx.revert();
    };
  }, [enabled, scope]);
}
