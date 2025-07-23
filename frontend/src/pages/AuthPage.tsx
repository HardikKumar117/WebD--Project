import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStore } from "@/stores/AppStore";
import { authSchema } from "@/utils/schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export const AuthPage = () => {
  const [formType, setFormType] = useState<"sign-in" | "register">("sign-in");
  const { login, register } = useStore();
  const navigate = useNavigate();
  const currentFormSchema = authSchema(formType);

  const form = useForm<z.infer<typeof currentFormSchema>>({
    resolver: zodResolver(currentFormSchema),
    defaultValues: { email: "", password: "", username: "" },
  });

  const onSubmit = async (values: z.infer<typeof currentFormSchema>) => {
    try {
      if (formType === "sign-in") {
        await login(values);
        navigate("/");
      } else {
        await register(values);
        setFormType("sign-in");
        form.reset();
      }
    } catch (error) {
      console.error({"message": error})
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            {formType === "sign-in" ? "Sign In" : "Create an Account"}
          </CardTitle>
          <CardDescription>
            {formType === "sign-in"
              ? "Welcome back!"
              : "Enter your details to start."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {formType === "register" && (
                <Controller
                  control={form.control}
                  name="username"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Your username" {...field} />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              )}
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit">
                {formType === "sign-in" ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-sm">
          <p>
            {formType === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              type="button"
              onClick={() =>
                setFormType(formType === "sign-in" ? "register" : "sign-in")
              }
              className="ml-1 font-semibold hover:underline"
            >
              {formType === "sign-in" ? "Register" : "Sign In"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
