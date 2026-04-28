import type { ReactElement } from "react";

import { LinkCard, LinkCategory } from "@features/links";
import { projectConfig } from "@features/links/model";
import type { LinkCardProps } from "@features/links/model";

export function LinksGrid(): ReactElement {
  const cards = initCards(projectConfig.links);

  return (
    <article className="flex w-full flex-col justify-center gap-10">
      {projectConfig.categories.map((category) => (
        <LinkCategory
          key={category.id}
          className="flex flex-col items-center justify-center text-center"
          id={category.id}
          props={category}
        >
          {cards.get(category.id)}
        </LinkCategory>
      ))}
    </article>
  );
}

function initCards(links: LinkCardProps[]) {
  const cardMap = new Map<string, ReactElement[]>();

  links
    .filter((properties) => !properties.disabled)
    .sort((left, right) => left.priority - right.priority)
    .forEach((properties) => {
      const cards = cardMap.get(properties.categoryId) || [];

      cards.push(<LinkCard key={properties.id} properties={properties} />);
      cardMap.set(properties.categoryId, cards);
    });

  return cardMap;
}
