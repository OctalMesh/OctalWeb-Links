import type { ReactElement, ReactNode } from "react";

import styles from "@shared/styles/modules/scroll-animated.module.css";

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
      {props.title && <h2 className={`${styles.scrollAnimated} mb-2 text-2xl font-bold`}>{props.title}</h2>}
      {props.subtitle && <p className={`${styles.scrollAnimated} mb-8 text-lg text-neutral-500`}>{props.subtitle}</p>}
      <div className="flex w-full flex-wrap gap-4">{children}</div>
    </div>
  );
}
