"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export interface HeadingSegment {
  readonly text: string;
  readonly italic?: boolean;
}

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

interface TokenizedSegment {
  leadingSpace: boolean;
  trailingSpace: boolean;
  italic: boolean;
  words: { word: string; delay: number }[];
}

function tokenizeSegments(segments: readonly HeadingSegment[]): TokenizedSegment[] {
  let wordCounter = 0;
  const result: TokenizedSegment[] = [];

  for (const seg of segments) {
    const words = seg.text.trim().split(/\s+/).filter(Boolean);
    const tokenizedWords = words.map((word) => {
      const delay = wordCounter * 0.055;
      wordCounter += 1;
      return { word, delay };
    });

    result.push({
      leadingSpace: seg.text.startsWith(" "),
      trailingSpace: seg.text.endsWith(" "),
      italic: Boolean(seg.italic),
      words: tokenizedWords,
    });
  }

  return result;
}

export default function KineticHeading({
  segments,
  className = "",
}: {
  segments: readonly HeadingSegment[];
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: "some" });

  if (prefersReducedMotion) {
    return (
      <h2 ref={headingRef} className={className}>
        {segments.map((seg, idx) =>
          seg.italic ? (
            <em key={idx} className="italic font-normal">
              {seg.text}
            </em>
          ) : (
            <span key={idx}>{seg.text}</span>
          )
        )}
      </h2>
    );
  }

  const tokenized = tokenizeSegments(segments);

  return (
    <h2 ref={headingRef} className={`kinetic-heading ${className}`}>
      {tokenized.map((seg, segIdx) => {
        const renderedWords = seg.words.map((entry, wordIdx) => {
          const isLastWord = wordIdx === seg.words.length - 1;
          return (
            <span key={`${segIdx}-${wordIdx}`}>
              <span className="inline-block overflow-hidden align-bottom pt-[0.12em] -mt-[0.12em] pb-[0.28em] -mb-[0.28em] px-[0.14em] -mx-[0.14em]">
                <motion.span
                  initial={{ y: "75%", opacity: 0, filter: "blur(8px)" }}
                  animate={
                    isInView
                      ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                      : { y: "75%", opacity: 0, filter: "blur(8px)" }
                  }
                  transition={{
                    duration: 0.62,
                    delay: entry.delay,
                    ease: REVEAL_EASE,
                  }}
                  className={
                    seg.italic
                      ? "inline-block kinetic-italic-shimmer will-change-[transform,opacity,filter]"
                      : "inline-block will-change-[transform,opacity,filter]"
                  }
                >
                  {entry.word}
                </motion.span>
              </span>
              {!isLastWord ? " " : null}
            </span>
          );
        });

        return seg.italic ? (
          <span key={segIdx}>
            {seg.leadingSpace ? " " : null}
            <em className="italic font-normal">{renderedWords}</em>
            {seg.trailingSpace ? " " : null}
          </span>
        ) : (
          <span key={segIdx}>
            {seg.leadingSpace ? " " : null}
            {renderedWords}
            {seg.trailingSpace ? " " : null}
          </span>
        );
      })}
    </h2>
  );
}
