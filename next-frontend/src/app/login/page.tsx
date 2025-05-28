"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import loginSchema from "../../../zodTypes/login";
import axiosInstance from "@/config/axiosInstance";
import { useAuth } from "@/context/authContext";
import { Loader } from "lucide-react";
import { z } from "zod";
import { FlipWords } from "@/components/ui/flip-words";

type FormFields = z.infer<typeof loginSchema>;

const Login = () => {
  const { setUser, setToken } = useAuth();
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,

    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/auth/login", data);
      console.log("from login:#########", res.data.user._id);
      console.log(res.data.user);
      localStorage.setItem("token", res.data.token);

      const user = {
        email: res.data.user.email,
        credits: res.data.user.credits,
        _id: res.data.user._id,
      };
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setToken(res.data.token);
      navigate.push("/home");
      console.log(res.data);
      reset();
      toast(res.data.message);
    } catch (error: unknown) {
      // `unknown` is safer than `any`
      console.error(error);

      if (error instanceof Error) {
        setError("root", {
          message: error.message, // Now TypeScript knows `error` is an `Error`
        });
      } else {
        setError("root", {
          message: "An unknown error occurred",
        });
      }
    }
  };

  return (
    <div className=" m- gap-1.5 items-center h-screen flex ">
      <div className="left hidden lg:flex lg:flex-col m-2 items-center   justify-center bg-accent border-[1px] h-[98dvh] rounded-2xl w-1/2 text-[#FFFFE3] p-8 space-y-4 ">
        <h1 className="text-3xl font-semibold">
          Welcome to <span className="font-medium">Briefly</span>
        </h1>
        <p className="text-center text-sm leading-relaxed max-w-xs">
          Summarize smarter with AI. <br />
          Save hours on reading. <br />
          Stay informed in minutes. <br />
          Because time is knowledge.
        </p>
      </div>

      <div className="right flex-col p-10 flex items-center justify-center h-[98dvh]rounded-2xl w-full lg:w-1/2">
        <div className="text-3xl md:text-4xl mb-10 mx-auto font-semibold text-neutral-800  leading-tight">
          Summarize&nbsp;
          <FlipWords
            className="text-[#FFFFE3]"
            words={["faster", "smarter", "effortlessly", "instantly"]}
          />
          <br />
          your PDFs with Briefly AI
        </div>
        <div className="flex flex-col items-center gap-4 border-[1px] p-10 rounded-2xl">
          <h1 className="text-2xl">
            Login to <span className="text-[#FFFFE3]">Briefly</span>
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  gap-4   "
          >
            <Input type="email" placeholder="Email" {...register("email")} />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.root && (
              <span className="text-red-800">{errors.root?.message}</span>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className=" p-2 rounded-lg cursor-pointer"
            >
              Login{" "}
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                </>
              ) : (
                ""
              )}
            </Button>
          </form>
        </div>
        <div className="flex flex-col mt-1 items-center">
          <small>
            Do not have an account?
            <Link href="/register" className="text-blue-500 ">
              Register
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
