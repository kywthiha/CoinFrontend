import { useEffect } from "react";
import axiosInstanceSSR from "../axios-instance-ssr";
import Layout from "../components/layout";

const TipDyor = ({ pageData }) => {
  return (
    <Layout banners={pageData.banners} daily_winner={pageData.daily_winner}>
      <div>
        <div className="m-1 sm:m-4 text-white">
          <h1 className="text-lg text-center">Coming Soon...</h1>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);
  const res = await Promise.all([axiosInstance.get(`/api/page`)]);
  const pageData = res[0].data;

  // Pass data to the page via props
  return { props: { pageData } };
}

export default TipDyor;
