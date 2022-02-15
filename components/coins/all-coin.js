import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios-instance";
import classNames from "../../helper";
import Loading from "../loading";
import CoinList from "./coin-list";

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

export default function AllCoin({ coins }) {
  const [status, setStatus] = useState("today_best");
  const [selfCoins, setSelfCoins] = useState(coins.data);
  const [processing, setProcessing] = useState(false);
  const [paginationProcessing, setPaginationProcessing] = useState(false);
  const [pagination, setPagination] = useState(coins.meta);

  const fetchCoins = async (key) => {
    setSelfCoins([]);
    const res = await axiosInstance.get(`/api/coin?status=${key}`);
    setSelfCoins(res.data.data);
    setPagination(res.data.meta);
  };

  const fetchCoinsPagination = async (e) => {
    setPaginationProcessing(true);
    const res = await axiosInstance.get(
      `/api/coin?status=${status}&page=${pagination.current_page + 1}`
    );
    setPagination(res.data.meta);
    setSelfCoins([...selfCoins, ...res.data.data]);
    setPaginationProcessing(false);
  };

  const handleOnClickTag = (key) => async (e) => {
    setProcessing(true);
    e.preventDefault();
    await fetchCoins(key);
    setStatus(key);
    setProcessing(false);
  };

  return (
    <>
      <div className="m-1 sm:m-4">
        <div className="flex justify-between mb-3 mx-2 sm:mx-0">
          <div className="block">
            <nav className="flex flex-wrap gap-2" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  disabled={processing}
                  onClick={handleOnClickTag(tab.key)}
                  key={tab.key}
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
              ))}
            </nav>
          </div>
          <div className="hidden lg:block text-white text-center mt-2">
            Coins can be upvoted every 1h
          </div>
        </div>
        {processing ? (
          <Loading />
        ) : (
          <>
            <CoinList coins={selfCoins} />
            {pagination && pagination.current_page < pagination.last_page ? (
              <div
                onClick={fetchCoinsPagination}
                className="text-secondary-light flex justify-center items-center gap-2 bg-primary py-2 cursor-pointer"
              >
                {paginationProcessing ? (
                  <Loading />
                ) : (
                  <>
                    {" "}
                    <ChevronDownIcon className="h-4 w-4" /> Show More
                  </>
                )}
              </div>
            ) : (
              <></>
            )}
          </>
        )}

        <div className="block lg:hidden text-xs text-white text-center mt-2">
          Coins can be upvoted every 1h
        </div>
      </div>
    </>
  );
}
