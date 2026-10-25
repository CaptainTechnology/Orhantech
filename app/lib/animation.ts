import { type Variants } from "framer-motion";

export const slideUpAnimationVariant: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    transition: {
      duration: 0.2,
      staggerChildren: 0.6, // controls delay between children
      delayChildren: 0.2, // optional initial delay
    },
    opacity: 1,
    y: 0,
  },
};

export const slideLeftAnimationVariant: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    transition: {
      duration: 0.2,
      staggerChildren: 0.2, // controls delay between children
      delayChildren: 0.2, // optional initial delay
    },
    opacity: 1,
    x: 0,
  },
};

export const popUpAnimationVariant: Variants = {
  initial: {
    opacity: 0,
    scale: 0.85,
    y: 40,
  },
  animate: {
    transition: {
      type: "spring",
      duration: 0.7,
    },
    opacity: 1,
    scale: 1,
    y: 0,
  },
};
