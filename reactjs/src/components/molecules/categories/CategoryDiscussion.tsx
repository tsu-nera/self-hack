import * as React from 'react';
import { Typography } from '@material-ui/core';
import PostButton from '../../atoms/PostButton';

const CategoryDiscussion = (props: any) => {
  const { category } = props;

  return (
    <React.Fragment>
      <Typography variant="h5" component="h5">
        知見まとめ
      </Typography>
      <PostButton to={`/categories/${category.id}/discussions/new`} />
    </React.Fragment>
  );
};

export default CategoryDiscussion;
