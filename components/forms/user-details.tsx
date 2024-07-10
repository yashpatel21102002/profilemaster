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
import {
  deleteSocialLink,
  getUserDetails,
  setUserDetails,
} from "@/lib/queries";
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
import FileUpload from "../global/file-upload";
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
import { Globe, Loader2, Plus, Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Loader } from "lucide-react";

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

type SocialLink = {
  link: string;
  platformName: string;
  id: string;
};

const UserDetails = ({ clerkEmail }: Props) => {
  const [dloader, setDloader] = useState(false);
  const [userData, setUserData] = useState<User | null | undefined>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
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
    async function fetchUserData() {
      const response = await getUserDetails();
      setUserData(response);
      if (response?.SocialLinks.length) {
        setSocialLinks(
          response.SocialLinks.map((link) => ({
            link: link.link,
            platformName: link.platformName,
            id: link.id,
          }))
        );
      } else {
        setSocialLinks([{ link: "", platformName: "", id: uuidv4() }]);
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      form.reset({
        email: userData?.email || clerkEmail,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phoneNumber: userData.phoneNumber || "",
      });
    }
  }, [userData, form, clerkEmail]);

  const handleAddSocialLink = () => {
    setSocialLinks([
      ...socialLinks,
      { link: "", platformName: "", id: uuidv4() },
    ]);
  };

  const handleRemoveSocialLink = async (index: number) => {
    console.log(index);
    setDloader(true);
    const updatedLinks = [...socialLinks];
    await deleteSocialLink(updatedLinks[index].id);
    updatedLinks.splice(index, 1);
    setSocialLinks(
      updatedLinks.length
        ? updatedLinks
        : [{ link: "", platformName: "", id: uuidv4() }]
    );

    setDloader(false);
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log(data, socialLinks);
      await setUserDetails(data, socialLinks);
      toast({
        title: "Details Saved",
        description: "User details and social links updated successfully.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating user details:", error);
      toast({
        title: "Error",
        description: "Failed to update user details. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center mt-[30px]">
      <Card className="flex flex-col md:w-[70%] p-4">
        <CardHeader>
          <CardTitle>Basic User Information</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@gmail.com" {...field} disabled />
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
                    <Input placeholder="+91 514541546" type="tel" {...field} />
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
            />
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {socialLinks.map((social, index) => (
                  <div className="flex gap-2 items-center" key={social.id}>
                    <Select
                      onValueChange={(e) => {
                        const updatedLinks = [...socialLinks];
                        updatedLinks[index].platformName = e;
                        setSocialLinks(updatedLinks);
                      }}
                      defaultValue={socialLinks[index].platformName}
                    >
                      <SelectTrigger className="w-1/4">
                        <SelectValue placeholder="Select Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Social Links</SelectLabel>
                          {SocialLinks.map((link) => (
                            <SelectItem key={link.id} value={link.name}>
                              <div className="flex items-center gap-2 justify-center">
                                <link.icon className="h-4 w-4 text-primary" />
                                <span className="hidden md:flex">
                                  <span>{link.name}</span>
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Input
                      placeholder={`Paste link here!`}
                      className="w-3/4"
                      value={social.link}
                      onChange={(e) => {
                        const updatedLinks = [...socialLinks];
                        updatedLinks[index].link = e.target.value;
                        setSocialLinks(updatedLinks);
                      }}
                    />
                    <Button
                      variant={"outline"}
                      className=" bg-destructive text-white"
                      onClick={() => handleRemoveSocialLink(index)}
                      type="button"
                      size={"icon"}
                    >
                      {dloader ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        <Trash className="w-4 h-4" />
                      )}
                    </Button>
                    <Button variant={"outline"} className="hidden md:flex">
                      <Globe className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  size={"icon"}
                  type="button"
                  onClick={handleAddSocialLink}
                >
                  <Plus className="w-4 h-4" />
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
