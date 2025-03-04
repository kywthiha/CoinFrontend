import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { MenuAlt3Icon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import BannerSlider from "./banner-slider";
import Footer from "./footer";
import Link from "next/link";
import {
  classNames,
  getToken,
  handleError,
  handleInputEvent,
  removeToken,
} from "../helper";
import { useRouter } from "next/router";
import ButtonLoading from "./button-loading";
import axiosInstance from "../axios-instance";

export default function Layout({
  children,
  banners,
  server_query,
  daily_winner,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = getToken();
  const router = useRouter();
  const [logoutProcessing, setLogoutProcessing] = useState(false);
  const [form, setForm] = useState({
    search: (server_query && server_query.search) || "",
  });
  const [mobileSearchBar, setMobileSearchBar] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const asString = new URLSearchParams(formData).toString();
    router.push(`${e.target.action}?${asString}`);
    setMobileSearchBar(false);
  };

  const handleOnChange = (e) => {
    setForm(handleInputEvent(e));
  };

  const logout = async (e) => {
    setLogoutProcessing(true);
    try {
      await axiosInstance.post("/api/logout");
      removeToken();
      router.reload();
    } catch (e) {
      handleError(e);
      setLogoutProcessing(false);
    }
  };

  const navigation = [
    {
      name: "Daily Presales",
      href: "/daily-pre-sale",
      icon_text: "🎉",
      current: false,
    },
    {
      name: "All Coins",
      href: "/all-coin",
      icon: "/images/all_coin.png",
      current: false,
    },
    {
      name: "Add A Coin",
      href: "/coin/create",
      icon: "/images/coin.webp",
      current: false,
    },
    {
      name: "Promote",
      href: "/promoted-coin",
      icon: "/images/diamond.webp",
      current: false,
    },
    {
      name: "IDO News",
      href: "/posts",
      icon: "/images/fire.webp",
      current: false,
    },
    {
      name: "Tips & DYOR",
      href: "/tip-dyor",
      icon: "/images/celebration.png",
      current: false,
    },
    {
      name: "Your Profile",
      href: token ? "/protected-auth/profile" : "/auth/login",
      icon: "/images/user.png",
      current: false,
    },
  ];

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
                      <div className="">
                        {navigation.map((item) => (
                          <Link href={item.href} key={item.name}>
                            <a
                              onClick={(e) => {
                                setForm({});
                                setSidebarOpen(false);
                              }}
                              className={classNames(
                                router.pathname == item.href
                                  ? "nav-item-active"
                                  : "text-white",
                                "group flex items-center py-2 text-sm leading-6 outline-none border-none  px-2 pl-7"
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
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                  <div className="flex gap-2 justify-center text-white p-4">
                    {daily_winner ? (
                      <>
                        <div className="h-20 w-20">
                          <img
                            src="/images/cup.png"
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="mb-2 font-medium">Daily Winner</div>
                          <div className="flex gap-2">
                            <div className="h-12 w-12">
                              <img
                                src={daily_winner.logo}
                                className="w-full h-full"
                                alt="Daily Winner"
                              />
                            </div>
                            <div>
                              <div className="text-xs">{daily_winner.name}</div>
                              <div className="text-xs inline-block rounded-md bg-secondary-dark py-1 px-2 mt-1">
                                {daily_winner.symbol}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex-1 bg-secondary"></div>
                  <div className="flex-1 flex flex-col h-full gap-4 py-4 items-center">
                    <div className="flex gap-2">
                      {token ? (
                        <>
                          <button
                            disabled={logoutProcessing}
                            className="btn-primary uppercase inline-flex gap-2 justify-center items-center"
                            onClick={logout}
                          >
                            {logoutProcessing ? <ButtonLoading /> : <></>}
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href="/auth/login">
                            <a className="btn-primary uppercase">Login</a>
                          </Link>
                          <Link href="/auth/register">
                            <a className="btn-primary-outline uppercase">
                              Signup
                            </a>
                          </Link>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2  h-8 justify-center">
                      <a
                        target="_blank"
                        href={process.env.NEXT_PUBLIC_TELEGRAM_URL}
                        className=" block overflow-hidden rounded-full cursor-pointer"
                      >
                        <img
                          src="/images/telegram.png"
                          className="h-full w-full"
                        />
                      </a>
                      <a
                        target="_blank"
                        href={process.env.NEXT_PUBLIC_TWITTER_URL}
                        className="block overflow-hidden rounded-full cursor-pointer"
                      >
                        <img
                          src="/images/twitter.png"
                          className="h-full w-full"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <div className="flex w-full h-full flex-col">
          <div className="z-10 flex-shrink-0 fixed w-full flex items-center justify-between h-16 lg:h-20 bg-primary">
            <div className="h-10 w-40">
              <Link href="/">
                <img
                  src="/images/logo.png"
                  className="w-full h-full object-cover  pl-2 cursor-pointer"
                />
              </Link>
            </div>
            <div className="lg:hidden flex justify-center gap-2 items-center mr-2">
              <SearchIcon
                className="w-7 h-7 text-secondary-light"
                onClick={() => {
                  setMobileSearchBar(true);
                }}
              ></SearchIcon>
              <div
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
            </div>

            <div className="items-center gap-2 mr-2 hidden lg:flex">
              <form
                className="flex"
                action="/all-coin"
                method="GET"
                onSubmit={handleOnSubmit}
              >
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
                    onChange={handleOnChange}
                    value={form.search}
                    name="search"
                    type="search"
                  />
                </div>
              </form>
              <Link href="/coin/create">
                <a className="btn-primary-outline">Add a Coin</a>
              </Link>
              {token ? (
                <>
                  <button
                    disabled={logoutProcessing}
                    className="btn-primary uppercase inline-flex gap-2 justify-center items-center"
                    onClick={logout}
                  >
                    {logoutProcessing ? <ButtonLoading /> : <></>}
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <a className="btn-primary uppercase">Login</a>
                  </Link>
                  <Link href="/auth/register">
                    <a className="btn-primary-outline uppercase">Signup</a>
                  </Link>
                </>
              )}

              <div className="flex gap-2  h-8">
                <a
                  target="_blank"
                  href={process.env.NEXT_PUBLIC_TELEGRAM_URL}
                  className=" block overflow-hidden rounded-full cursor-pointer"
                >
                  <img src="/images/telegram.png" className="h-full w-full" />
                </a>
                <a
                  target="_blank"
                  href={process.env.NEXT_PUBLIC_TWITTER_URL}
                  className="block overflow-hidden rounded-full cursor-pointer"
                >
                  <img src="/images/twitter.png" className="h-full w-full" />
                </a>
              </div>
            </div>
          </div>
          <div className="h-full main w-full mt-16 lg:mt-20">
            <style jsx>{`
              .main {
                display: block;

                @media (min-width: 1024px) {
                  display: grid;
                  grid-template-columns: 16rem calc(100% - 16rem);
                  overflow-y: auto;
                  &::-webkit-scrollbar-track {
                    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                    border-radius: 10px;
                    background-color: #232a32;
                  }
                  &::-webkit-scrollbar {
                    width: 8px;
                    background-color: #232a32;
                  }
                  &::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                    background-color: #8d83e0;
                  }
                }
              }
            `}</style>
            {/* Static sidebar for desktop */}
            <div className="hidden fixed  lg:mt-20 lg:flex lg:w-64 lg:flex-col lg:inset-y-0 h-full bg-primary">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex flex-col bg-secondary overflow-y-auto py-2">
                <nav
                  className="flex-1 flex flex-col overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          onClick={(e) => {
                            setForm({});
                            // setSidebarOpen(false);
                          }}
                          className={classNames(
                            router.pathname == item.href
                              ? "nav-item-active"
                              : "text-white ",
                            "group flex items-center py-2 text-sm leading-6 nav-item px-2 pl-7 rounded"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {(item.icon && (
                            <img src={item.icon} className="h-4 w-4 mr-2" />
                          )) || <span className="mr-2">{item.icon_text}</span>}

                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="flex gap-2 justify-center text-white p-4">
                {daily_winner ? (
                  <>
                    <div className="h-20 w-20">
                      <img src="/images/cup.png" className="w-full h-full" />
                    </div>
                    <div>
                      <div className="mb-2 font-medium">Daily Winner</div>
                      <div className="flex gap-2">
                        <div className="h-12 w-12">
                          <img
                            src={daily_winner.logo}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs">{daily_winner.name}</div>
                          <div className="text-xs inline-block rounded-md bg-secondary-dark py-1 px-2 mt-1">
                            {daily_winner.symbol}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex-1 bg-secondary"></div>
              <div className="flex-1"></div>
            </div>
            <div className="hidden lg:block"></div>
            <main className="h-full w-full">
              {mobileSearchBar ? (
                <>
                  <div className="fixed lg:hidden top-0 w-full h-full z-30 bg-overlay">
                    <div
                      className="fixed w-full h-full "
                      onClick={() => {
                        setMobileSearchBar(false);
                      }}
                    ></div>
                    <div className="px-2 py-4 mx-2">
                      <form
                        className="flex w-full"
                        action="/all-coin"
                        onSubmit={handleOnSubmit}
                        method="GET"
                      >
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
                            name="search"
                            onChange={handleOnChange}
                            value={form.search}
                            className=" rounded-full h-full w-full pl-8 pr-3 py-2 bg-primary-dark text-white placeholder-secondary-light focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                            placeholder="Search"
                            type="search"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="w-full">
                {banners && banners.length ? (
                  <BannerSlider banners={banners} />
                ) : (
                  <></>
                )}
                {children}
                <Footer year={new Date().getFullYear()} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
