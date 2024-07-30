import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button } from '@mui/material';
import Title from './Title';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Iproduct } from '../../interface/product';
import { Category } from '../../interface/category';
import ProductForm from './ProductForm';

const Orders: React.FC = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Iproduct | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:3000/products'),
          axios.get('http://localhost:3000/categories'),
        ]);
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat:Category) => cat.id === categoryId);
    return category ? category.name : '';
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter((product:Iproduct) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: Iproduct) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setOpen(true);
  };

  const handleProductSaved = (savedProduct: Iproduct) => {
    if (selectedProduct) {
      setProducts(products.map((product) => (product.id === savedProduct.id ? savedProduct : product)));
    } else {
      setProducts([...products, savedProduct]);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Title>Danh sách sản phẩm</Title>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
        Thêm sản phẩm
      </Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Giá tiền</TableCell>
            <TableCell>Ảnh</TableCell>
            <TableCell>Danh mục</TableCell>
            <TableCell align="right">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <img src={product.image} alt={product.name} style={{ width: '50px' }} />
              </TableCell>
              <TableCell>{getCategoryName(product.category)}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" color="secondary" onClick={() => handleDelete(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ProductForm
        open={open}
        onClose={handleClose}
        onProductSaved={handleProductSaved}
        product={selectedProduct}
        categories={categories}
      />
    </React.Fragment>
  );
};

export default Orders;
