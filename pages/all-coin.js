import Link from "next/link";
import axiosInstanceSSR from "../axios-instance-ssr";
import CoinList from "../components/coins/coin-list";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { classNames } from "../helper";

const tabs = [
  {
    name: "Today's Best",
    href: "#",
    icon_text: "🔥",
    current: true,
    key: "today_best",
  },
  {
    name: "Daily Presale 4U",
    href: "#",
    current: false,
    icon_text: "🎉",
    key: "daily_pre_sale",
  },
  {
    name: "All Time Best",
    href: "#",
    icon_text: "🥇",
    current: false,
    key: "all_time_best",
  },
  {
    name: "New Coins",
    href: "#",
    icon_text: "💙",
    current: false,
    key: "new_coins",
  },
];

const AllCoin = ({
  all_coins,
  pageData,
  status = "today_best",
  server_query,
}) => {
  console.log(all_coins.meta);
  return (
    <Layout server_query={server_query} banners={pageData.banners}>
      <div className="m-1 sm:m-4">
        <div className="flex justify-between mb-3 mx-2 sm:mx-0">
          <div className="block">
            <nav className="flex flex-wrap gap-2" aria-label="Tabs">
              {server_query && server_query.search ? (
                <Link
                  href={{
                    pathname: "/all-coin",
                    query: { ...server_query, search: null },
                  }}
                >
                  <button className="bg-secondary-light px-3 py-2 font-medium text-white text-sm rounded-md inline-flex items-center gap-2">
                    Search : {(server_query && server_query.search) || ""}
                  </button>
                </Link>
              ) : (
                <></>
              )}
              {tabs.map((tab) => (
                <Link
                  href={{
                    pathname: "/all-coin",
                    query: { ...server_query, status: tab.key },
                  }}
                  key={tab.key}
                >
                  <button
                    className={classNames(
                      tab.key == status
                        ? "bg-secondary-light"
                        : "bg-primary hover:bg-secondary",
                      "px-3 py-2 font-medium text-white text-sm rounded-md inline-flex items-center gap-2 "
                    )}
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
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden lg:block text-white text-center mt-2">
            Coins can be upvoted every 1h
          </div>
        </div>
        <CoinList coins={all_coins.data} meta={all_coins.meta} />

        <div className="block lg:hidden text-xs text-white text-center mt-2">
          Coins can be upvoted every 1h
        </div>

        <div>
          <Pagination
            meta={all_coins.meta}
            href={{
              pathname: "/all-coin",
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
      `/api/coin?${new URLSearchParams(context.query).toString()}`
    ),
    axiosInstance.get(`/api/page`),
  ]);
  const all_coins = res[0].data;
  const pageData = res[1].data;

  let status = "today_best";
  if (context.query && context.query.status) {
    status = context.query.status;
  }

  // Pass data to the page via props
  return {
    props: { all_coins, server_query: context.query, status, pageData },
  };
}

export default AllCoin;
