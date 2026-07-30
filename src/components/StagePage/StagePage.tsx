import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  CircularProgress,
} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useGameProgress } from '../../hooks/useGameProgress';
import { STAGES } from '../../data/stages';
import { MOCK_QUESTIONS } from '../../data/questions';
import { ROUTES } from '../../config/routes';

const getStageTimeLimit = (stageNumber: number): number => {
  if (stageNumber >= 1 && stageNumber <= 11) return 30;
  if (stageNumber >= 12 && stageNumber <= 16) return 20;
  if (stageNumber >= 17 && stageNumber <= 20) return 10;
  return 30;
};

export const StagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stageId = Number(id);

  const {
    isHydrated,
    isStageUnlocked,
    isStagePassed,
    markStagePassed,
  } = useGameProgress();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentQuestionIndexRef = useRef(0);

  useEffect(() => {
    currentQuestionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  const stageConfig = useMemo(
    () => STAGES.find((s) => s.stageNumber === stageId),
    [stageId]
  );

  const stageQuestions = useMemo(
    () => MOCK_QUESTIONS.filter((q) => q.stageNumber === stageId),
    [stageId]
  );

  const timeLimit = useMemo(() => getStageTimeLimit(stageId), [stageId]);

  const isInvalidStage = useMemo(() => {
    if (!isHydrated || isFinishing) return false;

    return (
      Number.isNaN(stageId) ||
      !stageConfig ||
      stageQuestions.length === 0 ||
      !isStageUnlocked(stageId) ||
      isStagePassed(stageId)
    );
  }, [
    isHydrated,
    isFinishing,
    stageId,
    stageConfig,
    stageQuestions.length,
    isStageUnlocked,
    isStagePassed,
  ]);

  const handleFailure = (reason: 'WRONG_ANSWER' | 'TIMEOUT') => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    navigate(`/result/${stageId}`, {
      state: {
        success: false,
        reason,
        failedAtQuestion: currentQuestionIndexRef.current + 1,
      },
      replace: true,
    });
  };

  useEffect(() => {
    if (!isHydrated) return;
    if (isInvalidStage) {
      navigate(ROUTES.home, { replace: true });
    }
  }, [isHydrated, isInvalidStage, navigate]);

  useEffect(() => {
    if (!isHydrated || isInvalidStage) return;

    setTimeLeft(timeLimit);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          handleFailure('TIMEOUT');
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isHydrated, isInvalidStage, timeLimit, stageId]);

  if (!isHydrated) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress />
          <Typography>در حال بارگذاری مرحله...</Typography>
        </Box>
      </Container>
    );
  }

  if (isInvalidStage) {
    return null;
  }

  const currentQuestion = stageQuestions[currentQuestionIndex];
  const totalQuestions = stageQuestions.length;

  if (!currentQuestion) {
    return null;
  }

  const handleOptionSelect = (selectedOption: string) => {
    if (selectedOption === currentQuestion.correctAnswer) {
      const isLastQuestion = currentQuestionIndex + 1 >= totalQuestions;

      if (!isLastQuestion) {
        setCurrentQuestionIndex((prev) => prev + 1);
        return;
      }

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      setIsFinishing(true);
      markStagePassed(stageId);

      navigate(`/result/${stageId}`, {
        state: { success: true },
        replace: true,
      });

      return;
    }

    handleFailure('WRONG_ANSWER');
  };

  const progressPercent =
    totalQuestions > 0 ? (currentQuestionIndex / totalQuestions) * 100 : 0;

  const timeProgressPercent =
    timeLimit > 0 ? (timeLeft / timeLimit) * 100 : 0;

  return (
    <Container maxWidth="md" sx={{ py: 4 }} dir="rtl">
      {/* هدر مرحله */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 4 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon sx={{ transform: 'rotate(180deg)',mx:1 }} />}
          onClick={() => navigate(ROUTES.home)}
          color="inherit"
        >
          انصراف از مرحله
        </Button>

        <Typography variant="h5" fontWeight="bold">
          مرحله {stageId}
        </Typography>
      </Box>

      {/* باکس تایمر و شماره سوال */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }} elevation={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimerIcon color={timeLeft < 10 ? 'error' : 'primary'} />
            <Typography
              variant="h6"
              fontWeight="bold"
              color={timeLeft < 10 ? 'error.main' : 'text.primary'}
            >
              زمان باقی‌مانده: {timeLeft} ثانیه
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            سوال {currentQuestionIndex + 1} از {totalQuestions}
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={timeProgressPercent}
          color={timeLeft < 10 ? 'error' : 'primary'}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Paper>

      {/* نوار پیشرفت مرحله */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          پیشرفت مرحله
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progressPercent}
          color="success"
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>

      {/* کارت سوال و تصویر (در صورت وجود) */}
      <Box>
        <Card sx={{ p: 3, mb: 3, borderRadius: 2 }} variant="outlined">
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {/* نمایش تصویر سوال در صورت وجود */}
            {currentQuestion.imageUrl && (
              <Box
                component="img"
                src={currentQuestion.imageUrl}
                alt={`تصویر سوال ${currentQuestionIndex + 1}`}
                sx={{
                  maxWidth: '100%',
                  maxHeight: 300,
                  borderRadius: 2,
                  objectFit: 'contain',
                  boxShadow: 1,
                  mb: 1,
                }}
              />
            )}

            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              sx={{ dir: 'rtl' }}
            >
              {currentQuestion.text}
            </Typography>
          </CardContent>
        </Card>

        {/* گزینه‌ها */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {currentQuestion.options.map((option, index) => (
            <Card
              key={`${currentQuestion.id}-${index}`}
              variant="outlined"
              sx={{
                borderRadius: 2,
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <CardActionArea
                onClick={() => handleOptionSelect(option)}
                sx={{ p: 2, textAlign: 'right' }}
              >
                <Typography variant="body1" fontWeight="medium">
                  {index + 1}. {option}
                </Typography>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};
