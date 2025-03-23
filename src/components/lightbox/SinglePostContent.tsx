
import React from 'react';
import SinglePost from '../blog/SinglePost';

interface SinglePostContentProps {
  postId: number;
}

const SinglePostContent = ({ postId }: SinglePostContentProps) => {
  return <SinglePost postId={postId} />;
};

export default SinglePostContent;
