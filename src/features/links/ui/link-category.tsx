import type { ReactElement, ReactNode } from "react";

import styles from "@shared/styles/scroll-animated.module.css";

export type LinkCategoryProps = {
  id: string;
  title?: string;
  subtitle?: string;
};

export function LinkCategory({
  props,
  id,
  className,
  children,
}: {
  props: LinkCategoryProps;
  id?: string;
  className?: string | undefined;
  children: ReactNode;
}): ReactElement {
  return (
    <div className={className} id={id}>
      {props.title && <h1 className={`${styles.scrollAnimated} text-2xl font-bold mb-2`}>{props.title}</h1>}
      <p className={`${styles.scrollAnimated} text-lg text-neutral-500 mb-8`}>{props.subtitle}</p>
      <div className="flex flex-wrap gap-4 w-full">{children}</div>
    </div>
  );
}
