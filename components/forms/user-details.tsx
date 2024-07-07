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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useToast } from "../ui/use-toast";
import { UploadDropzone } from "@/components/global/uploadcomponents";
import FileUpload from "../global/file-upload";
import { currentUser } from "@clerk/nextjs/server";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  DeleteIcon,
  Eye,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SocialLinks } from "@/lib/constants";
import { twMerge } from "tailwind-merge";

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
  profileImage: z.any(),
});

type Props = {
  clerkEmail: string;
};

type SocialProps = {
  link: String;
  platformName: String;
};

const UserDetails = ({ clerkEmail }: Props) => {
  const [userData, setUserData] = useState<User | null | undefined>(null);
  const [socials, setSocials] = useState<SocialProps[]>([
    { link: "", platformName: "" },
  ]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userData?.email || clerkEmail,
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    async function getUserData() {
      const response = await getUserDetails();
      setUserData(response);
      console.log(response);
      if (response?.SocialLinks?.length) {
        setSocials(
          response?.SocialLinks?.map((social) => ({
            link: social.link,
            platformName: social.platformName,
          }))
        );
      } else {
        setSocials([{ link: "", platformName: "" }]);
      }
    }

    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      form.reset({
        email: userData?.email || clerkEmail,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
      });
    }

    console.log("in second useeffect");
  }, [userData, form, clerkEmail]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await setUserDetails(values);

    toast({
      title: "✅Details has been saved successfully!",
      description: "You can change your details any time you like!",
      variant: "default",
      duration: 2000,
    });
  }

  const addSocialLink = () => {
    setSocials([...socials, { link: "", platformName: "" }]);
  };

  const removeSocialLink = (index: number) => {
    const newSocials = socials.filter((_, i) => i !== index);
    setSocials(
      newSocials.length ? newSocials : [{ link: "", platformName: "" }]
    );
  };

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
                    <Input
                      placeholder="abc@gmail.com"
                      {...field}
                      disabled={true}
                    />
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
                    <Input
                      placeholder="+91 514541546"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndPoint="profileImage"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            {/* social Links  */}
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {socials.map((social: SocialProps, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <Select>
                      <SelectTrigger className="w-1/4">
                        <SelectValue placeholder="📌Select Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Social Links</SelectLabel>
                          {SocialLinks.map((link) => (
                            <SelectItem key={link.id} value={link.name}>
                              <div className="flex items-center gap-2 justify-center">
                                <link.icon className="h-4 w-4 text-primary" />
                                <span className="hidden md:flex">
                                  {link.name}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Input
                      placeholder="https:www.instagram.com/instagram/yash_patel2110"
                      className="w-3/4"
                    />
                    <Button
                      variant={"outline"}
                      className=" bg-destructive text-white"
                      onClick={() => removeSocialLink(index)}
                      type="button"
                      size={"icon"}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                    <Button variant={"outline"} className="hidden md:flex">
                      <Globe className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button size={"icon"} type="button">
                  <Plus className="w-4 h-4" onClick={addSocialLink} />
                </Button>
              </CardFooter>
            </Card>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default UserDetails;
