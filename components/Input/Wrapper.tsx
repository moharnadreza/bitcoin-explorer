import classNames from 'classnames';
import type { InputWrapperProps } from './types';
import styles from './Wrapper.module.css';

const InputWrapper = ({
  children,
  name,
  label,
  error,
  required,
  disabled = false,
  wrapperClassName = '',
}: InputWrapperProps): JSX.Element => {
  const classes = classNames(styles.base, wrapperClassName, {
    [styles.disabled]: disabled,
  });

  return (
    <div className={classes}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {required && <sup>&nbsp;*</sup>}
        </label>
      )}

      {children}

      {error && !disabled && (
        <span className={styles.errorMessage} data-testid={`${name}-error`}>
          {error}
        </span>
      )}
    </div>
  );
};

export default InputWrapper;
