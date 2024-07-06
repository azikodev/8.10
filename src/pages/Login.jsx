import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useLogin } from "../hooks/useLogin";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

import { useRegister } from "../hooks/useRegister";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

function Login() {
  const userData = useActionData();
  const [showPassword, setShowPassword] = useState(true);
  const [errorStatus, setErrorStatus] = useState({
    email: "",
    password: "",
  });
  const { loginUser, isPending } = useLogin();
  const { isPending: isPendingUseRegister, registerWithGoogle } = useRegister();

  useEffect(() => {
    if (userData) {
      if (userData.email && userData.password && showPassword) {
        loginUser(userData.email, userData.password);

        if (!showPassword && userData?.email) {
          sendPasswordResetEmail(auth, userData.email)
            .then(() => {
              toast.success("Link send");
              setShowPassword(true);
            })
            .catch((error) => {
              toast.error(error.message);
            });
        }
      }
      if (!userData.email) {
        setErrorStatus((prev) => {
          return { ...prev, email: "input-error" };
        });
      }
      if (!userData.password) {
        setErrorStatus((prev) => {
          return { ...prev, password: "input-error" };
        });
      }
    }
  }, [userData]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className=" hidden lg:block h-full bg-orange-50  bg-[url('./login-img.jpg')] bg-center bg-cover"></div>
      <div className="h-full bg-slate-50 grid place-items-center  lg:bg-none  bg-[url('./login-img.jpg')] bg-center bg-cover">
        <div className="card bg-base-100 w-96 shadov-xl  p-8">
          <Form method="post" className="flex flex-col items-center gap-5 ">
            <h1 className="text-3xl font-semibold">Login</h1>
            <FormInput
              type="email"
              label="email"
              name="email"
              status={errorStatus.email}
            />
            {showPassword && (
              <FormInput
                type="password"
                label="password"
                name="password"
                status={errorStatus.password}
              />
            )}

            <div className="w-full">
              {!isPending && (
                <button className="btn btn-primary btn-block">
                  {showPassword ? "Login" : "Send"}
                </button>
              )}
              {isPending && (
                <button disabled className="btn btn-primary btn-block ">
                  Loading...
                </button>
              )}
            </div>
          </Form>
          <div className="w-full mt-5">
            {isPendingUseRegister && (
              <button
                disabled
                className="btn btn-accent btn-block text-red-500  text-lg"
              >
                Loading ....
              </button>
            )}
            {!isPendingUseRegister && (
              <button
                onClick={registerWithGoogle}
                className="btn btn-accent btn-block text-red-500  text-lg"
              >
                Google
              </button>
            )}
          </div>
          <div className="mt-5 text-center">
            If you don't have account,{" "}
            <Link className="link link-primary" to="/register">
              Register
            </Link>
          </div>
          <div className="mt-5 text-center">
            Forget password ?{" "}
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-sm btn-ghost"
            >
              {showPassword ? "Reset Password" : "Show password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
