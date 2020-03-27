import React, { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { LoadingSpinner } from 'components';
import { setTag, selectLoading as selectLoadingGiphy } from 'redux/giphy';
import { selectQuery, setQuery } from 'redux/search';
import { selectLoading as selectLoadingBackground } from 'redux/background';
import { SearchIcon } from 'assets/icons';
import styles from './Form.module.scss';

const Form = () => {
  const dispatch = useDispatch();
  const refSearch = useRef<HTMLInputElement>(null);
  const selectorQuery = useSelector(selectQuery);
  const selectorLoadingGiphy = useSelector(selectLoadingGiphy);
  const selectorLoadingBackground = useSelector(selectLoadingBackground);
  const [values, setValues] = useState({
    search: selectorQuery
  });

  const onInputChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setValues({
      ...values,
      [name]: value
    });
  }, [values]);

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    const { search } = values;

    event.preventDefault();
    refSearch?.current?.focus();

    dispatch(setQuery(search));
    dispatch(setTag(search));
  }, [dispatch, values]);

  return (
    <header
      className={classNames(styles.root, {
        [styles.loadingGiphy]: selectorLoadingGiphy,
        [styles.loadingBackground]: selectorLoadingBackground
      })}
    >
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          name="search"
          ref={refSearch}
          autoComplete="off"
          value={values.search}
          onChange={onInputChange}
          className={styles.search}
          placeholder="Search..."
        />
        <button
          type="submit"
          aria-label="Submit"
          className={styles.submit}
        >
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>
          <LoadingSpinner color="black" className={styles.loadingSpinner} />
        </button>
      </form>
    </header>
  );
};

export default Form;
