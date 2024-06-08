import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function Paginate({ activePage, lastPage, setPage }) {
  
  return (
    <Pagination>
      <PaginationContent>

      {Boolean(activePage > 2) && <PaginationItem onClick={() => setPage(1)}>
          <PaginationLink className="cursor-pointer hover:bg-secondary">1</PaginationLink>
        </PaginationItem>}
      
        {Boolean(activePage > 1 && activePage !== 2) && <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>}
        
        {Boolean(activePage > 1) && <PaginationItem>
          <PaginationLink className="cursor-pointer hover:bg-secondary" onClick={() => setPage(activePage -1)}>{activePage -1}</PaginationLink>
        </PaginationItem>}

        <PaginationItem>
          <PaginationLink isActive>{activePage}</PaginationLink>
        </PaginationItem>
          
        {Boolean(activePage < lastPage) && <PaginationItem>
          <PaginationLink className="cursor-pointer hover:bg-secondary" onClick={() => setPage(activePage +1)}>{activePage +1}</PaginationLink>
        </PaginationItem>}

        {Boolean(activePage < lastPage -1) && <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>}

        {Boolean(activePage < lastPage -1) && <PaginationItem>
          <PaginationLink className="cursor-pointer hover:bg-secondary" onClick={() => setPage(lastPage)}>{lastPage}</PaginationLink>
        </PaginationItem>}

        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={() => setPage(v => v +1)} />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
}

export default Paginate;