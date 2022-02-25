import { useEffect } from "react";
import axiosInstanceSSR from "../axios-instance-ssr";
import AllCoin from "../components/coins/all-coin";
import DailyPreSaleCoinList from "../components/coins/daily-pre-sale-coin-list";
import PromotedCoinList from "../components/coins/promoted-coin-list";
import Layout from "../components/layout";

const Index = ({
  promoted_coins,
  daily_pre_sale_coins,
  all_coins,
  pageData,
}) => {
  return (
    <Layout banners={pageData.banners} daily_winner={pageData.daily_winner}>
      <PromotedCoinList coins={promoted_coins} />
      <div className="mt-3">
        <DailyPreSaleCoinList coins={daily_pre_sale_coins} />
      </div>
      <div className="mt-3">
        <AllCoin coins={all_coins} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);

  const res = await Promise.all([
    axiosInstance.get("/api/coin?status=promoted"),
    axiosInstance.get("/api/coin?status=daily_pre_sale"),
    axiosInstance.get("/api/coin?status=today_best"),
    axiosInstance.get(`/api/page`),
  ]);
  const promoted_coins = res[0].data;
  const daily_pre_sale_coins = res[1].data;
  const all_coins = res[2].data;
  const pageData = res[3].data;

  // Pass data to the page via props
  return {
    props: { promoted_coins, daily_pre_sale_coins, all_coins, pageData },
  };
}

export default Index;

