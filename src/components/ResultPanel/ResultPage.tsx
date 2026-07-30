import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useGameProgress } from '../../hooks/useGameProgress';
import { ROUTES } from '../../config/routes';

interface LocationState {
  success?: boolean;
  reason?: 'WRONG_ANSWER' | 'TIMEOUT';
  failedAtQuestion?: number;
}

export const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const stageId = Number(id);

  const { rank, level, markStagePassed, isStagePassed } = useGameProgress();
  const state = (location.state as LocationState) || {};
  const { success = false, reason, failedAtQuestion } = state;

  const handleNextStage = () => {
    navigate(`/stage/${stageId + 1}`);
  };

  const handleRetry = () => {
    navigate(`/stage/${stageId}`);
  };

  useEffect(() => {
    if (success && !isStagePassed(stageId)) {
      markStagePassed(stageId);
    }
  }, [success, stageId, isStagePassed, markStagePassed]);

  return (
    <Container maxWidth="sm" sx={{ py: 6 }} dir="rtl">
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          bgcolor: 'background.paper',
        }}
      >
        {success ? (
          <Box>
            <CheckCircleOutlineIcon
              color="success"
              sx={{ fontSize: 80, mb: 2 }}
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              color="success.main"
              gutterBottom
            >
              مأموریت با موفقیت انجام شد!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              شما با موفقیت مرحله {stageId} را به پایان رساندید و منطقه را تثبیت کردید.
            </Typography>
          </Box>
        ) : (
          <Box>
            <CancelIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
            <Typography
              variant="h4"
              fontWeight="bold"
              color="error.main"
              gutterBottom
            >
              شکست در مأموریت
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {reason === 'TIMEOUT'
                ? 'زمان شما به پایان رسید! باید در شرایط حساس سریع‌تر تصمیم بگیرید.'
                : `پاسخ نادرست در سوال شماره ${failedAtQuestion || 1}.`}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* بخش نمایش رتبه و سطح کاربر */}
        <Box sx={{ mb: 4, bgcolor: 'action.selected', p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            وضعیت فعلی رزمنده
          </Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 0.5 }}>
            سطح {level} — درجه: {rank}
          </Typography>
        </Box>

        {/* دکمه‌های ناوبری و اکشن‌ها */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {success ? (
            <Button
              variant="contained"
              color="success"
              size="large"
              // در RTL فلش به سمت چپ نشان‌دهنده جلو رفتن و مرحله بعدی است
              startIcon={<ArrowBackIcon />}
              onClick={handleNextStage}
              fullWidth
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              رفتن به مرحله بعدی
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ReplayIcon />}
              onClick={handleRetry}
              fullWidth
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              تلاش مجدد مأموریت
            </Button>
          )}

          <Button
            variant="outlined"
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate(ROUTES.home)}
            fullWidth
            sx={{ py: 1 }}
          >
            بازگشت به مرکز فرماندهی (صفحه اصلی)
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
