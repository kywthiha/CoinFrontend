import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios-instance";

export default function CoinItem({ coin, index }) {
  const [coinData, setCoinData] = useState(coin);

  const handleClickVote = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCoinData({
      ...coinData,
      is_vote: coinData.id,
      all_votes_count: coinData.all_votes_count + 1,
    });
    try {
      const res = await axiosInstance.put(`/api/coin/${coinData.id}`);
    } catch (e) {
      alert("Already Vote!");
    }
  };

  // useEffect(() => {
  //   setCoinData(coin);
  // }, [coin]);

  return (
    <Link href={`/coin/${coin.id}`}>
      <div className="text-white coin-item bg-primary-dark  px-2  coins-center hover:bg-primary cursor-pointer">
        <style jsx>{`
          .coin-item {
            display: grid;
            gap: 2;
            grid-template-columns: 50% 20% 30%;

            @media (min-width: 640px) {
              grid-template-columns: 3% 25% 15% 15% 15% 10% 17%;
            }
          }
        `}</style>
        <div className="hidden text-xs sm:text-base sm:flex gap-2 coins-center py-2  justify-center items-center">
          {index}
        </div>
        <div className="flex gap-2 coins-center py-2 items-center overflow-x-auto">
          <img src={coin.logo} className="h-10 w-10" />
          <div>
            <div className="text-xs sm:text-base font-medium">{coin.name}</div>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="text-xs inline-flex  rounded-full px-2 bg-secondary-light">
                <div className="truncate"> {coin.chain.name}</div>
              </div>
              {coin.kyc_link ? (
                <a
                  href={coin.kyc_link}
                  target="_blank"
                  className="text-xs inline-flex bg-yellow text-primary rounded-full  px-2"
                >
                  KYC
                </a>
              ) : coin.audit_link ? (
                <a
                  href={coin.audit_link}
                  target="_blank"
                  className="text-xs inline-flex bg-yellow text-primary rounded-full px-2"
                >
                  Audit
                </a>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="hidden text-xs sm:text-base sm:flex gap-2 coins-center py-2  justify-center items-center">
          {coin.symbol}
        </div>
        <div className="flex text-xs sm:text-base gap-2 coins-center py-2  justify-center items-center">
          {coin.launched_at_format}
        </div>
        <div className="hidden text-xs sm:text-base  sm:flex gap-2 coins-center py-2  justify-center items-center">
          {coin.is_vote_win_feature ? (
            <div className="truncate">{coin.vote_2_win}</div>
          ) : (
            <>-</>
          )}
        </div>
        <div className="hidden text-xs sm:text-base sm:flex gap-2 coins-center py-2  justify-center items-center">
          {coin.whitelist_link ? (
            <a
              target="_blank"
              href={coin.whitelist_link}
              className="bg-primary border border-secondary hover:border-secondary-light hover:shadow-md hover:shadow-secondary-dark rounded-full py-2 px-3"
            >
              Whitelist
            </a>
          ) : coin.public_link ? (
            <a
              target="_blank"
              href={coin.public_link}
              className="bg-primary border border-secondary hover:border-secondary-light hover:shadow-md hover:shadow-secondary-dark rounded-full py-2 px-3"
            >
              Public Link
            </a>
          ) : (
            <></>
          )}
        </div>
        <div className="text-xs sm:text-base flex gap-2 coins-center py-2  justify-center items-center ">
          <button
            onClick={handleClickVote}
            disabled={coinData.is_vote}
            className={`border w-24 text-center px-2 py-2  rounded-md ${
              coinData.is_vote
                ? "cursor-not-allowed bg-success"
                : "border-secondary-light hover:bg-secondary-light "
            }`}
          >
            🚀 {coinData.all_votes_count || ""}
          </button>
        </div>
      </div>
    </Link>
  );
}
