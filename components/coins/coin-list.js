import CoinItem from "./coin-item";

export default function CoinList({ coins, meta }) {
  return (
    <div className="">
      <div className="coin-item-header text-white bg-primary border-b border-white px-2 rounded-t-lg items-center">
        <style jsx>{`
          .coin-item-header {
            display: grid;
            gap: 2;
            grid-template-columns: 50% 20% 30%;

            @media (min-width: 640px) {
              grid-template-columns: 3% 25% 15% 15% 15% 10% 17%;
            }
          }
        `}</style>
        <div className="font-medium hidden sm:flex gap-2 uppercase items-center py-3  justify-center">
          S/N
        </div>
        <div className="font-medium flex gap-2 items-center py-3 justify-start">
          <img
            src="https://coinmooner.com/icon/diamond.png"
            className="w-4 h-4"
          />
          Project
        </div>
        <div className="font-medium hidden sm:flex gap-2 items-center py-3  justify-center">
          Symbol
        </div>
        <div className="font-medium flex gap-2 items-center py-3 justify-center">
          Launch
        </div>
        <div className="font-medium hidden sm:flex gap-2 items-center py-3  justify-center">
          Vote2Win
        </div>
        <div className="font-medium sm:flex gap-2 items-center py-3  justify-center hidden">
          Whitelist
        </div>
        <div className="font-medium flex gap-2 items-center py-3  justify-center">
          Upvotes
        </div>
      </div>
      <div className="divide-y divide-secondary-light ">
        {coins.map((coin, index) => (
          <CoinItem
            coin={coin}
            index={meta ? index + meta.first_item : index + 1}
            key={coin.id}
          />
        ))}
      </div>
    </div>
  );
}
