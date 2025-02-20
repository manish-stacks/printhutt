
import { RiArrowDropLeftLine, RiArrowDropRightLine, RiSkipLeftLine, RiSkipRightLine } from 'react-icons/ri';
import type { PaginationData } from '@/lib/types';
import React from 'react';

interface PaginationProps {
    pagination: PaginationData;
    onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
    const getVisiblePages = () => {
        const currentPage = pagination.page;
        const totalPages = pagination.pages;

        if (window.innerWidth < 640) { // Mobile screens
            if (currentPage <= 2) return [1, 2];
            if (currentPage >= totalPages - 1) return [totalPages - 1, totalPages];
            return [currentPage - 1, currentPage];
        } else { // Desktop screens
            let pages = [];
            if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
                if (currentPage <= 3) {
                    pages = [1, 2, 3, 4, '...', totalPages];
                } else if (currentPage >= totalPages - 2) {
                    pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                }
            }
            return pages;
        }
    };
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center mt-6 px-4">
        <div className="text-sm text-gray-600 hidden sm:block">
          <span>Total: {pagination.total}</span>
          <span className="ml-4">Page {pagination.page} of {pagination.pages}</span>
        </div>
  
        <div className="flex items-center gap-2">
          {/* First Page */}
          <button
            onClick={() => onPageChange(1)}
            disabled={pagination.page <= 1}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⟪
          </button>
  
          {/* Previous Page */}
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ←
          </button>
  
          {/* Page Numbers */}
          <div className="flex gap-1">
            {getVisiblePages().map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === '...' ? (
                  <span className="flex items-center justify-center w-9 h-9 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(pageNum)}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-colors
                      ${pagination.page === pageNum
                        ? 'bg-[#3d4750] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {pageNum}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
  
          {/* Next Page */}
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.pages}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </button>
  
          {/* Last Page */}
          <button
            onClick={() => onPageChange(pagination.pages)}
            disabled={pagination.page >= pagination.pages}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⟫
          </button>
        </div>
  
        <div className="text-sm text-gray-600 sm:hidden">
          Page {pagination.page} of {pagination.pages}
        </div>
      </div>
    );
  }