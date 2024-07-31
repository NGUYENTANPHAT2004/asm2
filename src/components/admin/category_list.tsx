import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import axios from 'axios';
import { Category } from '../../interface/category';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CategoryForm from './Category_fom';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAdd = (category: Category) => {
    setCategories([...categories, category]);
  };

  const handleEdit = (category: Category) => {
    setCategories(categories.map((cat) => (cat.id === category.id ? category : cat)));
  };

  const handleOpenForm = () => {
    setEditCategory(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Danh sách danh mục
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenForm}>
        Thêm danh mục
      </Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tên danh mục</TableCell>
            <TableCell align="right">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => {
                    setEditCategory(category);
                    setOpenForm(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" color="secondary" onClick={() => handleDelete(category.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CategoryForm
        open={openForm}
        onClose={handleCloseForm}
        onCategoryAdded={handleAdd}
        onCategoryEdited={handleEdit}
        category={editCategory}
      />
    </Box>
  );
};

export default CategoryList;
