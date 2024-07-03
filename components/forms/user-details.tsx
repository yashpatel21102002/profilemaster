"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { getUserDetails, setUserDetails } from "@/lib/queries";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";

const formSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email should be at least 3 characters" })
    .email({ message: "Please enter a valid email address" }),
  firstName: z
    .string()
    .min(2, { message: "First name should be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name should be at least 2 characters" }),
  phoneNumber: z.any(),
});

const UserDetails = () => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    async function getUserData() {
      const response = await getUserDetails();
      //@ts-ignore
      setUserData(response);
    }

    getUserData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userData?.email ?? "",
      firstName: userData?.firstName ?? "",
      lastName: userData?.lastName ?? "",
      phoneNumber: userData?.phoneNumber ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await setUserDetails(values);
  }

  useEffect(() => {
    if (userData) {
      form.reset({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
      });
      console.log("in the second useeffect");
    }
  }, [userData, form]);

  return (
    <div className="flex justify-center items-center mt-[30px]">
      <Card className="flex flex-col md:w-[70%] p-4">
        <CardHeader>
          <CardTitle>Basic User Information</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>This is your username.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 514541546" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default UserDetails;
