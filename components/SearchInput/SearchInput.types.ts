import { HTMLProps } from 'react';

export interface ISearchInputProps extends HTMLProps<HTMLInputElement> {
  className?: string;
  onDebounce?: (value: string) => void;
}
