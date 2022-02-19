import { ArrowLeftIcon, PencilAltIcon } from "@heroicons/react/outline";
import Link from "next/link";
import axiosInstanceSSR from "../../axios-instance-ssr";
import Layout from "../../components/layout";
import { createMarkup, numberFormat } from "../../helper";

const Profile = ({ user }) => {
  return (
    <Layout>
      <div className="p-4 m-1 sm:m-4 text-white">
        <Link href="/">
          <div className="cursor-pointer mb-2 flex justify-start gap-2 items-center">
            <ArrowLeftIcon className="w-4 h-4" />
            Back To Main
          </div>
        </Link>
        <div className="relative text-white shadow-primary border border-secondary  rounded-lg p-4 shadow-lg">
          <Link href="/protected-auth/profile-edit">
            <PencilAltIcon className="w-5 h-5 text-secondary-light cursor-pointer right-1 top-1 absolute" />
          </Link>
          <div className="w-full  pb-2 border-b border-secondary-light">
            <div className="text-lg mb-4 text-center">Your Profile</div>
            <div className="flex justify-center">
              <div className="overflow-hidden shadow-md shadow-secondary w-20 h-20 rounded-full bg-secondary-light items-center">
                <img src="/images/user.png" className="w-full h-full" />
              </div>
            </div>
            <h1 className="mt-1 text-lg text-center">{user.name}</h1>
            <h1 className="mt-1 sm:text-xs text-center">{user.email}</h1>
            <div className="flex justify-center mt-2">
              <div className="bg-primary-dark border border-primary p-2 gap-2 rounded-md shadow-sm flex justify-center items-center">
                <div>Votes</div>
                <div className="font-medium">
                  {numberFormat(user.customer_coin_votes_count) || "N/A"}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 mb-2">ERC20(or)BEP20 Address</div>
          <div  className="whitespace-pre-line tracking-wide">{user.address}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);

  const res = await Promise.all([axiosInstance.get("/api/profile")]);
  const user = res[0].data.data;

  // Pass data to the page via props
  return { props: { user } };
}
