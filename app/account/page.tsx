"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define types for our user and order data
interface UserData {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  postal_code?: string | null;
  country?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface OrderData {
  id: string;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = createClientComponentClient();

        // Check if user is logged in
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          // Redirect to sign-in if no session
          router.push("/auth/sign-in");
          return;
        }

        console.log("Session user:", session.user);

        // Get user details from the custom users table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
          setDebugInfo(`User fetch error: ${JSON.stringify(userError)}`);

          // User doesn't exist in the users table, create one
          console.log("User not found in users table, creating entry...");

          const newUser = {
            id: session.user.id,
            email: session.user.email || "",
            first_name: session.user.user_metadata?.first_name || "",
            last_name: session.user.user_metadata?.last_name || "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          // Insert the user into the users table
          const { error: insertError } = await supabase
            .from("users")
            .insert([newUser]);

          if (insertError) {
            console.error("Error creating user record:", insertError);
            setDebugInfo(
              `${debugInfo}\nInsert error: ${JSON.stringify(insertError)}`
            );
          } else {
            console.log("User record created successfully");
            setUser(newUser as UserData);
          }
        } else {
          console.log("User data from users table:", userData);
          setUser(userData as UserData);
        }

        // Get orders
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (ordersError) {
          console.error("Error fetching orders:", ordersError);
        } else {
          setOrders((ordersData as OrderData[]) || []);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/auth/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSignOut = async () => {
    try {
      const supabase = createClientComponentClient();
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      {debugInfo && (
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <AlertDescription className="whitespace-pre-wrap font-mono text-xs">
            {debugInfo}
          </AlertDescription>
        </Alert>
      )}

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
              <AccountDetails user={user} />
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
