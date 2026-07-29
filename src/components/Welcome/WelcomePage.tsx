import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { usePlayerProfile } from '../../hooks/usePlayerProfile';
import { ROUTES } from '../../config/routes';


interface WelcomeFormInputs {
  firstName: string;
  lastName: string;
}

const schema = yup.object().shape({
  firstName: yup.string().trim().required('First name is required').min(2, 'Too short'),
  lastName: yup.string().trim().required('Last name is required').min(2, 'Too short'),
});

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, saveProfile } = usePlayerProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WelcomeFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
    },
  });

  const onSubmit = (data: WelcomeFormInputs) => {
    saveProfile(data);
    navigate(ROUTES.home);
  };



  // if(profile?.firstName) return navigate(ROUTES.home);
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 3,
            textAlign: 'center',
            background: 'background.paper',
          }}
        >
          <Avatar
            sx={{
              m: '0 auto 16px',
              bgcolor: 'primary.main',
              width: 56,
              height: 56,
            }}
          >
            <SportsEsportsIcon fontSize="large" />
          </Avatar>

          <Typography component="h1" variant="h4" gutterBottom fontWeight="bold">
            Welcome to PWA Quiz Game
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Enter your details to start your journey and unlock your military ranks.
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoComplete="given-name"
              autoFocus
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              autoComplete="family-name"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 4, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
            >
              Start Game
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
