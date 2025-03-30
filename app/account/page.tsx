import { redirect } from "next/navigation";
import { getSession, getUserDetails, signOut } from "@/lib/auth";
import { getUserOrders } from "@/lib/orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountDetails } from "@/components/account-details";
import { OrderHistory } from "@/components/order-history";

export default async function AccountPage() {
  const session = await getSession();

  // If the user is not logged in, redirect them to the sign-in page
  if (!session) {
    redirect("/auth/sign-in");
  }

  const userDetails = await getUserDetails();
  const orders = await getUserOrders();

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <form action={signOut}>
          <Button variant="outline" type="submit">
            Sign Out
          </Button>
        </form>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="mb-8">
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Account Details
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Order History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <AccountDetails user={userDetails} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderHistory orders={orders} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
