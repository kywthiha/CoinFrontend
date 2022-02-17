import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios-instance";
import ButtonLoading from "../../components/button-loading";
import GeneralError from "../../components/general-error";
import { handleError, setToken } from "../../helper";

const Login = () => {
  const [error, setError] = useState(null);
  const [loginProcessing, setLoginProcessing] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginProcessing(true);
    setError(null);
    try {
      const formData = new FormData(e.target);
      const res = await axiosInstance.post("/api/login", formData);
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
      <div className="p-4  flex justify-center items-start sm:items-center h-full">
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
          <h1 className="mb-4 text-lg">Login to Your Account</h1>
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
                id="email"
                placeholder="Your email"
                className="rounded-md w-full h-full px-2 py-2 bg-primary-dark text-white placeholder-secondary-light focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
              />
            </div>
          </div>
          <div>
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
                className="rounded-md w-full h-full px-2 py-2 bg-primary-dark text-white placeholder-secondary-light focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <Link href="/">
            <a className="text-xs text-secondary-light underline">
              Forgot Password?
            </a>
          </Link>
          <div>
            <button
              type="submit"
              disabled={loginProcessing}
              className={`btn-primary mt-2 gap-2 w-full flex justify-center items-center ${
                loginProcessing ? "opacity-50" : ""
              }`}
            >
              {loginProcessing ? <ButtonLoading /> : <></>}
              Login
            </button>
          </div>
          <div className="flex justify-center items-center sm:text-xs gap-2 mt-2">
            Don't have an account?
            <Link href="/register">
              <a className=" text-secondary-light underline">Register</a>
            </Link>
          </div>
          <div className="flex justify-center items-center sm:text-xs gap-2 mt-2">
            <Link href="/">
              <a className=" text-secondary-light underline">Home</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
