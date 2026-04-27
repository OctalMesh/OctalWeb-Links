import type { JSXElementConstructor, ReactElement } from "react";

import { LinkCard, LinkCategory } from "@features/links";
import { socialCards, socialCategories } from "@entities/social";

export function LinksGrid(): ReactElement {
  const cards = initCards();

  return (
    <article className="flex flex-col justify-center gap-10 w-full">
      {socialCategories.map((category) => (
        <LinkCategory key={category.id} className="text-center" id={category.id} props={category}>
          {cards.get(category.id)}
        </LinkCategory>
      ))}
    </article>
  );
}

function initCards() {
  const cardMap = new Map<string, ReactElement<JSXElementConstructor<any>>[]>();

  socialCards.forEach((properties) => {
    const category: string = properties.category || "";
    const cards = cardMap.get(category) || [];

    cards.push(<LinkCard properties={properties} />);
    cardMap.set(category, cards);
  });

  return cardMap;
}
