import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { loginSchema } from "@/validations/authSchema";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import React, { type FormEvent } from "react";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useUserStore } from "@/store";
import type { User as Usertype } from "@/Types/userType";

function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const { writeUser } = useUserStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleForm = async (e: FormEvent) => {
    try {
      e.preventDefault();
      //check for zod validation
      loginSchema.parse(user);
      //making post fetch request
      const request = await fetch(import.meta.env.VITE_BACKEND_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }); 
      const response = await request.json();
      if (!response.success) return toast.error("login failed");
      //storing data
      writeUser({
        id: response._id,
        username: response.username,
        email: response.email,
        isPro: response.isPro,
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
    <section className="h-screen w-full bg-black flex items-center justify-center select-none">
      <form
        onSubmit={handleForm}
        className="outline-1 outline-zinc-300/30 px-4 py-5 flex flex-col gap-5 min-w-[370px] rounded-md
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
              autoComplete="off"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
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
        <Separator orientation="horizontal" className="bg-zinc-700" />
        <div>
          <span className="text-zinc-300">
            Doesn't have an account ?{" "}
            <NavLink to={"/signup"} className="text-white hover:underline">
              Signup
            </NavLink>
          </span>
        </div>
      </form>
    </section>
  );
}

export default Login;
