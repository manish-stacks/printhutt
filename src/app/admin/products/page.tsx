

const Page = () => {

  return (
  <>
    category
  </>
  )
}

export default Page


/*
"use client";

import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Popconfirm, 
  message, 
  Tag 
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import Link from 'next/link';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      message.success('Product deleted successfully');
      fetchProducts(); // Refresh list
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: any) => category?.name || 'Uncategorized',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Link href={`/admin/products/edit/${record._id}`}>
            <Button 
              icon={<EditOutlined />} 
              type="primary" 
              size="small"
            >
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              icon={<DeleteOutlined />} 
              danger 
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: 16 
      }}>
        <h1>Products</h1>
        <Link href="/admin/products/add">
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
          >
            Add New Product
          </Button>
        </Link>
      </div>
      <Table 
        columns={columns} 
        dataSource={products} 
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
};

export default ProductList;

*/

/*


// app/admin/products/page.tsx
import ProductList from '@/components/admin/ProductList';

export default function ProductListPage() {
  return <ProductList />;
}

// app/admin/products/add/page.tsx
import ProductForm from '@/components/admin/ProductForm';

export default function AddProductPage() {
  return (
    <div>
      <h1>Add New Product</h1>
      <ProductForm isEditMode={false} />
    </div>
  );
}

// app/admin/products/edit/[id]/page.tsx
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import axios from 'axios';

async function fetchProduct(id: string) {
  try {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function EditProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const product = await fetchProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm product={product} isEditMode={true} />
    </div>
  );
}

*/