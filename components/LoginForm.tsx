"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //testing
    // try {
    //   const res = await signIn("credentials", {
    //     email,
    //     password,
    //     redirect: false,
    //   });

    //   if (res?.error) {
    //     setError("Invalid Credentials");
    //     return;
    //   }

    //   router.replace("dashboard");
    // } catch (error) {
    //   console.error(error);
    //   setError("Something went wrong. Please try again.");
    // }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="border p-2 rounded-md"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border p-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md"
          >
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

// async function signIn(
//   provider: string,
//   credentials: { email: string; password: string; redirect: boolean }
// ): Promise<{ error?: string }> {
//   if (provider !== "credentials") {
//     throw new Error("Unsupported provider");
//   }

//   try {
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(credentials),
//     });

//     if (!res.ok) {
//       const { error } = await res.json();
//       return { error };
//     }

//     // Handle successful login (e.g., set a cookie or localStorage)
//     return {};
//   } catch (error) {
//     console.error("SignIn error:", error);
//     return { error: "Something went wrong. Please try again." };
//   }
// }
