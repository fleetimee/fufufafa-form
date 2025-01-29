"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { startTransition, useActionState, useEffect, useRef } from "react";

import { LoaderCircle } from "lucide-react";
import { onAddMemberSubmitAction } from "../action/add-member-action";
import { AddMemberFormSchema } from "../schema/add-member-schema";
import { toast } from "@/hooks/use-toast";

const initialState = {
  success: false,
  message: "",
};

export function AddMemberForm() {
  const [state, formAction, isPending] = useActionState(
    onAddMemberSubmitAction,
    initialState
  );

  const form = useForm<z.infer<typeof AddMemberFormSchema>>({
    // resolver: zodResolver(AddMemberFormSchema),
    defaultValues: {
      nama: "",
      email: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  function onSubmitHandler() {
    startTransition(() => {
      formAction(new FormData(formRef.current!));
    });
  }

  useEffect(() => {
    if (state?.success) {
      // Reset form after successful submission
      form.reset();

      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(state, null, 2)}</code>
          </pre>
        ),
      });
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Novian Andika" {...field} />
              </FormControl>
              <FormDescription>Ini adalah nama lengkap Anda.</FormDescription>
              {state?.errors?.find((error) => error.field === "nama") && (
                <p className="text-sm font-medium text-destructive">
                  {
                    state.errors.find((error) => error.field === "nama")
                      ?.message
                  }
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email Anda" {...field} />
              </FormControl>
              <FormDescription>
                Email Anda akan digunakan untuk login.
              </FormDescription>
              {state?.errors?.find((error) => error.field === "email") && (
                <p className="text-sm font-medium text-destructive">
                  {
                    state.errors.find((error) => error.field === "email")
                      ?.message
                  }
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit">
          {isPending ? <LoaderCircle className="animate-spin" /> : "Submit"}
        </Button>

        {/* Show success/error message */}
        {state?.message && (
          <p
            className={`text-sm font-medium ${
              state.success ? "text-green-500" : "text-destructive"
            }`}
            aria-live="polite"
          >
            {state.message}
          </p>
        )}
      </form>
    </Form>
  );
}
