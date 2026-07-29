import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  LinearProgress,
  Paper,
  Card,
  CardActionArea,
  CardContent,
} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useGameProgress } from '../../hooks/useGameProgress';
import { STAGES } from '../../data/stages';
import { MOCK_QUESTIONS } from '../../data/questions';
import { ROUTES } from '../../config/routes';

// تابع کمکی برای دریافت زمان مرحله بر اساس قوانین درجه سختی بازی
const getStageTimeLimit = (stageNumber: number): number => {
  if (stageNumber >= 1 && stageNumber <= 11) return 30; // Easy
  if (stageNumber >= 12 && stageNumber <= 16) return 20; // Medium
  if (stageNumber >= 17 && stageNumber <= 20) return 10; // Hard
  return 30; // مقدار پیش‌فرض پیشگیرانه
};

export const StagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stageId = Number(id);

  const {
    isStageUnlocked,
    isStagePassed,
    markStagePassed, // اصلاح نام متد از completeStage به markStagePassed
  } = useGameProgress();

  const stageConfig = STAGES.find((s) => s.stageNumber === stageId);
  const stageQuestions = MOCK_QUESTIONS.filter((q) => q.stageNumber === stageId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // رفع خطای NodeJS.Timeout با استفاده از تایپ استاندارد مرورگر
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuestionIndexRef = useRef(currentQuestionIndex);
  useEffect(() => {
    currentQuestionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  // گارد امنیتی ورود به مرحله
  if (!stageConfig || isNaN(stageId) || !isStageUnlocked(stageId) || isStagePassed(stageId)) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const currentQuestion = stageQuestions[currentQuestionIndex];
  const totalQuestions = stageQuestions.length;
  const timeLimit = getStageTimeLimit(stageId); // دریافت زمان مرحله بر اساس قوانین تعریف شده

  // مدیریت شکست
  const handleFailure = (reason: 'WRONG_ANSWER' | 'TIMEOUT') => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    navigate(`/result/${stageId}`, {
      state: { 
        success: false, 
        reason, 
        failedAtQuestion: currentQuestionIndexRef.current + 1 
      },
      replace: true,
    });
  };

  // تنظیم تایمر کلیک‌خور مرحله
  useEffect(() => {
    setTimeLeft(timeLimit);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFailure('TIMEOUT');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stageId, timeLimit]);

  // مدیریت کلیک روی گزینه‌ها
  const handleOptionSelect = (selectedOption: string) => {
    if (selectedOption === currentQuestion.correctAnswer) {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        markStagePassed(stageId); // فراخوانی متد صحیح بازی
        navigate(`/result/${stageId}`, {
          state: { success: true },
          replace: true,
        });
      }
    } else {
      handleFailure('WRONG_ANSWER');
    }
  };

  const progressPercent = (currentQuestionIndex / totalQuestions) * 100;
  const timeProgressPercent = (timeLeft / timeLimit) * 100;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.home)}
          color="inherit"
        >
          Abandon Mission
        </Button>
        <Typography variant="h5" fontWeight="bold">
          Stage {stageId}: {stageConfig.difficulty.toUpperCase()}
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }} elevation={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimerIcon color={timeLeft < 10 ? 'error' : 'primary'} />
            <Typography
              variant="h6"
              fontWeight="bold"
              color={timeLeft < 10 ? 'error.main' : 'text.primary'}
            >
              Time Left: {timeLeft}s
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={timeProgressPercent}
          color={timeLeft < 10 ? 'error' : 'primary'}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Mission Progress
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          color="success"
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>

      {currentQuestion && (
        <Box>
          <Card sx={{ p: 3, mb: 3, borderRadius: 2 }} variant="outlined">
            <CardContent>
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                {currentQuestion.text}
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {currentQuestion.options.map((option, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  transition: 'background-color 0.2s',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <CardActionArea onClick={() => handleOptionSelect(option)} sx={{ p: 2 }}>
                  <Typography variant="body1" fontWeight="medium">
                    {index + 1}. {option}
                  </Typography>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};
