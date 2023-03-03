/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'antd';

import { signInScheme } from '../../util/util';
import { login } from '../../redux/actionCreators';
import { getRegErrors, getIsLoading, getError } from '../../redux/selectors';
import Spinner from '../Spinner';

import classes from './signIn.module.scss';

function SignIn() {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'onChange', resolver: yupResolver(signInScheme) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const regErrors = useSelector(getRegErrors);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const onSubmit = (data) => {
    dispatch(login(data, () => navigate('/', { replace: true })));
  };

  useEffect(() => {
    if (regErrors) {
      Object.keys(regErrors).forEach((key) => {
        setError(key, {
          type: 'manual',
          message: `This ${key} ${regErrors[key]}`,
        });
      });
    }
  }, [regErrors, setError]);

  return error.active ? (
    <Alert message="Error" description={error.message} type="error" showIcon />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <div className={classes.inputWrapper}>
        <h2 className={classes.title}>{isLoading && !error.active ? <Spinner size="middle" /> : <>Sign In</>}</h2>
        {errors['email or password'] && <p className={classes.error}>{errors['email or password'].message}</p>}
      </div>
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          Email address
          <input
            type="email"
            name="email"
            placeholder="Email address"
            {...register('email')}
            className={errors['email or password'] || errors.email ? classes.inputFieldError : classes.inputField}
          />
        </label>
        {errors.email && <p className={classes.error}>{errors.email.message}</p>}
      </div>
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={errors['email or password'] || errors.password ? classes.inputFieldError : classes.inputField}
            {...register('password')}
          />
        </label>
        {errors.password && <p className={classes.error}>{errors.password.message}</p>}
      </div>
      <button type="submit" className={classes.btnLogin} disabled={!isDirty || !isValid}>
        Login
      </button>
      <p className={classes.account}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </p>
    </form>
  );
}

export default SignIn;
