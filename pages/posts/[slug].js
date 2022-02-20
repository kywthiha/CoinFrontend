import { ArrowUpIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useEffect } from "react";
import axiosInstanceSSR from "../../axios-instance-ssr";
import Layout from "../../components/layout";
import { PostItem } from "../../components/posts/post-item";
import { createMarkup } from "../../helper";

const PostShow = ({ pageData, post, posts }) => {
  return (
    <Layout banners={pageData.banners}>
      <div className="m-1 sm:m-4 text-white">
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-3">
          <div className="col-span-1 sm:col-span-3">
            <h1 className="lg:text-3xl text-3xl text-secondary-light font-semibold mb-3 mx-2 sm:mx-0 flex gap-2 items-center">
              <img
                src="/images/hexagon.webp"
                className="w-5 h-5 hidden sm:block"
              />
              {post.title}
            </h1>
            <div className=" mx-2 sm:mx-0">{post.description}</div>
            <div
              className="prose max-w-full prose-white mx-2 sm:mx-0"
              dangerouslySetInnerHTML={createMarkup(post.content)}
            ></div>
          </div>
          <div className="col-span-1 m-2 sm:m-0">
            <div className="text-xl font-medium mb-2 text-secondary-light">
              Latest News
            </div>
            <div className="">
              <div className="">
                {posts.map((post) => (
                  <Link href={`/posts/${post.slug}`} key={post.id}>
                    <div className="cursor-pointer border-b border-secondary-light flex justify-between items-center">
                      <div className="text-secondary-light text-xl py-4 font-medium">
                        {post.title}
                      </div>
                      <div>
                        <img
                          src="/images/diagonalarrow.svg"
                          className="w-6 h-6"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API

  const axiosInstance = axiosInstanceSSR(context);
  const { slug } = context.params;

  const res = await Promise.all([
    axiosInstance.get(`/api/post/${slug}`),
    axiosInstance.get(`/api/page`),
  ]);
  const post = res[0].data.data;
  const pageData = res[1].data;

  // Pass data to the page via props
  return { props: { pageData, post, posts: res[0].data.posts } };
}

export default PostShow;
