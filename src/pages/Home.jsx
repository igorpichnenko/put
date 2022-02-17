import React from 'react';
import { useEffect } from 'react';
import { convertQueryParamsToObject } from '../utils/convertQueryParamsToObject';
import { useDispatch} from 'react-redux';
import { putData } from '../actions';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener(
      'popstate',
      dispatch(putData(convertQueryParamsToObject(window.location.search))),
    );
    
    console.log(
      'localStorage.getItem(response)',
      localStorage.getItem('response'),
    );
    console.log(
      'localStorage.getItem(request)',
      localStorage.getItem('request'),
    );
    return () => {
      window.removeEventListener('popstate', convertQueryParamsToObject);
    };
  });

  return <div>Hello World!</div>;
};
export default Home;
