import Cookies from "js-cookie";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function isSSR() {
  return typeof window === "undefined";
}

export function getToken() {
  return Cookies.get("token");
}

export function setToken(token) {
  return Cookies.set("token", token);
}

export function removeToken() {
  return Cookies.remove("token");
}

export function getAnonymousToken() {
  return Cookies.get("anonymous_token");
}

export function setAnonymousToken(token) {
  return Cookies.set("anonymous_token", token);
}

export function cookieWrite(value) {
  return encodeURIComponent(value).replace(
    /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
    decodeURIComponent
  );
}

export function handleError(error) {
  // alert("Error");
  console.log(JSON.stringify(error, null, 2));
}

export function createMarkup(element) {
  return { __html: element };
}

export function handleInputEvent(e) {
  if (e.target.type == "checkbox") {
    return { [e.target.name]: e.target.checked };
  } else {
    return { [e.target.name]: e.target.value };
  }
}

export function numberFormat(number) {
  if (number) {
    return Number(number).toLocaleString("en-US", {});
  }
  return number;
}

export function range(start, end) {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export function paginationRange({
  totalPageCount,
  siblingCount = 1,
  currentPage,
}) {
  const DOTS = '...';
  // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
  const totalPageNumbers = siblingCount + 5;

  /*
    Case 1:
    If the number of pages is less than the page numbers we want to show in our
    paginationComponent, we return the range [1..totalPageCount]
  */
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  /*
    Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
  */
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount
  );

  /*
    We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
  */
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  /*
    Case 2: No left dots to show, but rights dots to be shown
  */
  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }

  /*
    Case 3: No right dots to show, but left dots to be shown
  */
  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  /*
    Case 4: Both left and right dots to be shown
  */
  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
}
