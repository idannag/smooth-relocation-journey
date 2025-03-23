
import React from 'react';
import SinglePost from '../blog/SinglePost';

interface SinglePostContentProps {
  postId: number;
  onClose?: () => void;
}

const SinglePostContent = ({ postId, onClose }: SinglePostContentProps) => {
  return <SinglePost postId={postId} onClose={onClose} />;
};

export default SinglePostContent;
