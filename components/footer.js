import Link from "next/link";

export default function Footer({ year }) {
  return (
    <>
      <div className="flex items-center flex-col text-white pt-6 lg:pb-6 pb-2 gap-2">
        <div className="flex gap-2 items-center">
          <Link href="/">
            <img src="/images/logo.png" className="w-40 h-20 object-cover cursor-pointer" />
          </Link>
          <a
            target="_blank"
            href={process.env.NEXT_PUBLIC_TELEGRAM_URL}
            className=" block overflow-hidden rounded-full cursor-pointer h-8"
          >
            <img src="/images/telegram.png" className="h-full w-full" />
          </a>
          <a
            target="_blank"
            href={process.env.NEXT_PUBLIC_TWITTER_URL}
            className="block overflow-hidden rounded-full cursor-pointer h-8"
          >
            <img src="/images/twitter.png" className="h-full w-full" />
          </a>
        </div>

        <div>CoinCC@{year}</div>
      </div>
    </>
  );
}
