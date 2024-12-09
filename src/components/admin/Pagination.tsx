
import type { PaginationData } from '@/lib/types';
import { RiArrowDropLeftLine, RiArrowDropRightLine, RiSkipLeftLine, RiSkipRightLine } from 'react-icons/ri';

interface PaginationProps {
    pagination: PaginationData;
    onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
    return (
        <div className="flex justify-between items-center mt-6">
            <div className="text-gray-600">
                <span>{`Total: ${pagination.total}`}</span>
                <span className="ml-4">{`Page: ${pagination.page} of ${pagination.pages}`}</span>
            </div>

            <div className="flex items-center gap-4">
                <button
                    disabled={pagination.page <= 1}
                    onClick={() => onPageChange(1)}
                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full disabled:opacity-50"
                >
                    <RiSkipLeftLine />
                </button>
                <button
                    disabled={pagination.page <= 1}
                    onClick={() => onPageChange(pagination.page - 1)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50"
                >
                    <RiArrowDropLeftLine />
                </button>

                {pagination.pages > 1 && (
                    <div className="flex gap-2">
                        {Array.from({ length: pagination.pages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => onPageChange(index + 1)}
                                className={`px-1 py-1 w-8 h-8 rounded-full text-sm ${pagination.page === index + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-blue-500 border border-gray-300 hover:bg-blue-50'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    disabled={pagination.page >= pagination.pages}
                    onClick={() => onPageChange(pagination.page + 1)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50"
                >
                    <RiArrowDropRightLine />
                </button>
                <button
                    disabled={pagination.page >= pagination.pages}
                    onClick={() => onPageChange(pagination.pages)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50"
                >
                    <RiSkipRightLine />
                </button>
            </div>
        </div>
    );
}