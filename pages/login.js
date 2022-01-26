import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startClock } from "../actions";

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startClock());
  }, [dispatch]);

  return (
    <>
      <div className="p-4 flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white w-96 overflow-hidden sm:rounded-lg p-4 rounded shadow-lg">
          <h1 className="text-center mb-4 text-xl">Admin</h1>
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
                id="email"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                type="password"
                name="password"
                id="password"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder=""
              />
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center mt-4 justify-center w-full py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
              Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
