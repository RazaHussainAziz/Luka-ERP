import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signupSchema } from "@/validations/authSchema";
import { User, Mail, Eye, EyeOff, Lock } from "lucide-react";
import React, { type FormEvent } from "react";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useUserStore } from "@/store";
import type { User as Usertype } from "@/Types/userType";

function Signup() {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const { writeUser } = useUserStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleForm = async (e: FormEvent) => {
    try {
      e.preventDefault();
      //check for zod validation
      signupSchema.parse(user);
      //making post fetch request
      const request = await fetch(import.meta.env.BACKEND_SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const response = await request.json();
      if (!response.success) return toast.error("signup failed");
      //storing data in store
      writeUser({
        id: response._id,
        username: response.username,
        email: response.email,
        isPro: response.isPro,
        authFlag: true,
      } as Usertype);
      return toast.success(`Welcome ${response.username}`);
    } catch (error) {
      if (error instanceof ZodError)
        return toast.error(error.errors[0].message);
      return toast.error("signup failed");
    }
  };
  return (
    <section className="h-screen w-full bg-black flex items-center justify-center">
      <form
        onSubmit={handleForm}
        className="outline-1 outline-zinc-300/30 px-4 py-5 flex flex-col gap-5 min-w-[370px] rounded-md
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
              max={20}
              min={5}
              value={user.username}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, username: e.target.value }))
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
              value={user.email}
              maxLength={50}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
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
              value={user.password}
              minLength={8}
              maxLength={30}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              className="bg-transparent border-0 focus-visible:ring-0 p-0"
            />
            {showPassword ? (
              <Eye
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer h-9 w-9 px-2"
              />
            ) : (
              <EyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer h-9 w-9 px-2 "
              />
            )}
          </div>
        </div>

        <Button className="cursor-pointer text-md">Signup</Button>
        <Separator orientation="horizontal" className="bg-zinc-700" />
        <div>
          <span className="text-zinc-300">
            Already have an account ?{" "}
            <NavLink to={"/login"} className="text-white hover:underline">
              Login
            </NavLink>
          </span>
        </div>
      </form>
    </section>
  );
}

export default Signup;
