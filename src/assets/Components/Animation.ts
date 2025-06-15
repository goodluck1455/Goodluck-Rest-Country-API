import {type Variants } from "framer-motion";

export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none",
  delay: number,
  effect?: "zoom" | "scale"
): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
      scale: effect === "zoom" || effect === "scale" ? 0.8 : 1,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: effect === "zoom" || effect === "scale" ? 1 : 1,
      transition: {
        type: "tween", // ✅ Allowed values: "tween", "spring", "keyframes"
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75], // ✅ Valid cubic-bezier easing
      },
    },
  };
};
