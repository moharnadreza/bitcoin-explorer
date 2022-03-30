import classNames from 'classnames';
import type { FiatMethod } from 'features/explorer/types';
import styles from './FiatMethodSwitch.module.css';

type Props = {
  fiatMethods: FiatMethod[];
  selectedFiatMethod: FiatMethod;
  onSwitch: (method: FiatMethod) => void;
};

const FiatMethodSwitch = ({
  fiatMethods,
  selectedFiatMethod,
  onSwitch,
}: Props): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      {fiatMethods.map((method) => (
        <div
          key={method}
          onClick={() => onSwitch(method)}
          className={classNames(styles.pill, {
            [styles.active]: selectedFiatMethod === method,
          })}
        >
          {method}
        </div>
      ))}
    </div>
  );
};

export default FiatMethodSwitch;
