import { useEffect } from "react";
import axiosInstanceSSR from "../axios-instance-ssr";
import AllCoin from "../components/coins/all-coin";
import CoinList from "../components/coins/coin-list";
import DailyPreSaleCoinList from "../components/coins/daily-pre-sale-coin-list";
import PromotedCoinList from "../components/coins/promoted-coin-list";
import Layout from "../components/layout";

const TipDyor = ({}) => {
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

export default TipDyor;

TipDyor.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
