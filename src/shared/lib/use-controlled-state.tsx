import * as React from "react";

interface CommonControlledStateProps<T> {
  value?: T;
  defaultValue?: T;
}

export function useControlledState<T>(
  props: CommonControlledStateProps<T> & {
    onChange?: (value: T) => void;
  },
): readonly [T, (next: T) => void] {
  const { value, defaultValue, onChange } = props;
  const [internalState, setInternalState] = React.useState<T>(
    defaultValue !== undefined ? defaultValue : (value as T),
  );
  const isControlled = value !== undefined;
  const state = isControlled ? value : internalState;

  const setState = React.useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternalState(next);
      }

      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [state, setState] as const;
}
