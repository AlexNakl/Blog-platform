/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'antd';

import { editProfileScheme } from '../../util/util';
import { editProfile } from '../../redux/actionCreators';
import { getRegErrors, getUser, getIsLoading, getError } from '../../redux/selectors';
import Spinner from '../Spinner';

import classes from './editProfile.module.scss';

function EditProfile() {
  const {
    setError,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'onChange', resolver: yupResolver(editProfileScheme) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const regErrors = useSelector(getRegErrors);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const onSubmit = (data) => {
    const curentData = getValues();
    if (
      curentData.userName === user.username &&
      curentData.email === user.email &&
      curentData.image === user.image &&
      curentData.password === ''
    ) {
      setError('isNotDifferent', {
        type: 'manual',
        message:
          'Your profile has not been changed because you entered your current details. Enter new data to change the profile.',
      });
    } else {
      dispatch(editProfile(data, () => navigate('/', { replace: true })));
    }
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
      <h2 className={classes.title}>{isLoading && !error.active ? <Spinner size="middle" /> : <>Edit Profile</>}</h2>
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          User name
          <input
            type="text"
            name="userName"
            defaultValue={user.username}
            placeholder="User name"
            {...register('userName')}
            className={errors.userName ? classes.inputFieldError : classes.inputField}
          />
        </label>
        <p className={classes.error}>{errors?.userName?.message}</p>
      </div>
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          Email address
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            {...register('email')}
            placeholder="Email address"
            className={errors.email ? classes.inputFieldError : classes.inputField}
          />
        </label>
        <p className={classes.error}>{errors?.email?.message}</p>
      </div>
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          New password
          <input
            type="password"
            name="password"
            {...register('password')}
            placeholder="New password"
            className={errors.password ? classes.inputFieldError : classes.inputField}
          />
        </label>
        <p className={classes.error}>{errors?.password?.message}</p>
      </div>
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          Avatar image (URL)
          <input
            type="text"
            name="image"
            defaultValue={user.image}
            {...register('image')}
            placeholder="Avatar image"
            className={errors.image ? classes.inputFieldError : classes.inputField}
          />
        </label>
        <p className={classes.error}>{errors?.image?.message}</p>
      </div>
      <button className={classes.btnSave} type="submit" disabled={!isDirty || !isValid}>
        Save
      </button>
      <p className={classes.error}>{errors?.isNotDifferent?.message}</p>
    </form>
  );
}

export default EditProfile;
