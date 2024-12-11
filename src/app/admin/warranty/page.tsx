import Categories from "@/pages/admin/categories/CategoryList"
import Warranty from "@/pages/admin/warranty/Warranty";

const Page = () => {

  return (
    <>
      <Warranty />
    </>
  )
}

export default Page;



/*

'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { useWarranty } from '@/hooks/useWarranty';
import { WarrantyForm } from '@/components/warranty/WarrantyForm';
import { WarrantyTable } from '@/components/warranty/WarrantyTable';
import { Pagination } from '@/components/warranty/Pagination';

export default function WarrantyPage() {
  const {
    warranties,
    pagination,
    isLoading,
    fetchWarranties,
    createWarranty,
    modifyWarranty,
    removeWarranty,
  } = useWarranty();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    warrantyType: '',
    durationMonths: '',
    coverage: '',
    claimProcess: '',
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams?.get('page') || '1';
  const search = searchParams?.get('search') || '';

  useEffect(() => {
    fetchWarranties(page, search);
  }, [fetchWarranties, page, search]);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams!);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams!);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = editingId
        ? await modifyWarranty(editingId, formData)
        : await createWarranty(formData);
      
      if (success) {
        fetchWarranties(page, search);
        handleCloseModal();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const warrantyToEdit = warranties.find(warranty => warranty._id === id);
    if (warrantyToEdit) {
      setFormData({
        warrantyType: warrantyToEdit.warrantyType,
        durationMonths: warrantyToEdit.durationMonths,
        coverage: warrantyToEdit.coverage.join(', '),
        claimProcess: warrantyToEdit.claimProcess,
      });
      setEditingId(id);
      setIsOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    const success = await removeWarranty(id);
    if (success) {
      fetchWarranties(page, search);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditingId(null);
    setFormData({
      warrantyType: '',
      durationMonths: '',
      coverage: '',
      claimProcess: '',
    });
  };

  return (
    <div className="max-w-10xl mx-auto lg:px-10 py-20">
      <div className="w-full md:w-12/12 lg:w-12/12 mb-5">
        <div className="bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md shadow-black-300">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Warranties</h2>
            <p className="text-gray-600">Manage warranty information and details.</p>
          </div>
          <div>
            <button
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => setIsOpen(true)}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white px-5 py-10">
        <div className="mb-6 flex justify-between items-center">
          <div className="relative hidden sm:block mt-4">
            <FaSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search warranties..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-80 rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <WarrantyTable
            warranties={warranties}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {pagination && (
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {isOpen && (
        <WarrantyForm
          formData={formData}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onClose={handleCloseModal}
          mode={editingId ? 'edit' : 'add'}
        />
      )}
    </div>
  );
}

*/