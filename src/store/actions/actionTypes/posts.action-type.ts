type PostsActionType =
  | 'on-post-fetch-start'
  | 'on-post-fetch-success'
  | 'on-post-fetch-error'
  | 'on-post-submit-start'
  | 'on-post-submit-success'
  | 'update-post-values'
  | 'update-post-errors'
  | 'reset-post-values'
  | 'on-user-post-start'
  | 'on-user-post-success'
  | 'on-user-post-error';

export default PostsActionType;
