import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios-instance";
import axiosInstanceSSR from "../../axios-instance-ssr";
import PromotedCoinList from "../../components/coins/promoted-coin-list";
import Layout from "../../components/layout";
import { createMarkup, numberFormat } from "../../helper";

const Coin = ({ coin, pageData, promoted_coins }) => {
  const [coinData, setCoinData] = useState(coin);
  const [promotedCoins, setPromotedCoins] = useState(promoted_coins);

  const handleClickVote = async (e) => {
    setCoinData({
      ...coinData,
      is_vote: coinData.id,
      all_votes_count: coinData.all_votes_count + 1,
      today_votes_count: coinData.today_votes_count + 1,
    });
    try {
      const res = await axiosInstance.put(`/api/coin/${coin.id}`);
    } catch (e) {
      alert("Already Vote!");
    }
  };

  const getFilterPromotedCoins = () => {
    return {
      ...promoted_coins,
      data: promoted_coins.data.filter((c) => c.id !== coin.id),
    };
  };

  useEffect(() => {
    setCoinData(coin);
    setPromotedCoins(getFilterPromotedCoins());
  }, [coin]);
  return (
    <Layout banners={pageData.banners}>
      <div>
        <div className="sm:m-4 m-3" key={coin.id}>
          <div className="block w-full overflow-hidden text-white shadow-primary border border-secondary  rounded-lg p-4 shadow-sm">
            <div className="block sm:flex gap-2">
              <div className="flex-1 ">
                <div className=" block sm:flex gap-2">
                  <div className="w-28 h-28">
                    <img src={coin.logo} className="w-full h-full" />
                  </div>
                  <div>
                    <div className="text-xl mt-3 sm:mt-0">{coin.name}</div>
                    <div className="flex gap-2 flex-wrap mt-3">
                      <div className="bg-secondary-dark border border-primary p-2 gap-2 rounded-md shadow-sm flex justify-center items-center">
                        <div className="font-medium">{coin.symbol}</div>
                      </div>
                      <div className="bg-primary-dark border border-primary p-2 gap-2 rounded-md shadow-sm flex justify-center items-center">
                        <div>Votes</div>
                        <div className="font-medium">
                          {numberFormat(coinData.all_votes_count) || "N/A"}
                        </div>
                      </div>
                      <div className="bg-primary-dark border border-primary p-2 gap-2 rounded-md shadow-sm flex justify-center items-center">
                        <div>Today</div>
                        <div className="font-medium">
                          {numberFormat(coinData.today_votes_count) || "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-3 items-center">
                      <div className="inline-flex items-center px-1.5 py-0.5 rounded-md text-sm font-medium bg-success text-white shadow">
                        {coin.chain.name}
                      </div>
                      {coin.kyc_link ? (
                        <a
                          href={coin.kyc_link}
                          className="inline-flex items-center px-1.5 py-0.5 rounded-md text-sm font-medium bg-yellow text-white shadow"
                        >
                          KYC
                        </a>
                      ) : (
                        <></>
                      )}
                      {coin.audit_link ? (
                        <a
                          href={coin.audit_link}
                          className="inline-flex items-center px-1.5 py-0.5 rounded-md text-sm font-medium bg-yellow text-white shadow"
                        >
                          Audit
                        </a>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="border-t-2 grid grid-cols-1 sm:grid-cols-4 border-b-2 border-secondary-light py-2">
                    <div className="text-center sm:text-left">
                      Status :
                      <span className="font-medium text-lg ml-1">Launch</span>
                    </div>
                    <div className="flex-1 truncate text-center">
                      Vote to Win :
                      <span className="font-medium text-lg ml-1">
                        {coin.vote_2_win}
                      </span>
                    </div>
                    <div className=" text-center">
                      Presale Date :
                      <span className="font-medium text-lg ml-1">
                        {coin.pre_sale_at_format}
                      </span>
                    </div>
                    <div className="text-center sm:text-right">
                      Launch Date :
                      <span className="font-medium text-lg ml-1">
                        {coin.launched_at_format}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="mt-3 tracking-wider"
                  dangerouslySetInnerHTML={createMarkup(coin.description)}
                ></div>
              </div>

              <div className="py-2  px-5 sm:p-2 mt-2 sm:mt-0">
                {(coin.website_link && (
                  <a
                    href={coin.website_link}
                    target="_blank"
                    className="w-full block  text-center p-2 mb-2 border-white border rounded-md hover:bg-secondary-light "
                  >
                    Visit Website
                  </a>
                )) || <></>}

                {(coin.twitter_link && (
                  <a
                    href={coin.twitter_link}
                    target="_blank"
                    className="w-full block  text-center p-2 mb-2 border-white border rounded-md hover:bg-secondary-light "
                  >
                    Follow Twitter
                  </a>
                )) || <></>}

                {(coin.telegram_link && (
                  <a
                    href={coin.telegram_link}
                    target="_blank"
                    className="w-full block  text-center p-2 mb-2 border-white border rounded-md hover:bg-secondary-light "
                  >
                    Join Telegram
                  </a>
                )) || <></>}

                {(coin.discord_link && (
                  <a
                    href={coin.discord_link}
                    target="_blank"
                    className="w-full block  text-center p-2 mb-2 border-white border rounded-md hover:bg-secondary-light "
                  >
                    Join Discord
                  </a>
                )) || <></>}

                {(coin.pre_sale_link && (
                  <a
                    href={coin.pre_sale_link}
                    target="_blank"
                    className="w-full block  text-center p-2 mb-2 bg-yellow text-primary border rounded-md hover:text-yellow hover:bg-primary "
                  >
                    Presale Link
                  </a>
                )) || <></>}
              </div>
            </div>
            <div className="mt-3 flex justify-center flex-col items-center">
              {coinData.is_vote ? (
                <button className="border bg-success cursor-not-allowed text-center p-4 inline-flex gap-5 text-xl font-medium uppercase rounded-md  ">
                  <span>🚀</span> <span>Voted !</span>
                </button>
              ) : (
                <button
                  onClick={handleClickVote}
                  className="border   text-center p-4 inline-flex gap-5 text-xl font-medium uppercase rounded-md border-secondary-light hover:bg-secondary-light "
                >
                  <span>🚀</span> <span>Vote</span>
                </button>
              )}

              <div className="block text-white text-center mt-2">
                Coins can be upvoted every 1h
              </div>
            </div>
          </div>
        </div>
        {(promotedCoins.data.length > 0 && (
          <div className="mt-3">
            <PromotedCoinList coins={promotedCoins} />
          </div>
        )) || <></>}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);
  const { coinId } = context.params;

  const res = await Promise.all([
    axiosInstance.get(`/api/coin/${coinId}`),
    axiosInstance.get("/api/coin?status=promoted"),
    axiosInstance.get(`/api/page`),
  ]);
  const coin = res[0].data.data;
  const promoted_coins = res[1].data;
  const pageData = res[2].data;

  // Pass data to the page via props
  return { props: { coin, pageData, promoted_coins } };
}

export default Coin;
