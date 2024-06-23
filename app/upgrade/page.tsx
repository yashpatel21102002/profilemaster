import Infobar from "@/components/global/infobar";
import Promo from "@/components/global/promo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllPlans } from "@/lib/queries";
import { Plan } from "@prisma/client";
import clsx from "clsx";

export default async function page() {
  const plans = await getAllPlans();

  return (
    <div className="">
      <Infobar />
      <div className="h-screen flex justify-center mt-[100px] md:items-center md:mt-0">
        <Tabs defaultValue="account" className="w-[96%] md:w-[70%]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="promo">Promo</TabsTrigger>
          </TabsList>
          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans🚀</CardTitle>
                <CardDescription>
                  Subscribe to Plans to represent yourself better to the
                  world🌍.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* get the plan data  */}
                {plans
                  ?.filter((plan: Plan) => plan.promoCode === null)
                  .map((plan: Plan) => (
                    <Card
                      key={plan.planDuration}
                      className={clsx({
                        "border-2 border-primary": plan.premiumPlan,
                      })}
                    >
                      <CardHeader>
                        <CardTitle>{plan.planName}</CardTitle>
                        <CardDescription>
                          {plan.planDescription}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <h1 className="text-xl font-black">
                          ${plan.planPrice}{" "}
                          <span className="text-sm">only</span>
                        </h1>
                        <span className="text-muted-foreground">
                          valid for {plan.planDuration} months
                        </span>
                      </CardContent>
                      <CardFooter>
                        <Button>{plan.planButton}</Button>
                      </CardFooter>
                    </Card>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="promo">
            <Promo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
