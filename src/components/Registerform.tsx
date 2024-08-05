import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { register } from '../interface/user'; // Đảm bảo đúng đường dẫn và kiểu dữ liệu của register
import { useUserContext } from '../context/user_context';

const theme = createTheme();

export default function SignUp() {
  const { Register } = useUserContext();
  const { register, handleSubmit, formState: { errors } } = useForm<register>();

  const onSubmit: SubmitHandler<register> = (data) => {
    Register(data);
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
            Sign up
          </Typography>
          <Box 
            component="form" 
            sx={{ width: '100%', marginTop: theme.spacing(3) }} 
            noValidate 
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                  {...register('name', { required: 'Tên ko để trống' })}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Email ko hợp lệ'
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
                  label="Phone Number"
                  id="phone"
                  autoComplete="phone"
                  {...register('phone', {
                    required: 'sdt ko được để trống',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'sdt 10 ký tự'
                    }
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long'
                    }
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="tôi đồng ý với các điều khoản."
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                 b đã có tài khoản ? đăng nhập
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Built with love by the "}
            <Link color="inherit" href="https://mui.com/">
              MUI
            </Link>
            {" team."}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
