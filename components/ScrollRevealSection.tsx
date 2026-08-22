"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ScrollRevealSection.module.css";
const content = [
  {
    number: "01",
    label: "TECHNOLOGY",
    title: "Technology That Moves Business Forward",
    text: "We deliver innovative technology solutions designed to simplify operations, improve efficiency, and help businesses stay connected in a rapidly evolving digital world.",
    image: "/images/tech-slide.jpg",
  },
  {
    number: "02",
    label: "ENTERPRISE SOLUTIONS",
    title: "Solutions Built Around Your Business",
    text: "From enterprise applications to infrastructure and networking, our solutions are designed around real business requirements and long-term performance.",
    image: "/images/enterprise-slide.jpg",
  },
  {
    number: "03",
    label: "DIGITAL INNOVATION",
    title: "Turning Ideas Into Digital Solutions",
    text: "Our team combines technical expertise with practical business knowledge to create reliable, scalable, and future-ready digital experiences.",
    image: "/images/digital-slide.jpg",
  },
];




export default function ScrollRevealSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [progress, setProgress] = useState(0);

  /*
   * Track how far the user has scrolled
   * through this section.
   */
  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const scrollDistance =
        section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) {
        setProgress(0);
        return;
      }

      const rawProgress =
        -rect.top / scrollDistance;

      const normalizedProgress = Math.max(
        0,
        Math.min(1, rawProgress)
      );

      setProgress(normalizedProgress);
    };

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  /*
   * Convert overall scroll progress
   * into the current content stage.
   *
   * 0.00 - 0.333  → 01
   * 0.333 - 0.666 → 02
   * 0.666 - 1.00  → 03
   */
  const total = content.length;

  const scaledProgress = progress * total;

  let index = Math.floor(scaledProgress);

  if (index >= total) {
    index = total - 1;
  }

  const localProgress = scaledProgress - index;

  /*
   * Each content panel:
   *
   * 0% - 25%   → enters
   * 25% - 75%  → stays visible
   * 75% - 100% → exits
   */
  let panelProgress = 0;

  if (localProgress < 0.25) {
    panelProgress = localProgress / 0.25;
  } else if (localProgress < 0.75) {
    panelProgress = 1;
  } else {
    panelProgress =
      1 -
      (localProgress - 0.75) / 0.25;
  }

  panelProgress = Math.max(
    0,
    Math.min(1, panelProgress)
  );

  /*
   * Smooth cubic easing.
   */
  const eased =
    1 -
    Math.pow(1 - panelProgress, 3);

  /*
   * Panel starts 110% outside
   * the right side and moves to 0%.
   */
  const panelX = 110 - eased * 110;

  const active = content[index];

  return (
    <section
      ref={sectionRef}
      className={styles.section}
    >
      <div className={styles.sticky}>
        <div className={styles.background}>

          {/* =====================================
              BACKGROUND
          ====================================== */}

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at 25% 50%, rgba(45, 90, 160, 0.12), transparent 35%), radial-gradient(circle at 80% 20%, rgba(80, 120, 220, 0.08), transparent 30%)",
            }}
          />

          {/* =====================================
              TOP LABEL
          ====================================== */}

          <div className={styles.topLabel}>
            EASY WARE SOLUTIONS
            <span> / DIGITAL SYSTEMS</span>
          </div>
          <div
  className={styles.imageWrap}
  style={{
    opacity: eased,
    transform: `translateY(-50%) translateX(${(1 - eased) * -50}px) scale(${0.92 + eased * 0.08})`,
  }}
>
    <img
      key={active.image}
      src={active.image}
      alt={active.title}
      className={styles.floatImage}
    />
  </div>
  {/* ⬆️ YAHAN TAK ⬆️ */}

          {/* =====================================
              RIGHT CONTENT
          ====================================== */}

          <div
            className={styles.panel}
            style={{
              transform: `
                translateY(-50%)
                translateX(${panelX}%)
              `,
            }}
          >
            <div className={styles.panelLabel}>
              {active.number}

              <span> / </span>

              {active.label}
            </div>

            <h2 className={styles.panelTitle}>
              {active.title}
            </h2>

            <div className={styles.panelLine} />

            <p className={styles.panelText}>
              {active.text}
            </p>
          </div>

          {/* =====================================
              PROGRESS
          ====================================== */}

          <div className={styles.progress}>
            <span>
              0{index + 1}
            </span>

            <div className={styles.progressLine}>
              <div
                className={styles.progressFill}
                style={{
                  transform: `scaleX(${progress})`,
                }}
              />
            </div>

            <span>
              0{total}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}