import { cloneElement } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';
import { buttonIconSize } from './constants';
import LoadingIcon from './LoadingIcon';
import type { ButtonProps } from './types';

const IconComponent = ({
  icon,
  size = 'medium',
}: Pick<ButtonProps, 'icon' | 'size'>): JSX.Element =>
  cloneElement(icon, buttonIconSize[size]);

const Button = ({
  children,
  icon,
  colorScheme = 'indigo',
  size = 'medium',
  isLoading = false,
  disabled = false,
  className = '',
  ...rest
}: ButtonProps): JSX.Element => {
  const classes = classNames(
    styles.base,
    styles[size],
    styles[colorScheme],
    className
  );

  return (
    <button className={classes} disabled={disabled || isLoading} {...rest}>
      {isLoading && <LoadingIcon {...buttonIconSize[size]} />}

      {!isLoading && <IconComponent icon={icon} size={size} />}

      <span>{children}</span>
    </button>
  );
};

export default Button;
