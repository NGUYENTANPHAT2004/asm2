import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Category } from '../../interface/category';

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  onCategoryAdded: (category: Category) => void;
  onCategoryEdited: (category: Category) => void;
  category: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ open, onClose, onCategoryAdded, onCategoryEdited, category }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Category>();

  useEffect(() => {
    if (category) {
      reset(category);
    } else {
      reset({ name: '' });
    }
  }, [category, reset]);

  const onSubmit = async (data: Category) => {
    if (category) {
      try {
        const response = await axios.put(`http://localhost:3000/categories/${category.id}`, data);
        onCategoryEdited(response.data);
      } catch (error) {
        console.error('Error editing category:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/categories', data);
        onCategoryAdded(response.data);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {category ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Tên danh mục là bắt buộc' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tên danh mục"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          {category ? 'Lưu' : 'Thêm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
