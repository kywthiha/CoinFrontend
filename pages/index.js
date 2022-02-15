import { useEffect } from "react";
import axiosInstanceSSR from "../axios-instance-ssr";
import AllCoin from "../components/coins/all-coin";
import CoinList from "../components/coins/coin-list";
import DailyPreSaleCoinList from "../components/coins/daily-pre-sale-coin-list";
import PromotedCoinList from "../components/coins/promoted-coin-list";
import Layout from "../components/layout";

const Index = ({ promoted_coins, daily_pre_sale_coins, all_coins }) => {
  return (
    <>
      <PromotedCoinList coins={promoted_coins} />
      <div className="mt-3">
        <DailyPreSaleCoinList coins={daily_pre_sale_coins} />
      </div>
      <div className="mt-3">
        <AllCoin coins={all_coins} />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);

  const res = await Promise.all([
    axiosInstance.get("/api/coin?status=promoted"),
    axiosInstance.get("/api/coin?status=daily_pre_sale"),
    axiosInstance.get("/api/coin?status=today_best"),
  ]);
  const promoted_coins = res[0].data;
  const daily_pre_sale_coins = res[1].data;
  const all_coins = res[2].data;

  // Pass data to the page via props
  return { props: { promoted_coins, daily_pre_sale_coins, all_coins } };
}

export default Index;

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
