import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axiosInstance from "../../axios-instance";
import axiosInstanceSSR from "../../axios-instance-ssr";
import ButtonLoading from "../../components/button-loading";
import GeneralError from "../../components/general-error";
import Layout from "../../components/layout";
import { handleError, handleInputEvent, setToken } from "../../helper";

const ProfileEdit = ({ user, pageData }) => {
  const [error, setError] = useState(null);
  const [selfUser, setSelfUser] = useState(user);
  const [loginProcessing, setLoginProcessing] = useState(false);
  const router = useRouter();

  const handleOnChange = (e) => {
    setSelfUser({
      ...selfUser,
      ...handleInputEvent(e),
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginProcessing(true);
    setError(null);
    try {
      const formData = new FormData(e.target);
      formData.append("_method", "PUT");
      const res = await axiosInstance.post("/api/profile", formData);
      router.push("/protected-auth/profile");
    } catch (e) {
      handleError(e);
      setError(e);
      setLoginProcessing(false);
    }
  };

  return (
    <Layout daily_winner={pageData.daily_winner}>
      <div className="p-4  h-full">
        <Link href="/protected-auth/profile">
          <div className="cursor-pointer mb-2 flex justify-start gap-2 items-center text-white">
            <ArrowLeftIcon className="w-4 h-4" />
            Back To Profile
          </div>
        </Link>
        <form
          onSubmit={onSubmit}
          className="block w-full overflow-hidden text-white shadow-primary border border-secondary  rounded-lg p-4 shadow-lg"
        >
          <GeneralError error={error} />
          <h1 className="mb-4 text-lg">Edit Profile</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <div className="col-span-1">
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
                    value={selfUser.name}
                    onChange={handleOnChange}
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
                    readOnly
                    value={user.email}
                    type="email"
                    name="email"
                    autoComplete="new-email"
                    placeholder="Your email"
                    className="input-primary"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1">
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
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    className="input-primary"
                    autoComplete="new-password"
                    placeholder="Enter your confirm password"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              ERC20(or)BEP20 Address
            </label>
            <div className="mt-1">
              <textarea
                value={selfUser.address}
                onChange={handleOnChange}
                type="text"
                name="address"
                id="address"
                className="input-primary"
                placeholder="Enter your ERC20(or)BEP20 Address"
              />
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className={`btn-primary w-full sm:w-32   inline-flex  justify-center items-center gap-2 ${
                loginProcessing ? "opacity-50" : ""
              }`}
            >
              {loginProcessing ? <ButtonLoading /> : <></>}
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ProfileEdit;

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance_ssr = axiosInstanceSSR(context);

  const res = await Promise.all([
    axiosInstance_ssr.get("/api/profile"),
    axiosInstance.get(`/api/page`),
  ]);
  const user = res[0].data.data;
  const pageData = res[1].data;

  // Pass data to the page via props
  return { props: { user, pageData } };
}
