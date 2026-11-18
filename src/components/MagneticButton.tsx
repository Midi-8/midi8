"use client";

import type { MouseEventHandler, PointerEvent, ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

interface MagneticBaseProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  "aria-label"?: string;
  strength?: number;
}

type MagneticLinkProps = MagneticBaseProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type MagneticNativeButtonProps = MagneticBaseProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  "aria-busy"?: boolean;
};

export type MagneticButtonProps = MagneticLinkProps | MagneticNativeButtonProps;

const SPRING_CONFIG = { stiffness: 260, damping: 18, mass: 0.45 } as const;

export default function MagneticButton(props: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);

  const springX = useSpring(pullX, SPRING_CONFIG);
  const springY = useSpring(pullY, SPRING_CONFIG);
  const textX = useTransform(springX, (v) => v * 0.35);
  const textY = useTransform(springY, (v) => v * 0.35);

  const strength = props.strength ?? 1;
  const isDisabled = props.href === undefined && Boolean(props.disabled);

  const updateLiquidOrigin = (el: HTMLElement, clientX: number, clientY: number) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--liquid-x", `${(clientX - rect.left).toFixed(1)}px`);
    el.style.setProperty("--liquid-y", `${(clientY - rect.top).toFixed(1)}px`);
    return rect;
  };

  const handlePointerEnter = (e: PointerEvent<HTMLElement>) => {
    updateLiquidOrigin(e.currentTarget, e.clientX, e.clientY);
  };

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    const rect = updateLiquidOrigin(e.currentTarget, e.clientX, e.clientY);
    if (prefersReducedMotion || isDisabled || rect.width <= 0 || rect.height <= 0) {
      return;
    }
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pullX.set(nx * 12 * strength);
    pullY.set(ny * 8 * strength);
  };

  const handlePointerLeave = (e: PointerEvent<HTMLElement>) => {
    updateLiquidOrigin(e.currentTarget, e.clientX, e.clientY);
    pullX.set(0);
    pullY.set(0);
  };

  const innerContent = (
    <>
      <span
        aria-hidden="true"
        style={{ left: "var(--liquid-x, 50%)", top: "var(--liquid-y, 50%)" }}
        className={`pointer-events-none absolute w-[240%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground scale-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDisabled ? "" : "group-hover:scale-100"
        }`}
      />
      <motion.span
        style={prefersReducedMotion ? undefined : { x: textX, y: textY }}
        className="relative z-10 inline-flex items-center justify-center gap-2"
      >
        {props.children}
      </motion.span>
    </>
  );

  const wrapperClass = `group relative overflow-hidden ${props.className ?? ""}`;

  const renderElement = () => {
    if (props.href !== undefined) {
      return (
        <Link
          href={props.href}
          onClick={props.onClick}
          aria-label={props["aria-label"]}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className={wrapperClass}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        type={props.type ?? "button"}
        disabled={props.disabled}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
        aria-busy={props["aria-busy"]}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={wrapperClass}
      >
        {innerContent}
      </button>
    );
  };

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      className={`shrink-0 ${props.wrapperClassName ?? "inline-flex"}`}
    >
      {renderElement()}
    </motion.div>
  );
}
