import Link from "next/link";

export function PostItem({ post }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 py-4">
        <Link href={`/posts/${post.slug}`}>
          <img
            src={post.cover}
            className="w-full h-auto object-cover sm:h-52 sm:w-80 rounded-lg  cursor-pointer"
          />
        </Link>
        <div className="flex flex-col justify-between flex-1">
          <div className="mb-2">
            <Link href={`/posts/${post.slug}`}>
              <div className="text-xl font-medium mb-2 cursor-pointer">
                {post.title}
              </div>
            </Link>
            <div> {post.description}</div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="text-secondary-light">{post.created_at_format}</div>
            <Link href={`/posts/${post.slug}`}>
              <a className="text-secondary-light underline">Read more</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
