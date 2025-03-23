import React from 'react';
import BlogPosts from './blog/BlogPosts';
const LatestArticles = () => {
  return <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent mb-2">
          Useful Information
        </h2>
        <p className="text-center text-gray-600 mb-8 font-semibold">
          Recent relocation news from around the world
        </p>
        <BlogPosts limitPosts={3} showHeading={false} showSearch={false} showAllPostsButton={true} simplifiedCards={true} />
      </div>
    </section>;
};
export default LatestArticles;