"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Form, 
  Input, 
  Select, 
  InputNumber, 
  Switch, 
  Upload, 
  Button, 
  message 
} from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

interface ProductFormProps {
  product?: any; // Replace with actual Product type
  isEditMode: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, isEditMode }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [fileList, setFileList] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        message.error('Failed to fetch categories');
      }
    };
    fetchCategories();

    // If in edit mode, populate form
    if (isEditMode && product) {
      form.setFieldsValue({
        ...product,
        category: product.category?._id,
      });
      
      // Set existing files
      if (product.files) {
        setFileList(product.files.map((file: any, index: number) => ({
          uid: index,
          name: `file${index}`,
          status: 'done',
          url: file.url,
        })));
      }
    }
  }, [product, isEditMode, form]);

  const handleSubmit = async (values: any) => {
    try {
      // Prepare form data
      const formData = new FormData();
      
      // Add text fields
      Object.keys(values).forEach(key => {
        if (key !== 'files') {
          formData.append(key, values[key]);
        }
      });

      // Handle file uploads
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('files', file.originFileObj);
        }
      });

      // Submit to API
      const url = isEditMode 
        ? `/api/products/${product._id}` 
        : '/api/products';
      
      const method = isEditMode ? 'put' : 'post';
      
      const response = await axios[method](url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      message.success(`Product ${isEditMode ? 'updated' : 'created'} successfully`);
      router.push('/admin/products');
    } catch (error) {
      message.error(`Failed to ${isEditMode ? 'update' : 'create'} product`);
    }
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <Form 
      form={form} 
      layout="vertical" 
      onFinish={handleSubmit}
    >
      {/* Basic Information */}
      <Form.Item 
        name="title" 
        label="Product Title" 
        rules={[{ required: true, message: 'Please enter product title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="description" 
        label="Description"
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item 
        name="category" 
        label="Category" 
        rules={[{ required: true, message: 'Please select a category' }]}
      >
        <Select>
          {categories.map(category => (
            <Select.Option key={category._id} value={category._id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Pricing */}
      <Form.Item name="price" label="Price">
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="discountPercentage" label="Discount Percentage">
        <InputNumber min={0} max={100} style={{ width: '100%' }} />
      </Form.Item>

      {/* Stock and Variants */}
      <Form.Item name="stock" label="Total Stock">
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      {/* File Upload */}
      <Form.Item name="files" label="Product Images">
        <Upload
          listType="picture"
          fileList={fileList}
          onChange={handleFileChange}
          multiple
          beforeUpload={() => false} // Prevent auto upload
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      {/* Advanced Options */}
      <Form.Item name="status" label="Active">
        <Switch />
      </Form.Item>

      <Form.Item name="ishome" label="Show on Home">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditMode ? 'Update Product' : 'Create Product'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;