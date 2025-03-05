"use client";
import React, { useEffect, useState } from "react";
import { getAllSessionCarts } from "@/_services/admin/se-cart";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;





  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getAllSessionCarts();
        setCarts(response.data || []);
      } catch (error) {
        setCarts([])
        setError(error.message || "Failed to fetch carts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = carts?.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-4">Cart ({carts.length})</h2>

      {/* {loading && <p className="text-blue-500">Loading carts...</p>} */}
      {error && <p className="text-red-500">{error}</p>}
      {!error && carts.length === 0 && (
        <p className="text-gray-500">No items in the cart.</p>
      )}

      {!error && carts.length > 0 && (
        <div className="border rounded-md p-4 shadow-md bg-white overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">#</th>
                <th className="border p-2">Product Image</th>
                <th className="border p-2">Product Name</th>
                <th className="border p-2">Date Of Added</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((cart, index) => (
                <tr key={cart._id || index} className="text-center">
                  <td className="border p-2">{indexOfFirstItem + index + 1}</td>
                  <td className="border p-2">
                    <Image
                      src={cart?.productId?.thumbnail?.url}
                      width={50}
                      height={50}
                      alt="Product"
                      className="rounded"
                    />
                  </td>
                  <td className="border p-2">{cart?.productId?.title || "N/A"}</td>
                  <td className="border p-2">{new Date(cart?.createdAt).toLocaleDateString('en-us')}</td>
                </tr>
              ))}
            </tbody>
          </table>


          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {Math.ceil(carts.length / itemsPerPage)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < Math.ceil(carts.length / itemsPerPage) ? prev + 1 : prev
                )
              }
              disabled={currentPage === Math.ceil(carts.length / itemsPerPage)}
              className={`px-4 py-2 border rounded ${currentPage === Math.ceil(carts.length / itemsPerPage) ? "bg-gray-300" : "bg-blue-500 text-white"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
