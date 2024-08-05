import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Category } from '../../interface/category';
import { Iproduct } from '../../interface/product';

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onProductSaved: (product: Iproduct) => void;
  product?: Iproduct | null;
  categories: Category[];
}

const ProductForm: React.FC<ProductFormProps> = ({ open, onClose, onProductSaved, product, categories }) => {
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<Iproduct>({
    defaultValues: product || { id: '', name: '', price: 0, image: '', category: '', desc: '' },
  });

  const [currentImageFile, setCurrentImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(product?.image || '');

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('image', product.image);
      setValue('category', product.category);
      setValue('desc', product.desc);
      setExistingImage(product.image); // Track existing image URL
    } else {
      reset({ id: '', name: '', price: 0, image: '', category: '', desc: '' });
    }
  }, [product, setValue, reset]);

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

  const onSubmit = async (data: Iproduct) => {
    try {
      let imageUrl = existingImage;

      if (currentImageFile) {
        imageUrl = await uploadImageToCloudinary(currentImageFile);
      }

      const updatedProduct = {
        ...data,
        image: imageUrl,
      };

      const response = product
        ? await axios.put(`http://localhost:3000/products/${product.id}`, updatedProduct)
        : await axios.post('http://localhost:3000/products', updatedProduct);

      onProductSaved(response.data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
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
            rules={{ required: 'Tên sản phẩm là bắt buộc' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tên sản phẩm"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="desc"
            control={control}
            rules={{ required: 'Mô tả là bắt buộc' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nhập mô tả"
                fullWidth
                margin="normal"
                error={!!errors.desc}
                helperText={errors.desc?.message}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{
              required: 'Giá tiền là bắt buộc',
              min: {
                value: 0,
                message: 'Giá tiền không được âm',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Giá tiền"
                fullWidth
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
                type="number"
              />
            )}
          />
          <FormControl fullWidth margin="normal" error={!!errors.image}>
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
          <Controller
            name="category"
            control={control}
            rules={{ required: 'Danh mục là bắt buộc' }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.category}>
                <InputLabel id="category-label">Danh mục</InputLabel>
                <Select
                  {...field}
                  labelId="category-label"
                  label="Danh mục"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && <Typography color="error">{errors.category.message}</Typography>}
              </FormControl>
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          {product ? 'Cập nhật' : 'Thêm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
