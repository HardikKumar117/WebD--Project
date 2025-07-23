import { useNavigate } from "react-router-dom";
import { useStore } from "@/stores/AppStore";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { blogSchema } from "@/utils/schemas";
import type { BlogSchema } from "@/utils/schemas";

export const CreatePage = () => {
  const { createBlog } = useStore();
  const navigate = useNavigate();

  const form = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: { title: "", content: "", tags: "" },
  });

  const onSubmit = async (values: BlogSchema) => {
    await createBlog(values);
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-semibold">Create a New Post</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-8"
        >
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Your amazing blog title" {...field} />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your thoughts here..."
                    rows={15}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="tags"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="react, typescript, webdev"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm mt-1">Please provide comma-separated tags.</p>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <Button type="submit">Publish Post</Button>
        </form>
      </Form>
    </div>
  );
};
