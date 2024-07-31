import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, FormControl, Typography } from '@mui/material';
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
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<Category>();
  const [currentImageFile, setCurrentImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (category) {
      reset(category);
    } else {
      reset({ name: '', image: '' });
    }
  }, [category, reset]);

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'jskegmgh');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dcjutahks/upload', formData);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };

  const onSubmit = async (data: Category) => {
    try {
      let imageUrl = data.image;

      if (currentImageFile) {
        imageUrl = await uploadImageToCloudinary(currentImageFile);
      }

      const updatedCategory = {
        ...data,
        image: imageUrl,
      };

      if (category) {
        const response = await axios.put(`http://localhost:3000/categories/${category.id}`, updatedCategory);
        onCategoryEdited(response.data);
      } else {
        const response = await axios.post('http://localhost:3000/categories', updatedCategory);
        onCategoryAdded(response.data);
      }

      reset();
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
    }
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
          <FormControl fullWidth margin="normal">
            <input
              id="image-input"
              type="file"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setCurrentImageFile(file);
                setValue('image', file ? file.name : '');
              }}
            />
            {errors.image && <Typography color="error">{errors.image.message}</Typography>}
          </FormControl>
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