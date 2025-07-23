import { useEffect } from "react";
import { useStore } from "@/stores/AppStore";
import { BlogCardComponent } from "@/components/BlogCard";

export const FeedPage = () => {
  const { blogs, fetchBlogs, searchTerm } = useStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const filteredBlogs = blogs.filter(
    (b) =>
      searchTerm === "" ||
      b.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">
        {searchTerm ? `Results for "${searchTerm}"` : "Latest Posts"}
      </h1>

      <div className="grid gap-8 mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCardComponent key={blog.id} blog={blog} />
          ))
        ) : (
          <p className="col-span-full">No posts found.</p>
        )}
      </div>
    </div>
  );
};
