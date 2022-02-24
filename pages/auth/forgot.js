import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../../axios-instance";
import ButtonLoading from "../../components/button-loading";
import GeneralError from "../../components/general-error";
import OtpInput from "../../components/otp-input";
import { handleError, setToken } from "../../helper";
import { ClockIcon } from "@heroicons/react/outline";

export default function Forgot() {
  const [error, setError] = useState(null);
  const [loginProcessing, setLoginProcessing] = useState(false);
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [countDown, setCountDown] = useState(0);
  const [selfFormData, setSelfFormData] = useState(null);
  const [step, setStep] = useState(1);

  let timerInterval = null;

  const startTimer = () => {
    setCountDown(59);
    timerInterval = setInterval(() => {
      setCountDown((state) => {
        if (state == 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return state - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginProcessing(true);
    setError(null);
    try {
      const formData = new FormData(e.target);
      const res = await axiosInstance.post("/api/request-otp-forgot", formData);
      setSelfFormData(formData);
      setLoginProcessing(false);
      startTimer();
      setStep(2);
    } catch (e) {
      handleError(e);
      setError(e);
      setLoginProcessing(false);
    }
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      startTimer();
      const res = await axiosInstance.post(
        "/api/request-otp-forgot",
        selfFormData
      );
    } catch (e) {
      handleError(e);
      setError(e);
    }
  };

  const onVerifySubmit = async (e) => {
    e.preventDefault();
    setLoginProcessing(true);
    setError(null);
    try {
      const formData = selfFormData;
      formData.set("otp", otp);
      const res = await axiosInstance.post("/api/verify-otp-forgot", formData);
      formData.set("token", res.data.data.token);
      setSelfFormData(formData);
      setStep(3);
      setLoginProcessing(false);
    } catch (e) {
      handleError(e);
      setError(e);
      setLoginProcessing(false);
    }
  };

  const onSaveSubmit = async (e) => {
    e.preventDefault();
    setLoginProcessing(true);
    setError(null);
    try {
      const formData = new FormData(e.target);
      for (var pair of selfFormData.entries()) {
        formData.set(pair[0], pair[1]);
      }
      const res = await axiosInstance.post("/api/save-password", formData);
      router.push("/auth/login");
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
          className={`w-full sm:shadow-primary sm:border sm:border-secondary sm:w-96 overflow-hidden text-white sm:rounded-lg p-4  sm:shadow-lg ${
            step == 1 ? "block" : "hidden"
          }`}
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
          <h1 className="mb-4 text-lg">Forgot Password</h1>
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

          <div>
            <button
              type="submit"
              className={`btn-primary mt-2 w-full inline-flex  justify-center items-center gap-2 ${
                loginProcessing ? "opacity-50" : ""
              }`}
            >
              {loginProcessing ? <ButtonLoading /> : <></>}
              Continue
            </button>
          </div>
        </form>

        <form
          onSubmit={onVerifySubmit}
          className={`w-full sm:shadow-primary sm:border sm:border-secondary sm:w-96 overflow-hidden text-white sm:rounded-lg p-4  sm:shadow-lg ${
            step == 2 ? "block" : "hidden"
          }`}
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
            {countDown ? (
              <div className="flex gap-2 items-center text-secondary-light">
                <ClockIcon className="w-5 h-5" /> 00:{countDown}s
              </div>
            ) : (
              <div
                onClick={resendOtp}
                className="text-secondary-light underline cursor-pointer"
              >
                Resend
              </div>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              OTP Code
            </label>
            <div className="mt-1">
              <OtpInput
                onChange={handleOtpChange}
                value={otp}
                numInputs={6}
                isInputNum={true}
              ></OtpInput>
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
              Verify
            </button>
          </div>
          <div className="flex justify-center items-center sm:text-xs gap-2 mt-2">
            <button
              disabled={loginProcessing}
              type="button"
              className=" text-secondary-light underline"
              onClick={(e) => {
                setStep(1);
                setLoginProcessing(false);
              }}
            >
              Edit Email
            </button>
          </div>
        </form>

        <form
          onSubmit={onSaveSubmit}
          className={`w-full sm:shadow-primary sm:border sm:border-secondary sm:w-96 overflow-hidden text-white sm:rounded-lg p-4  sm:shadow-lg ${
            step == 3 ? "block" : "hidden"
          }`}
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
          <h1 className="mb-4 text-lg">New Password</h1>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
