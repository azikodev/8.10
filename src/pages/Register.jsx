import React, { useEffect } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";

import { useRegister } from "../hooks/useRegister";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");

  return { email, password, displayName, photoURL };
};

function Register() {
  const userData = useActionData();
  const { register, isPending, registerWithGoogle } = useRegister();

  useEffect(() => {
    if (userData) {
      register(
        userData.email,
        userData.password,
        userData.displayName,
        userData.photoURL
      );
    }
  }, [userData]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block h-full bg-orange-50 bg-[url('https://picsum.photos/1600/2400')] bg-center bg-cover bg-no-repeat"></div>

      <div className="h-full bg-slate-50 grid place-items-center lg:bg-none bg-[url('https://picsum.photos/1600/2400')] bg-center bg-cover bg-no-repeat bg-fixed">
        <div
          className="card bg-base-100 w-96 shadow-xl p-8"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
        >
          <Form method="post" className="flex flex-col items-center gap-5 ">
            <h1 className="text-3xl font-semibold">Register</h1>
            <FormInput type="text" label="displayName" name="displayName" />
            <FormInput type="url" label="photoURL" name="photoURL" />
            <FormInput type="email" label="email" name="email" />
            <FormInput type="password" label="password" name="password" />
            <div className="w-full">
              {!isPending && (
                <button className="btn btn-primary btn-block">Register</button>
              )}
              {isPending && (
                <button disabled className="btn btn-primary btn-block">
                  Loading...
                </button>
              )}
            </div>
          </Form>
          {isPending && (
            <div className="w-full mt-5">
              <button
                disabled
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block"
              >
                ...Loading
              </button>
            </div>
          )}
          {!isPending && (
            <div className="w-full mt-5">
              <button
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block "
              >
                Google{" "}
              </button>
            </div>
          )}
          <div className="mt-5 text-center">
            If you have account,{" "}
            <Link className="link link-primary" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
