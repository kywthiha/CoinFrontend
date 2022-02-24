import { useEffect } from "react";
import axiosInstanceSSR from "../../axios-instance-ssr";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import { PostItem } from "../../components/posts/post-item";

const PostIndex = ({ pageData, posts, server_query }) => {
  return (
    <Layout banners={pageData.banners} daily_winner={pageData.daily_winner}>
      <div className="m-1 sm:m-4 text-white">
        <h1 className="text-3xl font-medium mb-3 mx-2 sm:mx-0 flex gap-2 items-center">
          <img src="/images/fire.webp" className="w-5 h-5" />
          IDO News
        </h1>
        <div className=" block w-full overflow-hidden text-white bg-primary  rounded-md p-4 shadow-sm">
          <div className="divide-y divide-secondary-light">
            {posts.data.map((post) => (
              <PostItem post={post} key={post.id} />
            ))}
          </div>
        </div>
        <div>
          <Pagination
            meta={posts.meta}
            href={{
              pathname: "/posts",
              query: server_query,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);
  const res = await Promise.all([
    axiosInstance.get(`/api/page`),
    axiosInstance.get(
      `/api/post?${new URLSearchParams(context.query).toString()}`
    ),
  ]);
  const pageData = res[0].data;
  const posts = res[1].data;

  // Pass data to the page via props
  return { props: { pageData, posts, server_query: context.query } };
}

export default PostIndex;
