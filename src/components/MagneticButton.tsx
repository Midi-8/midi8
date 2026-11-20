"use client";

import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

interface MagneticBaseProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  "aria-label"?: string;
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

export default function MagneticButton(props: MagneticButtonProps) {
  const wrapperClass = `relative overflow-hidden hover:bg-foreground ${props.className ?? ""}`;

  const renderElement = () => {
    if (props.href !== undefined) {
      return (
        <Link
          href={props.href}
          onClick={props.onClick}
          aria-label={props["aria-label"]}
          className={wrapperClass}
        >
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            {props.children}
          </span>
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
        className={wrapperClass}
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {props.children}
        </span>
      </button>
    );
  };

  return (
    <div className={`shrink-0 ${props.wrapperClassName ?? "inline-flex"}`}>
      {renderElement()}
    </div>
  );
}
