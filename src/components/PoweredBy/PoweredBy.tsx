import React from 'react';

import poweredByGiphy from 'assets/images/powered-by-giphy.png';
import styles from './PoweredBy.module.scss';

const PoweredBy = () => {
  return (
    <div className={styles.root}>
      <img className={styles.image} alt="Powered by GIPHY" src={poweredByGiphy} />
    </div>
  );
};

export default PoweredBy;
