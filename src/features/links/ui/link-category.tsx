import type { ReactElement, ReactNode } from "react";

import { getContent, useLinkLanguage } from "@features/links/model";
import type { LinkCategoryProps } from "@features/links/model";

import styles from "@shared/styles/modules/scroll-animated.module.css";

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
  const language = useLinkLanguage();

  return (
    <div className={className} id={id}>
      <h2 className={`${styles.scrollAnimated} mb-2 text-2xl font-bold`}>{getContent(props.title, language)}</h2>
      <p className={`${styles.scrollAnimated} mb-8 text-lg text-neutral-500`}>{getContent(props.subtitle, language)}</p>
      <div className="flex w-full flex-wrap gap-4">{children}</div>
    </div>
  );
}
