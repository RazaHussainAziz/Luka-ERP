import React, { type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { User, Mail, Eye, EyeOff, Lock } from "lucide-react";

import { signupSchema, loginSchema } from "@/validations/authSchema";
import type { User as Usertype } from "@/Types/userType";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import { ZodError } from "zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserAvatarOutline } from "@/icons/icons";
import { useNavigate } from "react-router";

function AuthPage() {
  const [signUpData, setSignUpData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [signInData, setSignInData] = React.useState({
    email: "",
    password: "",
  });
  const { writeUser } = useUserStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const handleSignUp = async (e: FormEvent) => {
    try {
      e.preventDefault();
      //check for zod validation
      signupSchema.parse(signUpData);
      console.log(signUpData);
      //making post fetch request
      console.log(import.meta.env.VITE_BACKEND_SIGNUP_URL);
      const request = await fetch(import.meta.env.VITE_BACKEND_SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      console.log(request);
      const response = await request.json();
      console.log(response);
      if (!response.success) return toast.error("signup failed");
      //storing data
      writeUser({
        id: response.id,
        username: response.username,
        email: response.email,
        isPro: response.pro,
        authFlag: true,
      } as Usertype);
      //redirection code needed
      toast.success(`Welcome ${response.username}`);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof ZodError)
        return toast.error(error.errors[0].message);
      console.log(error);
      return toast.error("signup failed");
    }
  };

  const handleSignIn = async (e: FormEvent) => {
    try {
      e.preventDefault();
      //check for zod validation
      loginSchema.parse(signInData);
      //making post fetch request
      const request = await fetch(import.meta.env.VITE_BACKEND_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });
      const response = await request.json();
      if (!response.success) return toast.error("login failed");
      //storing data
      writeUser({
        id: response.id,
        username: response.username,
        email: response.email,
        isPro: response.pro,
        authFlag: true,
      } as Usertype);
      //redirection code needed
      return toast.success(`Welcome ${response.username}`);
    } catch (error) {
      if (error instanceof ZodError)
        return toast.error(error.errors[0].message);
      return toast.error("login failed");
    }
  };
  return (
    <>
      <div className="h-screen  bg-black flex items-center flex-col select-none">
        <div className="p-3 mt-10 mb-5 rounded-lg bg-white">
          <UserAvatarOutline width={25} height={25} className="text-black" />
        </div>
        <div className="text-center space-y-2 mb-5">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p>Sign in to your account or create a new one</p>
        </div>

        <div>
          <Tabs defaultValue="signup" className="w-[400px]">
            <TabsList className="w-[400px] bg-[#27272a]">
              <TabsTrigger value="signup" className="cursor-pointer">
                Sign Up
              </TabsTrigger>
              <TabsTrigger value="signin" className="cursor-pointer">
                Sign In
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <form
                onSubmit={handleSignUp}
                className="outline-1 outline-zinc-300/30 px-4 py-5 flex flex-col gap-5 rounded-md
                           shadow-sm shadow-white/10"
              >
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl font-bold">Signup for Luka</h1>
                  <span className="text-zinc-300">
                    Enter your information to get started
                  </span>
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="username" className="text-md text-zinc-300">
                    Username
                  </Label>
                  <div className=" bg-white/20 rounded-sm flex items-center ">
                    <User className=" h-9 w-9 px-2" />
                    <Input
                      id="username"
                      type="text"
                      autoComplete="off"
                      maxLength={30}
                      minLength={5}
                      value={signUpData.username}
                      onChange={(e) =>
                        setSignUpData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      required={true}
                      className="bg-transparent border-0 placeholder:text-zinc-500 focus-visible:ring-0 p-0 pr-2"
                      placeholder="@username"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="email" className="text-md text-zinc-300">
                    Email
                  </Label>
                  <div className=" bg-white/20 rounded-sm flex items-center ">
                    <Mail className=" h-9 w-9 px-2" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="off"
                      value={signUpData.email}
                      maxLength={50}
                      onChange={(e) =>
                        setSignUpData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required={true}
                      className="bg-transparent border-0 placeholder:text-zinc-500 focus-visible:ring-0 p-0 pr-2"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="password" className="text-md text-zinc-300">
                    Password
                  </Label>
                  <div className=" bg-white/20 rounded-sm flex items-center ">
                    <Lock className=" h-9 w-9 px-2" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required={true}
                      value={signUpData.password}
                      minLength={8}
                      maxLength={30}
                      autoComplete="off"
                      onChange={(e) =>
                        setSignUpData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="bg-transparent border-0 focus-visible:ring-0 p-0"
                    />
                    {showPassword ? (
                      <EyeOff
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer h-9 w-9 px-2 "
                      />
                    ) : (
                      <Eye
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer h-9 w-9 px-2"
                      />
                    )}
                  </div>
                </div>

                <Button className="cursor-pointer text-md">Signup</Button>
              </form>
            </TabsContent>
            <TabsContent value="signin">
              <form
                onSubmit={handleSignIn}
                className="outline-1 outline-zinc-300/30 px-4 py-5 flex flex-col gap-5  rounded-md
        shadow-sm shadow-white/10"
              >
                <h1 className="text-4xl font-bold">Login to Luka</h1>

                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="email" className="text-md text-zinc-300">
                    Email
                  </Label>
                  <div className=" bg-white/20 rounded-sm flex items-center ">
                    <Mail className=" h-9 w-9 px-2" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="off"
                      value={signInData.email}
                      maxLength={50}
                      onChange={(e) =>
                        setSignInData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required={true}
                      className="bg-transparent border-0 placeholder:text-zinc-500 focus-visible:ring-0 p-0 pr-2"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="password" className="text-md text-zinc-300">
                    Password
                  </Label>
                  <div className=" bg-white/20 rounded-sm flex items-center ">
                    <Lock className=" h-9 w-9 px-2" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required={true}
                      value={signInData.password}
                      minLength={8}
                      maxLength={30}
                      autoComplete="off"
                      onChange={(e) =>
                        setSignInData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="bg-transparent border-0 focus-visible:ring-0 p-0"
                    />
                    {showPassword ? (
                      <EyeOff
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer h-9 w-9 px-2 "
                      />
                    ) : (
                      <Eye
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer h-9 w-9 px-2"
                      />
                    )}
                  </div>
                </div>

                <Button className="cursor-pointer text-md">Login</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
