"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Promo = () => {
  const [promo, setPromo] = useState("");

  const handleSubmit = () => {
    console.log(promo);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Try out and then buy!</CardTitle>
        <CardDescription>
          Enter the Promo to understand the feature better😁.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="promo">Enter Promo</Label>
          <Input
            id="promo"
            type="text"
            onChange={(e) => {
              setPromo(e.target.value);
            }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="dark:bg-muted bg-muted-foreground"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Promo;
