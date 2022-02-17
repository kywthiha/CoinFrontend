import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../../axios-instance";
import ButtonLoading from "../../components/button-loading";
import GeneralError from "../../components/general-error";
import { handleError, setToken } from "../../helper";

export default function Register() {
  const [error, setError] = useState(null);
  const [loginProcessing, setLoginProcessing] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginProcessing(true);
    setError(null);
    try {
      const formData = new FormData(e.target);
      const res = await axiosInstance.post("/api/register", formData);
      setToken(res.data.data.token);
      router.push("/");
    } catch (e) {
      handleError(e);
      setError(e);
      setLoginProcessing(false);
    }
  };

  return (
    <>
      <div className="p-4 flex justify-center items-start sm:items-center h-full">
        <form
          onSubmit={onSubmit}
          className="block w-full sm:shadow-primary sm:border sm:border-secondary sm:w-96 overflow-hidden text-white sm:rounded-lg p-4  sm:shadow-lg"
        >
          <div className="flex justify-center">
            <Link href="/">
              <img
                src="/images/logo.png"
                className="w-48 h-48 sm:h-24 object-cover cursor-pointer"
              />
            </Link>
          </div>
          <GeneralError error={error} />
          <h1 className="mb-4 text-lg">Sign Up</h1>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="name"
                required
                name="name"
                placeholder="Enter your name"
                className="input-primary"
              />
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                required
                type="email"
                name="email"
                autoComplete="new-email"
                placeholder="Your email"
                className="input-primary"
              />
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                required
                type="password"
                name="password"
                id="password"
                className="input-primary"
                placeholder="Enter your password"
                autoComplete="new-password"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                required
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                className="input-primary"
                autoComplete="new-password"
                placeholder="Enter your confirm password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`btn-primary mt-2 w-full inline-flex  justify-center items-center gap-2 ${
                loginProcessing ? "opacity-50" : ""
              }`}
            >
              {loginProcessing ? <ButtonLoading /> : <></>}
              Register
            </button>
          </div>
          <div className="flex justify-center items-center sm:text-xs gap-2 mt-2">
            Have an account?
            <Link href="/auth/login">
              <a className=" text-secondary-light underline">Sign In</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
