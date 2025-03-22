
import React from 'react';
import BlogPosts from './blog/BlogPosts';

const LatestArticles = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <BlogPosts 
        limitPosts={3} 
        alternativeHeading="Useful Information" 
        showSearch={false}
        showAllPostsButton={true}
      />
    </section>
  );
};

export default LatestArticles;
