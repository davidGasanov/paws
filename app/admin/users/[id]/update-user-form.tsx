"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/lib/actions/user.actions";
import { USER_ROLES } from "@/lib/constants";
import { updateUserSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateUserFormProps {
  user: z.infer<typeof updateUserSchema>;
}

const UpdateUserForm = ({ user }: UpdateUserFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    try {
      const res = await updateUser({ ...values, id: user.id });

      if (!res.success) {
        return toast({
          variant: "destructive",
          description: res.message,
        });
      }
      toast({
        description: res.message,
      });
      form.reset();
      router.push("/admin/users");
    } catch (error) {
      toast({
        variant: "destructive",
        description: (error as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email */}
        <div>
          <FormField
            control={form.control}
            disabled
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                "email"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter user email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof updateUserSchema>,
              "name"
            >;
          }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter user name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Role */}
        <FormField
          control={form.control}
          name="role"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof updateUserSchema>,
              "role"
            >;
          }) => (
            <FormItem className="w-full">
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {USER_ROLES.map((role) => (
                    <SelectItem value={role} key={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex-between mt-4">
          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Update user"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
