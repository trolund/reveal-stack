import { Children, type CSSProperties, type ReactNode } from "react";
import styles from "./Stack.module.css";

export type OverflowDirection = "top" | "bottom" | "left" | "right";

type StackProps = {
  children: ReactNode;
  reverse?: boolean;
  animate?: boolean;
  itemSize?: number;
  gap?: number;
  overflowDirection?: OverflowDirection;
};

export function RevealStack({
  children,
  reverse = false,
  overflowDirection = "bottom",
  itemSize = 64,
  gap = 8,
  animate = false,
}: StackProps) {
  if (!Number.isFinite(itemSize) || itemSize <= 0) {
    throw new RangeError(
      "Stack itemSize must be a positive, finite number of pixels.",
    );
  }
  if (!Number.isFinite(gap) || gap < 0) {
    throw new RangeError(
      "Stack gap must be a non-negative, finite number of pixels.",
    );
  }

  const items = Children.toArray(children);
  const ordered = reverse ? [...items].reverse() : items;

  const containerStyle: CSSProperties = {
    "--item-size": `${itemSize}px`,
    "--gap": `${gap}px`,
  } as CSSProperties;

  const getItemStyle = (index: number): CSSProperties => {
    const rank =
      overflowDirection === "bottom" || overflowDirection === "right"
        ? index
        : items.length - 1 - index;
    return {
      "--order": rank,
      "--index": index + 1,
      "--count": items.length,
    } as CSSProperties;
  };

  const getItemKey = (child: ReactNode, index: number): string | number => {
    if (typeof child === "object" && child !== null && "key" in child) {
      return child.key ?? index;
    }
    return index;
  };

  return (
    <div
      className={styles.stack}
      data-direction={overflowDirection}
      data-animate={animate}
      style={containerStyle}
    >
      {ordered.map((child, index) => {
        return (
          <div
            key={getItemKey(child, index)}
            className={styles.slot}
            style={getItemStyle(index)}
          >
            <div className={styles.item}>{child}</div>
          </div>
        );
      })}
    </div>
  );
}
