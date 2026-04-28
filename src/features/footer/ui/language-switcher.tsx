"use client";

import type { LanguageOptionItem } from "@features/i18n";

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
  return (
    <Select value={language} onValueChange={(value) => onChange(value ?? language)}>
      <SelectTrigger size="sm" className="min-w-32">
        <SelectValue>
          {(value) => {
            const selected =
              options.find((option) => option.code === value) ?? options.find((option) => option.code === language);

            return selected ? selected.label : value;
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-72">
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
