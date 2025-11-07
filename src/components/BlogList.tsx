import React from 'react';
import BlogCard from './BlogCard';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags?: string[];
  createdAt: string;
}

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          excerpt={blog.excerpt}
          coverImage={blog.coverImage}
          author={blog.author}
          tags={blog.tags}
          createdAt={blog.createdAt}
        />
      ))}
    </div>
  );
}
