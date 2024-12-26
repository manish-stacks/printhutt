import Products from '@/pages/Products'


export const metadata = {
  title: 'Product',
  description: 'Product-page',
  keywords: ['Next.js', 'React', 'JavaScript'],
  openGraph: {
    title: 'Product-page',
    description: 'Product-page',
  },
}
const ProductPage = () => {
  return <Products />
}

export default ProductPage



/*

import React, { useState } from 'react';
import { Editor } from 'slate-react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { Slate, Editable, withHistory } from 'slate-history';

const ProductDescriptionEditor = () => {
  const editor = withHistory(withReact(createEditor()));
  const [value, setValue] = useState([]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <Editable />
    </Slate>
  );
};

export default ProductDescriptionEditor;

*/