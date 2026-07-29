import React from 'react';
import { useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ROUTES } from '../../config/routes';

interface ResultState {
  success: boolean;
  reason?: 'WRONG_ANSWER' | 'TIMEOUT';
  failedAtQuestion?: number;
}

export const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const stageId = Number(id);

  const state = location.state as ResultState | undefined;

  // اگر بصورت دستی و بدون استیت وضعیت وارد صفحه شده باشد، به خانه بازگردانده می‌شود.
  if (!state || isNaN(stageId)) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const { success, reason, failedAtQuestion } = state;

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 5,
          borderRadius: 3,
          textAlign: 'center',
          border: success ? '2px solid #2e7d32' : '2px solid #d32f2f',
        }}
      >
        {success ? (
          // سناریو موفقیت
          <Box>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" color="success.main" gutterBottom>
              Mission Accomplished!
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
              Congratulations! You have successfully passed Stage {stageId}. Your rank and progression have been updated.
            </Typography>
          </Box>
        ) : (
          // سناریو شکست
          <Box>
            <CancelIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" color="error.main" gutterBottom>
              Mission Failed!
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
              {reason === 'TIMEOUT'
                ? 'Time ran out before you could complete the mission.'
                : `You selected the wrong answer on question number ${failedAtQuestion}.`}
            </Typography>
            <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 'bold', mb: 4 }}>
              Remember: In this operation, failure results in immediate discharge!
            </Typography>
          </Box>
        )}

        {/* دکمه‌های ناوبری و هدایت */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {success ? (
            // اگر برنده شد، دکمه رفتن به مرحله بعدی در صورت وجود
            stageId < 20 ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={() => navigate(ROUTES.stage(stageId + 1))}
              >
                Proceed to Stage {stageId + 1}
              </Button>
            ) : (
              <Typography variant="h6" color="primary.main" fontWeight="bold" sx={{ mb: 2 }}>
                🎖️ Master of the Battlefield! You have beaten all stages!
              </Typography>
            )
          ) : (
            // اگر باخت، دکمه تلاش مجدد برای همان مرحله
            <Button
              variant="contained"
              color="error"
              size="large"
              startIcon={<ReplayIcon />}
              onClick={() => navigate(ROUTES.stage(stageId))}
            >
              Try Again
            </Button>
          )}

          {/* بازگشت به داشبورد */}
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate(ROUTES.home)}
          >
            Return to Dashboard
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
