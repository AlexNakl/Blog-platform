import React from 'react';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { changeUsePage, changePageSize } from '../../redux/actionCreators';
import { getArticlesCount, getUsePage, getPageSize } from '../../redux/selectors';

import classes from './pagination.module.scss';

function Paginator() {
  const dispatch = useDispatch();
  const articlesCount = useSelector(getArticlesCount);
  const usePage = useSelector(getUsePage);
  const pageSize = useSelector(getPageSize);

  return (
    <div className={classes['pagination-wrapper']}>
      <Pagination
        showQuickJumper
        showSizeChanger
        pageSizeOptions={[1, 2, 3, 4, 5, 10, 20, 50, 100]}
        defaultPageSize={5}
        pageSize={pageSize}
        defaultCurrent={1}
        current={usePage}
        total={articlesCount}
        onChange={(pageNumber) => dispatch(changeUsePage(pageNumber))}
        onShowSizeChange={(current, pageSizze) => dispatch(changePageSize(current, pageSizze))}
      />
    </div>
  );
}

export default Paginator;
