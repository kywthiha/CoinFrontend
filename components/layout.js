import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  MenuAlt3Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from "@heroicons/react/solid";

const banners = [
  {
    img: "https://cdn.coinmooner.com/mooners/BullrunR.gif",
    href: "https://t.me/BullRunDev",
  },
  {
    img: "https://cdn.coinmooner.com/mooners/ValentineFlokiR.gif",
    href: "https://t.me/BullRunDev",
  },
  {
    img: "https://cdn.coinmooner.com/mooners/crazybeer.gif",
    href: "https://t.me/BullRunDev",
  },
  {
    img: "https://cdn.coinmooner.com/mooners/killbunnyR.gif",
    href: "https://t.me/BullRunDev",
  },
];
const navigation = [
  {
    name: "Daily Presales",
    href: "#",
    icon_text: "🎉",
    current: true,
  },
  {
    name: "All Coins",
    href: "#",
    icon: "https://coinmooner.com/icon/coin.png",
    current: false,
  },
  {
    name: "Add A Coin",
    href: "#",
    icon: "https://coinmooner.com/icon/coin.png",
    current: false,
  },
  {
    name: "Promote",
    href: "#",
    icon: "https://coinmooner.com/icon/diamond.png",
    current: false,
  },
  {
    name: "IDO News",
    href: "#",
    icon: "https://coinmooner.com/icon/fire.png",
    current: false,
  },
  {
    name: "Tips & DYOR",
    href: "#",
    icon: "https://coinmooner.com/icon/celebration.png",
    current: false,
  },
  {
    name: "Your Profile",
    href: "#",
    icon: "https://coinmooner.com/icon/coin.png",
    current: false,
  },
];
const secondaryNavigation = [
  { name: "Settings", href: "#", icon: CogIcon },
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];
const cards = [
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  // More items...
];
const transactions = [
  {
    id: 1,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "success",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More transactions...
];
const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 justify-end  lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="-translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative flex-1 h-full mt-16 flex flex-col max-w-xs w-full ">
                <div
                  aria-label="Sidebar"
                  className="h-full bg-primary flex flex-col"
                >
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex flex-col bg-secondary overflow-y-auto py-2">
                    <nav
                      className="flex-1 flex flex-col overflow-y-auto"
                      aria-label="Sidebar"
                    >
                      <div className="px-2 pl-7">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-white hover:text-primary-dark ",
                              "group flex items-center py-2 text-sm leading-6 outline-none border-none"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {(item.icon && (
                              <img src={item.icon} className="h-4 w-4 mr-2" />
                            )) || (
                              <span className="mr-2">{item.icon_text}</span>
                            )}

                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                  <div className="flex gap-2 justify-center text-white p-4">
                    <div className="h-20">
                      <img
                        src="https://coinmooner.com/icon/cup.png"
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="mb-2 font-medium">Daily Winner</div>
                      <div className="flex gap-2">
                        <div className="h-12">
                          <img
                            src="https://coinmooner.com/logo/12149.webp?v=1"
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="text-xs">Big Coin</div>
                          <div className="text-xs rounded-md bg-secondary-dark py-1 px-2 mt-1">
                            $BG
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-secondary"></div>
                  <div className="flex-1 flex flex-col h-full gap-4 py-4 items-center">
                    <div className="flex gap-2">
                      <a className="btn-primary uppercase">Login</a>
                      <a className="btn-primary-outline uppercase">Signup</a>
                    </div>
                    <div className="flex gap-2  h-8 justify-center">
                      <div className="overflow-hidden rounded-full">
                        <img
                          src="https://i.ibb.co/yythqDn/twitter.png"
                          className="h-full w-full"
                        />
                      </div>
                      <div className="overflow-hidden rounded-full">
                        <img
                          src="https://i.ibb.co/yythqDn/twitter.png"
                          className="h-full w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <div className="flex w-full h-full flex-col">
          <div className="z-10 flex-shrink-0 fixed w-full flex items-center justify-between h-16 lg:h-20 bg-primary">
            <div className="h-10">
              <img
                src="https://coinmooner.com/logo-moon.svg"
                className="w-full h-full  pl-2"
              />
            </div>
            <div
              className="lg:hidden flex justify-center items-center mr-2"
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
              }}
            >
              {sidebarOpen ? (
                <XIcon className="text-secondary-light h-10 w-10" />
              ) : (
                <MenuAlt3Icon className="text-secondary-light h-10 w-10" />
              )}
            </div>
            <div className="items-center gap-2 mr-2 hidden lg:flex">
              <form className="flex" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div
                    className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                    aria-hidden="true"
                  >
                    <SearchIcon
                      className="h-5 w-5 ml-2 text-secondary-light"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    className=" rounded-full h-full pl-8 pr-3 py-2 bg-primary-dark text-white placeholder-secondary-light focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </form>
              <a className="btn-primary-outline">Add a Coin</a>
              <a className="btn-primary uppercase">Login</a>
              <a className="btn-primary-outline uppercase">Signup</a>
              <div className="flex gap-2  h-8">
                <div className="overflow-hidden rounded-full">
                  <img
                    src="https://i.ibb.co/yythqDn/twitter.png"
                    className="h-full w-full"
                  />
                </div>
                <div className="overflow-hidden rounded-full">
                  <img
                    src="https://i.ibb.co/yythqDn/twitter.png"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-full main w-full mt-16 lg:mt-20">
            {/* Static sidebar for desktop */}
            <div className="hidden fixed  lg:mt-20 lg:flex lg:w-64 lg:flex-col lg:inset-y-0 h-full bg-primary">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex flex-col bg-secondary overflow-y-auto py-2">
                <nav
                  className="flex-1 flex flex-col overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="px-2 pl-7">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-cyan-800 text-white"
                            : "text-white hover:text-primary-dark",
                          "group flex items-center py-2 text-sm leading-6"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {(item.icon && (
                          <img src={item.icon} className="h-4 w-4 mr-2" />
                        )) || <span className="mr-2">{item.icon_text}</span>}

                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="flex gap-2 justify-center text-white p-4">
                <div className="h-20">
                  <img
                    src="https://coinmooner.com/icon/cup.png"
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <div className="mb-2 font-medium">Daily Winner</div>
                  <div className="flex gap-2">
                    <div className="h-12">
                      <img
                        src="https://coinmooner.com/logo/12149.webp?v=1"
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="text-xs">Big Coin</div>
                      <div className="text-xs rounded-md bg-secondary-dark py-1 px-2 mt-1">
                        $BG
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-secondary"></div>
              <div className="flex-1"></div>
            </div>
            <div className="hidden lg:block"></div>
            <main className="h-full w-full">
              <div className="lg:hidden flex w-full px-2 py-4 bg-secondary">
                <form className="flex w-full" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                      aria-hidden="true"
                    >
                      <SearchIcon
                        className="h-5 w-5 ml-2 text-secondary-light"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      className=" rounded-full h-full w-full pl-8 pr-3 py-2 bg-primary-dark text-white placeholder-secondary-light focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </form>
              </div>

              <div className="h-full w-full">
              <div className="swiper-container">
                  <Swiper
                    loop={true}
                    autoplay={true}
                    spaceBetween={50}
                    slidesPerView={3}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    breakpoints={{
                      // when window width is >= 640px
                      640: {
                        slidesPerView: 1,
                      },
                      0: {
                        slidesPerView: 1,
                      },
                      // when window width is >= 768px
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                  >
                    {banners.map((item) => (
                      <SwiperSlide>
                        <a
                          href={item.href}
                          target="_blank"
                          className="block w-full h-full"
                        >
                          <img src={item.img} />
                        </a>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
