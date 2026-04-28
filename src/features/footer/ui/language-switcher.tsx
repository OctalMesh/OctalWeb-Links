"use client";

import * as React from "react";

import type { LanguageOptionItem } from "@features/i18n/model/types";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";

type LanguageSwitcherProps = {
  language: string;
  onChange: (language: string) => void;
  options: LanguageOptionItem[];
};

export function LanguageSwitcher({ language, onChange, options }: LanguageSwitcherProps) {
  const selectId = React.useId();
  const contentId = `language-select-content-${selectId}`;

  return (
    <Select value={language} onValueChange={(value) => onChange(value ?? language)}>
      <SelectTrigger size="sm" className="min-w-32" aria-label="Change language" aria-controls={contentId}>
        <SelectValue>
          {(value) => {
            const selected =
              options.find((option) => option.code === value) ?? options.find((option) => option.code === language);

            return selected ? selected.label : value;
          }}
        </SelectValue>
      </SelectTrigger>

      <SelectContent id={contentId} className="max-h-72">
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.code} value={option.code} title={option.label}>
              <span className="flex flex-col gap-0.5">
                <span>{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.code.toUpperCase()}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
