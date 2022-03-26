import type { HTMLProps, InputHTMLAttributes } from 'react';
import type { SafeOmit } from 'types/utilities/SafeOmit';

export type InputWrapperProps = {
  name: string;
  error?: string;
  label?: string;
  wrapperClassName?: string;
} & SafeOmit<HTMLProps<HTMLInputElement>, 'ref'>;

export type TextInputProps = InputWrapperProps &
  InputHTMLAttributes<HTMLInputElement>;
