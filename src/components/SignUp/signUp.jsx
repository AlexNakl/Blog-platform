/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'antd';

import { signUpScheme } from '../../util/util';
import { registration } from '../../redux/actionCreators';
import { getRegErrors, getIsLoading, getError } from '../../redux/selectors';
import Spinner from '../Spinner';
import paths from '../../helpers/routesPaths';

import classes from './signUp.module.scss';

function SignUp() {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'onChange', resolver: yupResolver(signUpScheme) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const regErrors = useSelector(getRegErrors);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const onSubmit = (data) => {
    dispatch(registration(data, () => navigate('/', { replace: true })));
  };

  useEffect(() => {
    if (regErrors) {
      Object.keys(regErrors).forEach((key) => {
        if (key === 'username') {
          setError('userName', {
            type: 'manual',
            message: `This user name ${regErrors[key]}`,
          });
        } else {
          setError(key, {
            type: 'manual',
            message: `This ${key} ${regErrors[key]}`,
          });
        }
      });
    }
  }, [regErrors, setError]);

  return error.active ? (
    <Alert message="Error" description={error.message} type="error" showIcon />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h2 className={classes.title}>
        {isLoading && !error.active ? <Spinner size="middle" /> : <>Create new account</>}
      </h2>
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          User name
          <input
            type="text"
            name="userName"
            placeholder="User name"
            {...register('userName')}
            className={errors.userName ? classes.inputFieldError : classes.inputField}
          />
        </label>
        {errors.userName && <p className={classes.error}>{errors.userName.message}</p>}
      </div>
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          Email address
          <input
            type="email"
            name="email"
            placeholder="Email address"
            {...register('email')}
            className={errors.email ? classes.inputFieldError : classes.inputField}
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
            {...register('password')}
            className={errors.password ? classes.inputFieldError : classes.inputField}
          />
        </label>
        {errors.password && <p className={classes.error}>{errors.password.message}</p>}
      </div>
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          Repeat Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="Password"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? classes.inputFieldError : classes.inputField}
          />
        </label>
        {errors.confirmPassword && <p className={classes.error}>{errors.confirmPassword.message}</p>}
      </div>
      <div className={classes.inputWrapper}>
        <input
          type="checkbox"
          id="confirmation"
          name="confirmation"
          {...register('confirmation')}
          className={classes.customCheckbox}
        />
        <label className={classes.confirmation} htmlFor="confirmation">
          I agree to the processing of my personal information
        </label>
        {errors.confirmation && <p className={classes.error}>{errors.confirmation.message}</p>}
      </div>
      <button className={classes.btnCreate} type="submit" disabled={!isDirty || !isValid}>
        Create
      </button>
      <p className={classes.account}>
        Already have an account? <Link to={`/${paths.signIn}`}>Sign In.</Link>
      </p>
    </form>
  );
}

export default SignUp;
