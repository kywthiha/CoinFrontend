import {classNames} from "../../helper";
import CoinList from "./coin-list";

const tabs = [
  {
    name: "Promoted Coin",
    href: "#",
    image: "/images/diamond.webp",
    current: true,
  },
];

export default function PromotedCoinList({ coins }) {
  return (
    <>
      <div className="m-1 sm:m-4">
        <div className="flex justify-between mb-3 mx-2 sm:mx-0">
          <div className="block">
            <nav className="flex flex-wrap gap-2" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? "bg-tag-active"
                      : "bg-tag",
                    "px-3 py-2 font-medium text-white text-sm rounded-md inline-flex items-center gap-2 "
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.image ? (
                    <img src={tab.image} className="w-4 h-4" />
                  ) : (
                    <></>
                  )}
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="hidden lg:block text-white text-center mt-2">
            Coins can be upvoted every 1h
          </div>
        </div>
        <CoinList coins={coins.data} />
        <div className="block lg:hidden text-xs text-white text-center mt-2">
          Coins can be upvoted every 1h
        </div>
      </div>
    </>
  );
}
