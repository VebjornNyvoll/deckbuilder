import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// This hook is used to handle form input changes and submit
// This code is imported from the link below
// https://www.youtube.com/watch?v=0Z68AHS011Y t=34mins for more info
export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event: InputEvent) => {
    
    setValues({ ...values, [(event.target as HTMLFormElement).name]: (event.target as HTMLFormElement).value });
  };

  return {
    onChange,
    values,
  };
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
