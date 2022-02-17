import { useEffect } from "react";
import axiosInstanceSSR from "../axios-instance-ssr";
import Layout from "../components/layout";

const IDONews = ({}) => {
  return (
    <>
      <div>
        <div className="m-1 sm:m-4 text-white">
          <h1 className="text-lg text-center">Coming Soon...</h1>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);

  // Pass data to the page via props
  return { props: {} };
}

export default IDONews;

IDONews.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
