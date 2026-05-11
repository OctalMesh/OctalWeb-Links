"use client";

import * as React from "react";

import { TerminalOutput } from "./terminal-output";

type TerminalProps = {
  lines: string[];
  inputValue: string;
  onExecuteCommand: (command: string) => void;
  onInputChange: (value: string) => void;
};

export function Terminal({
  lines,
  inputValue,
  onExecuteCommand,
  onInputChange,
}: TerminalProps) {
  const outputRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const output = outputRef.current;

    if (output) {
      output.scrollTop = output.scrollHeight;
    }
  }, [lines]);

  return (
    <div
      id="fake-terminal"
      className="w-full rounded-xl border border-(--fx-card-border) p-3"
    >
      <TerminalOutput ref={outputRef} lines={lines} />

      <div className="mt-3">
        <label htmlFor="terminal-input" className="sr-only">
          Interactive terminal input
        </label>
        <input
          id="terminal-input"
          placeholder="type 'help' and press Enter"
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") {
              return;
            }

            onExecuteCommand(inputValue);
          }}
          className="w-full rounded-md border border-(--fx-card-border) bg-transparent px-3 py-2 text-sm text-(--fx-card-text) focus:outline-none"
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => onExecuteCommand("help")}
          className="w-full rounded-md border border-(--fx-card-border) bg-[color-mix(in_oklch,var(--fx-bg-start)_6%,transparent)] px-3 py-2 text-sm transition duration-500 hover:bg-(--fx-card-bg-hover)"
        >
          help
        </button>
        <button
          type="button"
          onClick={() => onExecuteCommand("status")}
          className="w-full rounded-md border border-(--fx-card-border) bg-[color-mix(in_oklch,var(--fx-bg-start)_6%,transparent)] px-3 py-2 text-sm transition duration-500 hover:bg-(--fx-card-bg-hover)"
        >
          status
        </button>
        <button
          type="button"
          onClick={() => onExecuteCommand("home")}
          className="w-full rounded-md border border-(--fx-card-border) bg-[color-mix(in_oklch,var(--fx-bg-start)_6%,transparent)] px-3 py-2 text-sm transition duration-500 hover:bg-(--fx-card-bg-hover)"
        >
          home
        </button>
        <button
          type="button"
          onClick={() => onExecuteCommand("random")}
          className="w-full rounded-md border border-(--fx-card-border) bg-[color-mix(in_oklch,var(--fx-bg-start)_6%,transparent)] px-3 py-2 text-sm transition duration-500 hover:bg-(--fx-card-bg-hover)"
        >
          random
        </button>
      </div>
    </div>
  );
}
