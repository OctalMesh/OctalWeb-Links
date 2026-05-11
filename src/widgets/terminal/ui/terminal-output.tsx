import * as React from "react";

type TerminalOutputProps = {
  lines: string[];
};

export const TerminalOutput = React.forwardRef<
  HTMLDivElement,
  TerminalOutputProps
>(function TerminalOutput({ lines }, ref) {
  return (
    <div
      ref={ref}
      aria-live="polite"
      className="h-36 overflow-auto whitespace-pre-wrap wrap-break-word font-mono text-sm leading-6 text-(--fx-card-text)"
    >
      {lines.map((line, index) => (
        <div key={`${index}-${line}`}>{line}</div>
      ))}
    </div>
  );
});
