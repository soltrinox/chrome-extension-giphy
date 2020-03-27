import React, {
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LoadingSpinner } from 'components';
import { selectData, selectError, selectLoading as selectLoadingGiphy } from 'redux/giphy';
import { selectQuery } from 'redux/search';
import {
  setLoading as setLoadingBackground,
  selectLoading as selectLoadingBackground
} from 'redux/background';
import styles from './Background.module.scss';

const Background = () => {
  const dispatch = useDispatch();
  const selectorQuery = useSelector(selectQuery);
  const selectorData = useSelector(selectData);
  const selectorError = useSelector(selectError);
  const selectorLoadingGiphy = useSelector(selectLoadingGiphy);
  const selectorLoadingBackground = useSelector(selectLoadingBackground);
  const [hasError, setHasError] = useState(false);

  const { title, images } = selectorData;
  const imageWebP = useMemo(() => images?.original.webp, [images]);
  const nothingMatches = useMemo(() => Array.isArray(selectorData), [selectorData]);

  useEffect(() => {
    if (imageWebP) {
      dispatch(setLoadingBackground(true));
    }
  }, [imageWebP, dispatch]);

  useEffect(() => {
    if (selectorError || nothingMatches) {
      dispatch(setLoadingBackground(false));
    }
  }, [selectorError, dispatch, nothingMatches]);

  const renderHasError = useCallback(() => {
    return (
      <div>
        Something went wrong, please try again...
      </div>
    );
  }, []);

  const renderNothingMatches = useCallback(() => {
    return (
      <div>
        Nothing matches your search query -
        {' '}
        <span className={styles.nothingMatchesQuery}>
          {selectorQuery}
        </span>
      </div>
    );
  }, [selectorQuery]);

  const renderImage = useCallback(() => {
    if (imageWebP) {
      return (
        <picture className={styles.picture}>
          <img
            src={imageWebP}
            alt={title}
            className={styles.image}
            onLoad={() => {
              setHasError(false);
              dispatch(setLoadingBackground(false));
            }}
            onError={() => {
              setHasError(true);
              dispatch(setLoadingBackground(false));
            }}
          />
        </picture>
      );
    }

    return null;
  }, [dispatch, imageWebP, title]);

  const renderLoadingSpinner = useCallback(() => {
    if (selectorLoadingGiphy || selectorLoadingBackground) {
      return <LoadingSpinner color="white" className={styles.loadingSpinner} />;
    }

    return null;
  }, [selectorLoadingBackground, selectorLoadingGiphy]);

  const renderContent = useCallback(() => {
    if (selectorError || (hasError && !selectorLoadingGiphy)) {
      return renderHasError();
    }

    if (nothingMatches && !selectorLoadingGiphy) {
      return renderNothingMatches();
    }

    return (
      <>
        {renderLoadingSpinner()}
        {renderImage()}
      </>
    );
  }, [
    hasError,
    nothingMatches,
    renderHasError,
    renderImage,
    renderNothingMatches,
    selectorError,
    selectorLoadingGiphy,
    renderLoadingSpinner
  ]);

  return (
    <section className={styles.root}>
      {renderContent()}
    </section>
  );
};

export default Background;
