import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startClock } from "../actions";

export default function Register() {
  return (
    <>
      <div className="p-4 flex justify-center items-start sm:items-center h-full">
        <div className=" w-full sm:shadow-primary sm:border sm:border-secondary sm:w-96 overflow-hidden text-white sm:rounded-lg p-4  sm:shadow-lg">
          <div className="flex justify-center">
            <Link href="/">
              <img
                src="images/logo.png"
                className="w-48 h-48 sm:h-24 object-cover cursor-pointer"
              />
            </Link>
          </div>
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
                type="email"
                name="email"
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
                type="password"
                name="password"
                id="password"
                className="input-primary"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                name="password"
                id="password"
                className="input-primary"
                placeholder="Enter your confirm password"
              />
            </div>
          </div>

          <div>
            <button type="button" className="btn-primary mt-2 w-full">
              Register
            </button>
          </div>
          <div className="flex justify-center items-center sm:text-xs gap-2 mt-2">
            Have an account?
            <Link href="/login">
              <a className=" text-secondary-light underline">Sign In</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
