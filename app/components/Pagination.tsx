"use client";
import {
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as UIPagination,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  console.log(currentPage);
  const searchParams = useSearchParams();

  const pageHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return "/issues/?" + params.toString();
  };

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <UIPagination className="mt-1">
      <PaginationContent>
        <PaginationPrevious href={pageHref(currentPage - 1 || 1)} />
        {Array.from({ length: pageCount }, (_, index) => (
          <PaginationLink
            key={index}
            href={pageHref(index + 1)}
            isActive={index + 1 == currentPage}
          >
            {index + 1}
          </PaginationLink>
        ))}

        <PaginationNext
          href={pageHref(
            currentPage + 1 > pageCount ? pageCount : currentPage + 1
          )}
        />
      </PaginationContent>
    </UIPagination>
  );
};

export default Pagination;
