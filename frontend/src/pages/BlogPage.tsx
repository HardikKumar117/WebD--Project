import { useParams } from "react-router-dom";
import { useStore } from "@/stores/AppStore";

export const BlogPage = () => {
  const { id } = useParams();
  const { blogs } = useStore();

  const blog = blogs.find((b) => b.id === id);
  if (!blog) return <div className="text-center p-8">Blog not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <article>
        <header>
          <h1 className="text-3xl font-semibold mb-4">{blog.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag) => (
              <span key={tag} className="text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </header>
        <p className="text-base leading-relaxed">{blog.content}</p>
      </article>
    </div>
  );
};
