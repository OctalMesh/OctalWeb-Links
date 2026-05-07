import { buttonVariants } from "@shared/ui";

type NotFoundHeroTranslations = {
  badge: string;
  errorLabel: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
};

type NotFoundHeroProps = {
  translations: NotFoundHeroTranslations;
  onSecondaryAction: () => void;
};

export function NotFoundHero({
  translations,
  onSecondaryAction,
}: NotFoundHeroProps) {
  return (
    <div className="max-w-2xl space-y-8">
      <div className="inline-flex items-center gap-3 rounded-full border border-(--fx-card-border) bg-(--fx-card-bg) px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-(--fx-card-text) backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-border-strong shadow-[0_0_24px_color-mix(in_oklch,var(--fx-bg-start)_45%,transparent)]" />
        <p>{translations.badge}</p>
      </div>

      <div className="space-y-4">
        <p className="font-mono text-sm uppercase tracking-[0.5em] text-(--fx-card-text)">
          {translations.errorLabel}
        </p>
        <h1 className="font-bold text-6xl leading-[0.88] tracking-[0.06em] drop-shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:text-7xl">
          {translations.title}
        </h1>
        <p className="max-w-xl text-balance text-lg leading-8 text-(--fx-card-text) sm:text-xl">
          {translations.description}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
        <a href="/" className={buttonVariants({ size: "lg" })}>
          {translations.primaryAction}
        </a>
        <button
          type="button"
          onClick={onSecondaryAction}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          {translations.secondaryAction}
        </button>
      </div>
    </div>
  );
}
