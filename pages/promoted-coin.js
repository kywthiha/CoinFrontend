import { useEffect } from "react";
import axiosInstanceSSR from "../axios-instance-ssr";
import CoinList from "../components/coins/coin-list";
import PromotedCoinList from "../components/coins/promoted-coin-list";
import Layout from "../components/layout";
import Pagination from "../components/pagination";

const tabs = [
  {
    name: "Promoted Coin",
    href: "#",
    image: "/images/diamond.webp",
    current: true,
  },
];

const PromotedCoin = ({ promoted_coins, pageData, server_query }) => {
  return (
    <Layout server_query={server_query} banners={pageData.banners}>
      <div className="m-1 sm:m-4">
        <div className="flex justify-between mb-3 mx-2 sm:mx-0">
          <div className="block">
            <nav className="flex flex-wrap gap-2" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  className="px-3 bg-secondary-light py-2 font-medium text-white text-sm rounded-md inline-flex items-center gap-2 "
                >
                  {tab.image ? (
                    <img src={tab.image} className="w-4 h-4" />
                  ) : tab.icon_text ? (
                    <div>{tab.icon_text}</div>
                  ) : (
                    <></>
                  )}
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="hidden lg:block text-white text-center mt-2">
            Coins can be upvoted every 1h
          </div>
        </div>
        <CoinList coins={promoted_coins.data} meta={promoted_coins.meta} />

        <div className="block lg:hidden text-xs text-white text-center mt-2">
          Coins can be upvoted every 1h
        </div>

        <div>
          <Pagination
            meta={promoted_coins.meta}
            href={{
              pathname: "/promoted-coin",
              query: server_query,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);

  const res = await Promise.all([
    axiosInstance.get(
      `/api/coin?${new URLSearchParams({
        ...context.query,
        status: "promoted",
      }).toString()}`
    ),
    axiosInstance.get(`/api/page`),
  ]);
  const promoted_coins = res[0].data;
  const pageData = res[1].data;

  // Pass data to the page via props
  return { props: { promoted_coins, pageData } };
}

export default PromotedCoin;
