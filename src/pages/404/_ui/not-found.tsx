"use client";

import { Terminal, type TerminalLink, useTerminal } from "@widgets/terminal";

import { useT } from "@features/i18n";

import { NotFoundHero } from "./not-found-hero";

export default function NotFound({
  links,
  path,
}: {
  links: TerminalLink[];
  path: string;
}) {
  const t = useT();

  const translations = {
    badge: t("errors.404.badge"),
    errorLabel: t("errors.404.error_label"),
    title: t("errors.404.title"),
    description: t("errors.404.description"),
    primaryAction: t("errors.404.primary_action"),
    secondaryAction: t("errors.404.secondary_action"),
    consoleTitle: t("errors.404.console_title"),
    consoleSubtitle: t("errors.404.console_subtitle"),
    consolePath: ((): string => {
      const tpl = t("errors.404.console_path_template");
      if (tpl && tpl.includes("{path}")) {
        return tpl.replace("{path}", path || "/unknown");
      }

      const fallback = t("errors.404.console_path");
      if (fallback && fallback.includes("/unknown")) {
        return fallback.replace("/unknown", path || "/unknown");
      }

      return path ? `path: ${path}` : fallback;
    })(),
    consoleStatus: t("errors.404.console_status"),
    consoleHint: t("errors.404.console_hint"),
    consoleHelp: t("errors.404.console_help"),
    consoleOpeningHome: t("errors.404.console_opening_home"),
    consoleNoLinks: t("errors.404.console_no_links"),
    consoleUnknownCommand: t("errors.404.console_unknown_command"),
    consoleOpeningRandom: t("errors.404.console_opening_random"),
    quickExitTitle: t("errors.404.quick_exit_title"),
    quickExitBody: t("errors.404.quick_exit_body"),
  };

  const { lines, inputValue, executeCommand, setInputValue } = useTerminal({
    links,
    consolePathText: translations.consolePath,
    consoleStatusText: translations.consoleStatus,
    consoleHelpText: translations.consoleHelp,
    consoleOpeningHomeText: translations.consoleOpeningHome,
    consoleNoLinksText: translations.consoleNoLinks,
    consoleUnknownCommandText: translations.consoleUnknownCommand,
    consoleOpeningRandomText: translations.consoleOpeningRandom,
    onHome: () => {
      window.setTimeout(() => {
        window.location.href = "/";
      }, 220);
    },
    onOpenLink: (href) => {
      try {
        window.open(href, "_blank", "noopener");
      } catch {
        window.location.href = href;
      }
    },
  });

  return (
    <section className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden px-6 py-16">
      <div className="relative grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <NotFoundHero
          onSecondaryAction={() => executeCommand("random")}
          translations={translations}
        />

        <aside className="relative">
          <div className="absolute inset-0 rounded-4xl bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--fx-bg-start)_16%,transparent)_0%,color-mix(in_oklch,var(--fx-bg-start)_4%,transparent)_38%,color-mix(in_oklch,var(--fx-bg-start)_2%,transparent)_68%,transparent_100%)] blur-2xl" />

          <div className="relative overflow-hidden rounded-4xl border border-(--fx-card-border) bg-(--fx-card-bg) p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-(--fx-card-border) pb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-(--fx-card-text)">
                  {translations.consoleTitle}
                </p>
                <p className="mt-2 text-sm text-(--fx-card-text)">
                  {translations.consoleSubtitle}
                </p>
              </div>
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90 shadow-[0_0_16px_rgba(74,222,128,0.45)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90 shadow-[0_0_16px_rgba(251,191,36,0.35)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90 shadow-[0_0_16px_rgba(244,114,182,0.35)]" />
              </div>
            </div>

            <div className="mt-4">
              <Terminal
                inputValue={inputValue}
                lines={lines}
                onExecuteCommand={executeCommand}
                onInputChange={setInputValue}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-(--fx-card-border) bg-(--fx-card-bg) p-4">
              <p className="text-sm font-medium text-(--fx-card-text)">
                {translations.quickExitTitle}
              </p>
              <p className="mt-2 text-sm leading-7 text-(--fx-card-text)">
                {translations.quickExitBody}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
