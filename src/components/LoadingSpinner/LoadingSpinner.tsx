import React from 'react';
import classNames from 'classnames';

import styles from './LoadingSpinner.module.scss';

interface Props {
  readonly className?: string;
  readonly color: string;
}

const LoadingSpinner = ({ className, color }: Props) => {
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
