export default function Coincoin({ coin, index }) {
  return (
    <>
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
          {index + 1}
        </div>
        <div className="flex gap-2 coins-center py-2 items-center">
          <img src={`https://cntoken.io${coin.image}`} className="h-10 w-10" />
          <div>
            <div className="text-xs sm:text-base font-medium">{coin.name}</div>
            <div>
              <span className="text-xs rounded-full px-2 bg-secondary-light">
                {coin.chain.name}
              </span>
              <span className="text-xs bg-secondary-light rounded-full ml-2 px-2">
                {coin.chain.name}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden text-xs sm:text-base sm:flex gap-2 coins-center py-2  justify-center items-center">
          {coin.symbol}
        </div>
        <div className="flex text-xs sm:text-base gap-2 coins-center py-2  justify-center items-center">
          {coin.launch_time}
        </div>
        <div className="hidden text-xs sm:text-base sm:flex gap-2 coins-center py-2  justify-center items-center">
          Vote2Win
        </div>
        <div className="hidden text-xs sm:text-base sm:flex gap-2 coins-center py-2  justify-center items-center">
          Whitelist
        </div>
        <div className="text-xs sm:text-base flex gap-2 coins-center py-2  justify-center items-center ">
          <button className="border w-24 text-center px-2 border-secondary-light rounded-md hover:bg-secondary-light py-2">
            🚀 {coin.upvote}
          </button>
        </div>
      </div>
    </>
  );
}
