"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { SideBarOptions } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { getUserDetails } from "@/lib/queries";
import { User } from "@prisma/client";

type Props = {
  defaultOpen: boolean;
  imageUrl: string;
};

const MenuItems = ({ defaultOpen, imageUrl }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState<User | null | undefined>(null);

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const response = await getUserDetails();
      setUserData(response);
    };

    getUserData();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:!hidden flex"
      >
        <Button variant={"outline"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={clsx(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6 h-[100dvh]",
          {
            "hidden md:inline-block z-[30] w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <SheetHeader>
          <div className="flex justify-center flex-col items-center gap-2 pb-4">
            <Image
              alt="logo"
              src={userData?.profileImage || imageUrl}
              width={150}
              height={150}
              className="rounded-full dark:ring-1"
            />
          </div>

          <Separator />
        </SheetHeader>

        <ul className="flex flex-col gap-2 h-[50%] justify-center">
          {SideBarOptions.map((option) => (
            <li
              key={option.id}
              className="flex py-2 items-center gap-2 hover:bg-muted rounded-md transition-all hover:cursor-pointer justify-left px-3 hover:ring-1"
            >
              <option.icon />
              <span>{option.label}</span>
            </li>
          ))}
        </ul>

        <div>
          <Button
            className="absolute bottom-8"
            onClick={() => router.push("/upgrade")}
          >
            Upgrade to Premium✨
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuItems;
