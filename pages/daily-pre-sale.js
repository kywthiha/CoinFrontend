import { useEffect } from "react";
import axiosInstanceSSR from "../axios-instance-ssr";
import DailyPreSaleCoinList from "../components/coins/daily-pre-sale-coin-list";
import Layout from "../components/layout";

const DailyPreSale = ({ daily_pre_sale_coins, pageData }) => {
  return (
    <Layout banners={pageData.banners}>
      <DailyPreSaleCoinList coins={daily_pre_sale_coins} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);

  const res = await Promise.all([
    axiosInstance.get("/api/coin?status=daily_pre_sale"),
    axiosInstance.get(`/api/page`),
  ]);

  const daily_pre_sale_coins = res[0].data;
  const pageData = res[1].data;

  // Pass data to the page via props
  return { props: { daily_pre_sale_coins, pageData } };
}

export default DailyPreSale;
