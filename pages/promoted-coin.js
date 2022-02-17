import { useEffect } from "react";
import axiosInstanceSSR from "../axios-instance-ssr";
import PromotedCoinList from "../components/coins/promoted-coin-list";
import Layout from "../components/layout";

const PromotedCoin = ({ promoted_coins, daily_pre_sale_coins, all_coins }) => {
  return (
    <>
      <PromotedCoinList coins={promoted_coins} />
    </>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);

  const res = await Promise.all([
    axiosInstance.get("/api/coin?status=promoted"),
  ]);
  const promoted_coins = res[0].data;

  // Pass data to the page via props
  return { props: { promoted_coins } };
}

export default PromotedCoin;

PromotedCoin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
