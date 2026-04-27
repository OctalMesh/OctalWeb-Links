import { useEffect } from "react";

import styles from "@shared/styles/scroll-animated.module.css";

/**
 * Function to animate the elements when they appear.
 *
 * @param entries List of elements in the viewport.
 */
const appearFunction = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add(styles.animate);
      entry.target.classList.remove(styles.fadeOut);
    }
  });
};

/**
 * Function to animate the elements when they disappear.
 *
 * @param entries List of elements in the viewport.
 */
const disappearFunction = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove(styles.animate);
      entry.target.classList.add(styles.fadeOut);
    }
  });
};

/**
 * Search for elements with the `scrollAnimated` class and animate them when
 * they are in the viewport, and reverse the animation when they leave.
 */
export default function useScrollAnimation(): void {
  useEffect(() => {
    /* Get all elements with the `scrollAnimated` class */
    const elements = document.querySelectorAll(`.${styles.scrollAnimated}`);

    /* Create an observer for the appear and disappear functions */
    const observerAppear = new IntersectionObserver(appearFunction, {
      threshold: 0.2,
    });
    const observerDisappear = new IntersectionObserver(disappearFunction, {
      threshold: 0.1,
    });

    /* Observe all elements with the `scrollAnimated` class */
    elements.forEach((element) => {
      observerAppear.observe(element);
      observerDisappear.observe(element);
    });

    /* Cleanup function */
    return () => {
      elements.forEach((element) => {
        observerAppear.unobserve(element);
        observerDisappear.unobserve(element);
      });
    };
  }, []);
}
