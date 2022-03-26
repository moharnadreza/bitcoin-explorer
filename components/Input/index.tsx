import { forwardRef } from 'react';
import type { Ref } from 'react';
import Wrapper from './Wrapper';
import type { TextInputProps } from './types';
import styles from './TextInput.module.css';
import classNames from 'classnames';

const TextInput = (
  {
    label,
    name,
    disabled = false,
    className = '',
    wrapperClassName = '',
    error,
    required,
    ...rest
  }: TextInputProps,
  ref: Ref<HTMLInputElement>
): JSX.Element => {
  const classes = classNames(styles.base, className, {
    [styles.error]: error,
  });

  return (
    <Wrapper
      name={name}
      label={label}
      disabled={disabled}
      error={error}
      required={required}
      wrapperClassName={wrapperClassName}
    >
      <input
        id={name}
        name={name}
        ref={ref}
        disabled={disabled}
        className={classes}
        aria-describedby={`${name}-description`}
        {...rest}
      />
    </Wrapper>
  );
};

export default forwardRef(TextInput);
