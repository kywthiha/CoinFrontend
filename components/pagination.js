import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { paginationRange } from "../helper";

export default function Pagination({ meta, href }) {
  if (meta.last_page > 1)
    return (
      <nav className=" border-gray-200 px-4 text-secondary-light flex items-center justify-between sm:px-0">
        <div className="-mt-px w-0 flex-1 flex">
          {meta.previous_page_url ? (
            <Link
              href={{
                pathname: href.pathname,
                query: { ...href.query, page: meta.current_page - 1 },
              }}
            >
              <a className="border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                <ArrowNarrowLeftIcon
                  className="mr-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Previous
              </a>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="hidden md:-mt-px md:flex pagination-items">
          {paginationRange({
            totalPageCount: meta.last_page,
            currentPage: meta.current_page,
            siblingCount: 2,
          }).map((page,index) =>
            page === "..." ? (
              <a
                className="  pt-4  px-4 inline-flex items-center text-sm font-medium"
                aria-current="page"
                key={`${page}-${index}`}
              >
                {page}
              </a>
            ) : meta.current_page === page ? (
              <a
                key={page}
                className=" text-yellow  active pt-4  px-4 inline-flex items-center text-sm font-medium"
                aria-current="page"
              >
                {page}
              </a>
            ) : (
              <Link
                key={page}
                href={{
                  pathname: href.pathname,
                  query: { ...href.query, page: page },
                }}
              >
                <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300  pt-4 px-4 inline-flex items-center text-sm font-medium">
                  {page}
                </a>
              </Link>
            )
          )}
        </div>
        <div className="-mt-px w-0 flex-1 flex justify-end">
          {meta.has_more_pages ? (
            <Link
              href={{
                pathname: href.pathname,
                query: { ...href.query, page: meta.current_page + 1 },
              }}
            >
              <a className=" border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Next
                <ArrowNarrowRightIcon
                  className="ml-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </a>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </nav>
    );
  return <></>;
}
