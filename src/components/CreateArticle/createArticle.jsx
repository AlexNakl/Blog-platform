/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { createArticle, editArticle } from '../../redux/actionCreators';
import { parseStrings, parseObjects, createArticleScheme } from '../../util/util';

import classes from './createArticle.module.scss';

function CreateArticle() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const article = location.state;
  const tagList = article ? article.tagList : [];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: { tagList: parseObjects(tagList) },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = (data) => {
    const tagsList = parseStrings(data.tagList);
    const newData = { ...data, tagList: tagsList };
    if (slug) {
      dispatch(editArticle(newData, slug, () => navigate('/', { replace: true })));
    } else {
      dispatch(createArticle(newData, () => navigate('/', { replace: true })));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      {article ? (
        <h2 className={classes.title}>Edit article</h2>
      ) : (
        <h2 className={classes.title}>Create new article</h2>
      )}
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          Title
          <input
            type="text"
            name="title"
            defaultValue={article?.title}
            placeholder="Title"
            {...register('title', createArticleScheme('title', 300, 3))}
            className={errors.title ? classes.inputFieldError : classes.inputField}
          />
        </label>
        <p className={classes.error}>{errors?.title?.message}</p>
      </div>
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          Short description
          <input
            type="text"
            name="description"
            defaultValue={article?.description}
            placeholder="Short description"
            {...register('description', createArticleScheme('description', 1500, 3))}
            className={errors.description ? classes.inputFieldError : classes.inputField}
          />
        </label>
        <p className={classes.error}>{errors?.description?.message}</p>
      </div>
      <div className={classes.inputWrapper}>
        <label className={classes.inputName}>
          Text
          <textarea
            name="body"
            defaultValue={article?.body}
            placeholder="Text"
            {...register('body', createArticleScheme('Text', 5000, 3))}
            className={errors.body ? classes.articleBodyError : classes.articleBody}
          />
        </label>
        <p className={classes.error}>{errors?.body?.message}</p>
      </div>
      <span className={classes.inputName}>Tags</span>
      <div className={classes.tagListWrapper}>
        <ul className={classes.tagList}>
          {fields.map((item, index) => (
            <li key={item.id}>
              <input
                type="text"
                {...register(`tagList.${index}.tag`, createArticleScheme('tag', 40, 3))}
                placeholder="Tag"
                className={classes.tag}
              />

              <button type="button" onClick={() => remove(index)} className={classes.btnDelete}>
                Delete
              </button>
              <p className={classes.error}>{errors?.tagList?.[index]?.tag?.message}</p>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => append({ tag: '' })} className={classes.btnAddTag}>
          Add tag
        </button>
      </div>
      <button type="submit" className={classes.btnSend} disabled={!isDirty || !isValid}>
        Send
      </button>
    </form>
  );
}

export default CreateArticle;
