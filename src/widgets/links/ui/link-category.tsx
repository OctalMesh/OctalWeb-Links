import type { ReactElement, ReactNode } from "react";

import {
  type LinkCategoryProps,
  getContent,
  useLinkLanguage,
} from "@widgets/links";

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
  const titleId = id ? `${id}-title` : undefined;

  return (
    <section aria-labelledby={titleId} className={className} id={id}>
      <h2 id={titleId} className="scrollAnimated mb-2 text-2xl font-bold">
        {getContent(props.title, language)}
      </h2>
      <p className="scrollAnimated mb-8 text-lg text-neutral-500">
        {getContent(props.subtitle, language)}
      </p>
      <ul className="flex w-full flex-wrap justify-center gap-4">{children}</ul>
    </section>
  );
}
