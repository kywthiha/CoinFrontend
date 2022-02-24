import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/layout";
import { handleError, handleInputEvent } from "../../helper";
import GeneralError from "../../components/general-error";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import DateTimeTextField from "../../components/date-time-text-field";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ButtonLoading from "../../components/button-loading";
import axiosInstanceSSR from "../../axios-instance-ssr";
import axiosInstance from "../../axios-instance";

const CoinCreate = ({ chains, pageData }) => {
  const [error, setError] = useState(null);
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();
  const [coin, setCoin] = useState({});
  const [whitelistOrPublic, setWhiteListOrPublic] = useState("whitelist");

  const handleOnChange = (e) => {
    setCoin({
      ...coin,
      ...handleInputEvent(e),
    });
  };

  const handleOnCheckBox = (e) => {
    if (e.target.checked) {
      setWhiteListOrPublic(e.target.value);
    }
  };

  const handleOnChangeDateTimePicker = (key) => (value) => {
    setCoin({ ...coin, [key]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setFormProcessing(true);
    setError(null);
    try {
      const formData = new FormData(e.target);
      if (formData.get("is_vote_win_feature") == "on") {
        formData.append("is_vote_win_feature", 1);
      } else {
        formData.append("is_vote_win_feature", 0);
      }
      const res = await axiosInstance.post("/api/coin", formData);
      router.push("/");
    } catch (e) {
      handleError(e);
      setError(e);
      setFormProcessing(false);
    }
  };

  return (
    <Layout daily_winner={pageData.daily_winner}>
      <div className="p-4  h-full">
        <Link href="/">
          <div className="cursor-pointer mb-2 flex justify-start gap-2 items-center text-white">
            <ArrowLeftIcon className="w-4 h-4" />
            Back To Main
          </div>
        </Link>
        <form
          onSubmit={handleOnSubmit}
          className="block w-full overflow-hidden text-white shadow-primary border border-secondary  rounded-lg p-4 shadow-lg"
        >
          <GeneralError error={error} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <div className="col-span-1">
              <div className="text-lg font-medium">Coin Info</div>
              <div className="mb-2 mt-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Coin Name
                  <span className="text-red ml-2 text-xs">(Required)</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    placeholder="Enter coin name"
                    className="input-primary"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="symbol"
                  className="block text-sm font-medium text-gray-700"
                >
                  Symbol
                  <span className="text-red ml-2 text-xs">(Required)</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    name="symbol"
                    id="symbol"
                    autoComplete="symbol"
                    placeholder="Enter symbol"
                    className="input-primary"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                  <span className="text-red ml-2 text-xs">(Required)</span>
                </label>
                <div className="mt-1">
                  <textarea
                    required
                    type="text"
                    name="description"
                    id="description"
                    autoComplete="description"
                    placeholder="Enter Description"
                    className="input-primary scrollbar-primary"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="chain_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Chain
                  <span className="text-red ml-2 text-xs">(Required)</span>
                </label>
                <div className="mt-1">
                  <select
                    required
                    id="chain_id"
                    name="chain_id"
                    autoComplete="chain_id"
                    defaultValue=""
                    className="input-primary"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {chains.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="pre_sale_at"
                  className="block text-sm font-medium text-gray-700"
                >
                  Presale At
                  <span className="text-red ml-2 text-xs">(Required)</span>
                </label>
                <div className="mt-1">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      onChange={handleOnChangeDateTimePicker("pre_sale_at")}
                      value={coin.pre_sale_at || ""}
                      renderInput={(props) => (
                        <DateTimeTextField
                          {...props}
                          fullWidth
                          required
                          autoComplete="pre_sale_at"
                          name="pre_sale_at"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="pre_sale_link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Presale Link
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="pre_sale_link"
                    id="pre_sale_link"
                    autoComplete="pre_sale_link"
                    placeholder="Enter presale link"
                    className="input-primary"
                  />
                </div>
              </div>
              <div className="mb-2">
                <div className="flex gap-2 items-center mb-1">
                  <label className="cursor-pointer ">
                    <input
                      onChange={handleOnCheckBox}
                      checked={whitelistOrPublic == "whitelist"}
                      type="radio"
                      name="whitelist_or_public"
                      value="whitelist"
                      className="mr-2 focus:ring-0 focus:border-secondary-light focus:outline-none shadow-sm sm:text-sm    text-secondary-light   bg-primary-dark"
                    />
                    Whitelist Link
                  </label>
                  <label className="cursor-pointer">
                    <input
                      onChange={handleOnCheckBox}
                      checked={whitelistOrPublic == "public"}
                      type="radio"
                      name="whitelist_or_public"
                      value="public"
                      className="mr-2 focus:ring-0 focus:border-secondary-light shadow-sm sm:text-sm border-secondary-light bg-primary-dark"
                    />
                    Public Link
                  </label>
                </div>
                {whitelistOrPublic && whitelistOrPublic == "public" ? (
                  <input
                    type="url"
                    name="public_link"
                    id="public_link"
                    autoComplete="public_link"
                    className="input-primary"
                  />
                ) : (
                  <input
                    type="url"
                    name="whitelist_link"
                    id="whitelist_link"
                    autoComplete="whitelist_link"
                    className="input-primary"
                  />
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="launched_at"
                  className="block text-sm font-medium text-gray-700"
                >
                  Launched At
                  <span className="text-red ml-2 text-xs">(Required)</span>
                </label>
                <div className="mt-1">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      onChange={handleOnChangeDateTimePicker("launched_at")}
                      value={coin.launched_at || ""}
                      renderInput={(props) => (
                        <DateTimeTextField
                          required
                          {...props}
                          fullWidth
                          autoComplete="launched_at"
                          name="launched_at"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="launch_platform"
                  className="block text-sm font-medium text-gray-700"
                >
                  Launch Platform
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="launch_platform"
                    id="launch_platform"
                    autoComplete="launch_platform"
                    placeholder="Enter Launch Platform"
                    className="input-primary"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-lg font-medium">Links</div>
              <div className="mb-2 mt-3">
                <label
                  htmlFor="website_link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website Link
                  <span className="text-red ml-2 text-xs">(Required)</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="url"
                    name="website_link"
                    id="website_link"
                    className="input-primary"
                    placeholder="Enter your website link"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="telegram_link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Telegram Link
                  <span className="text-red ml-2 text-xs">(Required)</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="url"
                    name="telegram_link"
                    id="telegram_link"
                    className="input-primary"
                    placeholder="Enter your telegram link"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="twitter_link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Twitter Link
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="twitter_link"
                    id="twitter_link"
                    className="input-primary"
                    placeholder="Enter your twitter link"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="discord_link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discord Link
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="discord_link"
                    id="discord_link"
                    className="input-primary"
                    placeholder="Enter your discord link"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="reddit_link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reddit Link
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="reddit_link"
                    id="reddit_link"
                    className="input-primary"
                    placeholder="Enter your reddit link"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="logo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Logo
                  <span className="text-red ml-2 text-xs">(Required)</span>
                  <span className="text-secondary-light ml-2 text-xs ">
                    (1:1)
                  </span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    accept="image/*"
                    type="file"
                    name="logo"
                    id="logo"
                    className="input-primary border border-primary-100 cursor-pointer"
                    placeholder="Enter your logo"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="kyc_link"
                  className="block text-sm font-medium text-gray-700"
                >
                  KYC Link
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="kyc_link"
                    id="kyc_link"
                    className="input-primary"
                    placeholder="Enter your kyc link"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="audit_link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Audit Link
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="audit_link"
                    id="audit_link"
                    className="input-primary"
                    placeholder="Enter your audit link"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="mb-1 font-medium">
                Do you want vote to win feature?
                <br />
                <span className="text-cyan-700 text-xs">
                  (giving away randomly your wl spots or busd giveaways to the
                  users who voted no charges for now)
                </span>
              </div>
              <div className="flex mb-2 gap-2 items-center">
                <input
                  type="checkbox"
                  name="is_vote_win_feature"
                  id="is_vote_win_feature"
                  autoComplete="is_vote_win_feature"
                  className="focus:ring-secondary-light focus:border-secondary-light  shadow-sm sm:text-sm border-primary-100 rounded-md text-secondary-light"
                />
                <label
                  htmlFor="is_vote_win_feature"
                  className="text-sm font-medium cursor-pointer"
                >
                  Win Feature
                </label>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="additional_information"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Information, other links and addresses
                </label>
                <div className="mt-1">
                  <textarea
                    name="additional_information"
                    id="additional_information"
                    className="input-primary"
                    placeholder="Enter additional information"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="text-lg font-medium mt-4"> Contact Info</div>
              <div className="text-xs">
                For later changes to coin info, please provide the following
              </div>
              <div className="mb-2 mt-3">
                <label
                  htmlFor="contact_email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Email
                  <span className="text-red ml-2 text-xs">(Required)</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="email"
                    name="contact_email"
                    id="contact_email"
                    className="input-primary"
                    placeholder="Enter your contact email"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="contact_telegram"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Telegram
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="contact_telegram"
                    id="contact_telegram"
                    className="input-primary"
                    placeholder="Enter your contact telegram"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className={`btn-primary w-full sm:w-auto   inline-flex  justify-center items-center gap-2 text-lg font-medium ${
                formProcessing ? "opacity-50" : ""
              }`}
            >
              {formProcessing ? <ButtonLoading /> : <></>}
              Add Coin
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance_ssr = axiosInstanceSSR(context);

  const res = await Promise.all([
    axiosInstance_ssr.get(`/api/coin-chains`),
    axiosInstance.get(`/api/page`),
  ]);
  const chains = res[0].data.data;
  const pageData = res[1].data;

  // Pass data to the page via props
  return { props: { chains, pageData } };
}

export default CoinCreate;
