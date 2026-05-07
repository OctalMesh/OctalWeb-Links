import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type TerminalLink = {
  href: string;
  disabled?: boolean;
};

type UseTerminalOptions = {
  links: TerminalLink[];
  consolePathText: string;
  consoleStatusText: string;
  consoleHelpText?: string;
  consoleOpeningHomeText?: string;
  consoleNoLinksText?: string;
  consoleUnknownCommandText?: string;
  consoleOpeningRandomText?: string;
  onHome: () => void;
  onOpenLink: (href: string) => void;
};

export function useTerminal({
  links,
  consolePathText,
  consoleStatusText,
  consoleHelpText,
  consoleOpeningHomeText,
  consoleNoLinksText,
  consoleUnknownCommandText,
  consoleOpeningRandomText,
  onHome,
  onOpenLink,
}: UseTerminalOptions) {
  const enabledLinks = useMemo(
    () => links.filter((link) => !link.disabled),
    [links],
  );

  const initialHelpLines = useMemo(() => {
    if (consoleHelpText) return consoleHelpText.split("\n");
    return [];
  }, [consoleHelpText]);

  const [lines, setLines] = useState<string[]>(() => [
    consolePathText || "path: /unknown",
    ...initialHelpLines,
  ]);
  const [inputValue, setInputValue] = useState("");

  const writeLine = useCallback((text: string) => {
    setLines((currentLines) => [...currentLines, text]);
  }, []);

  const prevHelpRef = useRef<string | undefined>(consoleHelpText);
  const prevPathRef = useRef<string | undefined>(consolePathText);

  useEffect(() => {
    const helpChanged = prevHelpRef.current !== consoleHelpText;
    const pathChanged = prevPathRef.current !== consolePathText;

    if (!helpChanged && !pathChanged) {
      return;
    }

    prevHelpRef.current = consoleHelpText;
    prevPathRef.current = consolePathText;

    const hasUserCommands = lines.some((l) => l.startsWith("> "));
    if (!hasUserCommands) {
      const next = [consolePathText || "path: /unknown", ...initialHelpLines];
      const id = window.setTimeout(() => setLines(next), 0);
      return () => window.clearTimeout(id);
    }
  }, [consoleHelpText, consolePathText, initialHelpLines, lines]);

  const executeCommand = useCallback(
    (command: string) => {
      const value = command.trim();

      if (!value) {
        return;
      }

      writeLine(`> ${value}`);

      switch (value.toLowerCase()) {
        case "help":
          initialHelpLines.forEach(writeLine);
          break;
        case "status":
          writeLine(consoleStatusText || "Status: disconnected");
          break;
        case "home":
          writeLine(consoleOpeningHomeText || "Opening homepage...");
          onHome();
          break;
        case "random": {
          if (enabledLinks.length === 0) {
            writeLine(consoleNoLinksText || "No links available.");
            break;
          }

          const randomLink =
            enabledLinks[Math.floor(Math.random() * enabledLinks.length)];

          if (!randomLink) {
            writeLine("No links available.");
            break;
          }

          if (consoleOpeningRandomText) {
            writeLine(
              consoleOpeningRandomText.replace("{href}", randomLink.href),
            );
          } else {
            writeLine(`Opening random link: ${randomLink.href}`);
          }
          onOpenLink(randomLink.href);
          break;
        }
        default:
          if (consoleUnknownCommandText) {
            writeLine(consoleUnknownCommandText.replace("{cmd}", value));
          } else {
            writeLine(`Unknown command: ${value}`);
          }
      }

      setInputValue("");
    },
    [
      consoleStatusText,
      enabledLinks,
      onHome,
      onOpenLink,
      writeLine,
      initialHelpLines,
      consoleOpeningHomeText,
      consoleNoLinksText,
      consoleUnknownCommandText,
      consoleOpeningRandomText,
    ],
  );

  return {
    executeCommand,
    inputValue,
    lines,
    setInputValue,
  };
}
