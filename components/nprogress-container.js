import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";

export default function NProgressContainer() {
  const router = useRouter();
  let timer = null;
  const configNProgress = {
    color: "#9488f0",
    showAfterMs: 100,
    spinner: true,
  };

  const handleRouteChange = (url, { shallow }) => {
    console.log(handleRouteChange);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(nProgress.start, configNProgress.showAfterMs);
  };

  const handleRouteEnd = (url, { shallow }) => {
    console.log("handleRouteEnd");
    if (timer) {
      clearTimeout(timer);
    }
    nProgress.done(true);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteEnd);
    router.events.on("routeChangeError", handleRouteEnd);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
    //   router.events.off("routeChangeStart", handleRouteChange);
    //   router.events.off("routeChangeComplete", handleRouteEnd);
    //   router.events.off("routeChangeError", handleRouteEnd);
    };
  }, []);
  return (
    <style jsx global>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${configNProgress.color};
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 2.5px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${configNProgress.color},
          0 0 5px ${configNProgress.color};
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
      #nprogress .spinner {
        display: ${configNProgress.spinner ? "block" : "none"};
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
      }
      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: solid 2px transparent;
        border-top-color: ${configNProgress.color};
        border-left-color: ${configNProgress.color};
        border-radius: 50%;
        -webkit-animation: nprogresss-spinner 400ms linear infinite;
        animation: nprogress-spinner 400ms linear infinite;
      }
      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }
      @-webkit-keyframes nprogress-spinner {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes nprogress-spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  );
}
