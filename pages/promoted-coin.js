import { useEffect } from "react";
import axiosInstanceSSR from "../axios-instance-ssr";
import PromotedCoinList from "../components/coins/promoted-coin-list";
import Layout from "../components/layout";

const PromotedCoin = ({ promoted_coins, pageData }) => {
  return (
    <Layout banners={pageData.banners}>
      <PromotedCoinList coins={promoted_coins} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);

  const res = await Promise.all([
    axiosInstance.get("/api/coin?status=promoted"),
    axiosInstance.get(`/api/page`),
  ]);
  const promoted_coins = res[0].data;
  const pageData = res[1].data;

  // Pass data to the page via props
  return { props: { promoted_coins, pageData } };
}

export default PromotedCoin;

