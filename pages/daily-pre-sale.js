import { useEffect } from "react";
import axiosInstanceSSR from "../axios-instance-ssr";
import DailyPreSaleCoinList from "../components/coins/daily-pre-sale-coin-list";
import Layout from "../components/layout";

const DailyPreSale = ({ daily_pre_sale_coins }) => {
  return (
    <>
      <DailyPreSaleCoinList coins={daily_pre_sale_coins} />
    </>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);

  const res = await Promise.all([
    axiosInstance.get("/api/coin?status=daily_pre_sale"),
  ]);

  const daily_pre_sale_coins = res[0].data;

  // Pass data to the page via props
  return { props: { daily_pre_sale_coins } };
}

export default DailyPreSale;

DailyPreSale.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
