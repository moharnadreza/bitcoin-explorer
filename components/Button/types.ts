import type { ReactNode } from 'react';

type ColorScheme = 'indigo' | 'gray';

export type ButtonSize = 'small' | 'medium';

export type ButtonIconSize = { width: number; height: number };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon: JSX.Element;
  colorScheme?: ColorScheme;
  size?: ButtonSize;
  isLoading?: boolean;
};
