import { RiDeleteBin2Line, RiEdit2Fill, RiLoader2Line } from 'react-icons/ri';
import { Coupon } from '@/lib/types/coupon';


interface CouponTableProps {
  coupons: Coupon[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CouponTable({ 
  coupons, 
  isLoading, 
  onEdit, 
  onDelete 
}: CouponTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <RiLoader2Line className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getDiscountDisplay = (coupon: Coupon) => {
    switch (coupon.discountType) {
      case 'percentage':
        return `${coupon.discountValue}%`;
      case 'fixed':
        return `₹ ${coupon.discountValue}`;
      case 'free_shipping':
        return 'Free Shipping';
      default:
        return coupon.discountValue;
    }
  };

  return (
    <table className="min-w-full table-auto text-left text-sm text-gray-600">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="py-3 px-4">Code</th>
          <th className="py-3 px-4">Description</th>
          <th className="py-3 px-4">Discount</th>
          {/* <th className="py-3 px-4">Valid From</th>
          <th className="py-3 px-4">Valid Until</th>
          <th className="py-3 px-4">Usage</th> */}
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {coupons.length === 0 ? (
          <tr>
            <td colSpan={8} className="py-3 px-4 text-center">No coupons found.</td>
          </tr>
        ) : (
          coupons.map((coupon) => (
            <tr key={coupon._id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{coupon.code}</td>
              <td className="py-3 px-4">{coupon.description}</td>
              <td className="py-3 px-4">{getDiscountDisplay(coupon)}</td>
              {/* <td className="py-3 px-4">{formatDate(coupon.validFrom)}</td>
              <td className="py-3 px-4">{formatDate(coupon.validUntil)}</td>
              <td className="py-3 px-4">
                {coupon.usageLimit ? `${coupon.usedCount}/${coupon.usageLimit}` : `${coupon.usedCount}/∞`}
              </td> */}
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {coupon.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(coupon._id)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                  >
                    <RiEdit2Fill />
                  </button>
                  <button
                    onClick={() => onDelete(coupon._id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <RiDeleteBin2Line />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}