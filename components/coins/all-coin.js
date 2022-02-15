import { ChevronDownIcon } from "@heroicons/react/outline";
import classNames from "../../helper";
import CoinList from "./coin-list";

const tabs = [
  {
    name: "Today's Best",
    href: "#",
    icon_text: "🔥",
    current: true,
  },
  {
    name: "Daily Presale 4U",
    href: "#",
    current: false,
    icon_text: "🎉",
  },
  {
    name: "All Time Best",
    href: "#",
    icon_text: "🥇",
    current: false,
  },
  {
    name: "New Coins",
    href: "#",
    icon_text: "💙",
    current: false,
  },
];

export default function AllCoin({ coins }) {
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
                      ? "bg-secondary-light"
                      : "bg-primary hover:bg-secondary",
                    "px-3 py-2 font-medium text-white text-sm rounded-md inline-flex items-center gap-2 "
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.image ? (
                    <img src={tab.image} className="w-4 h-4" />
                  ) : tab.icon_text ? (
                    <div>{tab.icon_text}</div>
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
        <CoinList coins={coins} />
        <div className="text-secondary-light flex justify-center items-center gap-2 bg-primary py-2 cursor-pointer">
          <ChevronDownIcon className="h-4 w-4" /> Show More
        </div>
        <div className="block lg:hidden text-xs text-white text-center mt-2">
          Coins can be upvoted every 1h
        </div>
      </div>
    </>
  );
}
