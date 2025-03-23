
import React from 'react';
import BlogPosts from '../blog/BlogPosts';

const NewsContent = () => {
  return (
    <div className="p-4">
      <BlogPosts 
        showHeading={false}
        showSearch={true}
        showAllPostsButton={false}
        postsPerPage={12}
        simplifiedCards={false}
      />
    </div>
  );
};

export default NewsContent;
