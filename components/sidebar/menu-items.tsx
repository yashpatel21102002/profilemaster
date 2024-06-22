"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { SideBarOptions } from "@/lib/constants";

type Props = {
  defaultOpen: boolean;
};

const MenuItems = ({ defaultOpen }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
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
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <SheetHeader>
          <div className="flex justify-center flex-col items-center gap-2">
            <Image
              alt="logo"
              src={"/logo3.jpeg"}
              width={150}
              height={150}
              className="rounded-full dark:ring-1"
            />
          </div>
          <SheetDescription className="text-center">
            One Platform To Represent yourself Online!. Choose Multiple Options
            as per your requirements.
          </SheetDescription>
          <Separator />
        </SheetHeader>
        <ul className="flex flex-col gap-2 mt-4">
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
      </SheetContent>
    </Sheet>
  );
};

export default MenuItems;
