import React from 'react';
import classNames from 'classnames';

import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  readonly className: string;
  readonly color: string;
}

const LoadingSpinner = ({ className, color }: LoadingSpinnerProps) => {
  return (
    <div
      className={classNames(styles.root, className, {
        [styles[color]]: color
      })}
    >
      <div className={styles.spinner} />
    </div>
  );
};

export default LoadingSpinner;
