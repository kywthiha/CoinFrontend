import { Dialog, Transition } from "@headlessui/react";
import React, {
  useEffect,
  useRef,
  useState,
  Fragment,
  forwardRef,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";

const TEST_SITE_KEY = "6Lchg58eAAAAAD6eg58aXLCxZ5keolPP9uxcP8Op";
export default function CoinVoteGoogleRecaptcha({ recaptchaRef }) {
  const handleChange = (value) => {
    console.log("Captcha value:", value);
  };

  const asyncScriptOnLoad = () => {
    console.log("script loaded");
  };
  return forwardRef((props, ref) => (
   
  ));
}
