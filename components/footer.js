export default function Footer({ year }) {
  return (
    <>
      <div className="flex items-center flex-col text-white pt-6 lg:pb-6 pb-2 gap-2">
        <div className="flex gap-2 items-center">
          <img src="/images/logo.png" className="w-40 h-20 object-cover" />
          <div className="overflow-hidden rounded-full h-8">
            <img
              src="https://i.ibb.co/yythqDn/twitter.png"
              className="h-full w-full"
            />
          </div>
          <div className="overflow-hidden rounded-full h-8">
            <img
              src="https://i.ibb.co/yythqDn/twitter.png"
              className="h-full w-full"
            />
          </div>
        </div>

        <div>CoinCC@{year}</div>
      </div>
    </>
  );
}
