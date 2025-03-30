"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setDebugInfo(null);

    try {
      const supabase = createClientComponentClient();

      // Create user metadata with all fields
      const userMetadata = {
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
        address: address || null,
        city: city || null,
        postal_code: postalCode || null,
        country: country || null,
      };

      setDebugInfo(`Signing up with metadata: ${JSON.stringify(userMetadata)}`);

      // Sign up the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata,
        },
      });

      if (error) {
        console.error("Sign up error:", error);
        setErrorMessage(error.message);
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!data.user) {
        setErrorMessage("Failed to create user. Please try again.");
        toast({
          title: "Sign Up Failed",
          description: "Failed to create user. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      setDebugInfo((prev) => `${prev}\nUser created with ID: ${data.user?.id}`);

      // Wait a moment for the trigger to execute
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if the user was created in the users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (userError) {
        setDebugInfo(
          (prev) =>
            `${prev}\nUser not found in users table: ${JSON.stringify(
              userError
            )}`
        );

        // User doesn't exist in the users table, create it manually
        const newUser = {
          id: data.user.id,
          email: email,
          first_name: firstName,
          last_name: lastName,
          phone: phone || null,
          address: address || null,
          city: city || null,
          postal_code: postalCode || null,
          country: country || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        setDebugInfo(
          (prev) =>
            `${prev}\nInserting user manually: ${JSON.stringify(newUser)}`
        );

        const { error: insertError } = await supabase
          .from("users")
          .insert([newUser]);

        if (insertError) {
          setDebugInfo(
            (prev) =>
              `${prev}\nError inserting user: ${JSON.stringify(insertError)}`
          );
        } else {
          setDebugInfo((prev) => `${prev}\nUser inserted successfully`);
        }
      } else {
        setDebugInfo(
          (prev) =>
            `${prev}\nUser found in users table: ${JSON.stringify(userData)}`
        );

        // Check if all fields were properly saved
        if (
          !userData.phone &&
          !userData.address &&
          !userData.city &&
          !userData.postal_code &&
          !userData.country &&
          (phone || address || city || postalCode || country)
        ) {
          // Fields are missing, update the user
          setDebugInfo(
            (prev) => `${prev}\nFields missing, updating user record`
          );

          const { error: updateError } = await supabase
            .from("users")
            .update({
              phone: phone || null,
              address: address || null,
              city: city || null,
              postal_code: postalCode || null,
              country: country || null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", data.user.id);

          if (updateError) {
            setDebugInfo(
              (prev) =>
                `${prev}\nError updating user: ${JSON.stringify(updateError)}`
            );
          } else {
            setDebugInfo((prev) => `${prev}\nUser updated successfully`);
          }
        }
      }

      // Now check if the user metadata was properly saved in auth.users
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setDebugInfo(
        (prev) =>
          `${prev}\nAuth user metadata: ${JSON.stringify(user?.user_metadata)}`
      );

      setSuccessMessage("Account created successfully! You can now sign in.");
      toast({
        title: "Success",
        description: "Account created successfully. Please sign in.",
      });

      // Redirect after a short delay to allow the user to see the success message
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 5000); // Longer delay to see debug info
    } catch (error) {
      console.error("Sign up error:", error);
      setErrorMessage(`An unexpected error occurred: ${JSON.stringify(error)}`);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)] py-12">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {debugInfo && (
            <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-800">
              <AlertDescription className="whitespace-pre-wrap font-mono text-xs">
                {debugInfo}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters long
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address (Optional)</Label>
              <Input
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City (Optional)</Label>
                <Input
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code (Optional)</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country (Optional)</Label>
              <Input
                id="country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
