import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTag } from 'redux/giphy';
import { selectQuery } from 'redux/search';
import { Form, Background, PoweredBy } from 'components';

const App = () => {
  const dispatch = useDispatch();
  const selectorQuery = useSelector(selectQuery);

  useEffect(() => {
    dispatch(setTag(selectorQuery));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <Background />
      <PoweredBy />
      <Form />
    </>
  );
};

export default App;
