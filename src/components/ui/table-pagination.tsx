import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: TablePaginationProps) {
  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  if (totalItems === 0) return null;

  return (
    <div className="flex items-center justify-between px-4 py-4 border-t bg-card relative z-30 shrink-0">
      <div className="text-sm text-muted-foreground">
        Hiển thị{" "}
        <strong>
          {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </strong>{" "}
        trong số <strong>{totalItems}</strong> kết quả
      </div>
      {totalPages > 1 && (
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) =>
                  currentPage > 1 && handlePageChange(e, currentPage - 1)
                }
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => handlePageChange(e, page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) =>
                  currentPage < totalPages &&
                  handlePageChange(e, currentPage + 1)
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
