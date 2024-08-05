import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler } from 'react-hook-form'; // Đảm bảo đúng đường dẫn và kiểu dữ liệu của register
import { useUserContext } from '../context/user_context';
import { login } from '../interface/user';

const theme = createTheme();

export default function SignInSide() {
  const { login } = useUserContext();
  const { register, handleSubmit, formState: { errors } } = useForm<login>();

  const onSubmit: SubmitHandler<login> = (data) => {
    login(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box 
          sx={{ 
            marginTop: theme.spacing(8), 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          <Avatar sx={{ 
            margin: theme.spacing(1), 
            backgroundColor: theme.palette.secondary.main 
          }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Signin
          </Typography>
          <Box 
            component="form" 
            sx={{ width: '100%', marginTop: theme.spacing(3) }} 
            noValidate 
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  {...register('email', { 
                    required: 'Email không được để trống',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'email ko đúng định dạng'
                    }
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register('password', { 
                    required: 'Password ko để trống',
                    minLength: {
                      value: 6,
                      message: 'mật khẩu ko nhỏ hơn 6'
                    }
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(2) }}
            >
              Đăng Nhập
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Bạn chưa có tài khoản ? 
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="https://mui.com/">
              
            </Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
