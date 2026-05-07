"use client";

import * as React from "react";

import type { Language, LanguageOptionItem } from "@shared/i18n";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";

export type LanguageSwitcherProps = {
  language: Language;
  onChange: (language: Language) => void;
  options: readonly LanguageOptionItem[];
};

export function LanguageSwitcher(props: LanguageSwitcherProps) {
  const { language: languageProp, onChange, options } = props;
  const selectId = React.useId();
  const contentId = `language-select-content-${selectId}`;

  return (
    <Select
      value={languageProp}
      onValueChange={(value) => onChange(value ?? languageProp)}
    >
      <SelectTrigger
        size="sm"
        className="min-w-32"
        aria-label="Change language"
        aria-controls={contentId}
      >
        <SelectValue>
          {(value) => {
            const selected =
              options.find((option) => option.code === value) ??
              options.find((option) => option.code === languageProp);

            return selected ? selected.label : value;
          }}
        </SelectValue>
      </SelectTrigger>

      <SelectContent id={contentId} className="max-h-72">
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.code}
              value={option.code}
              title={option.label}
            >
              <span className="flex flex-col gap-0.5">
                <span>{option.label}</span>
                <span className="text-xs text-muted-foreground">
                  {option.code.toUpperCase()}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
