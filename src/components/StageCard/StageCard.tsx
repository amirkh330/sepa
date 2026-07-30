import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box, Chip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import type { Difficulty } from '../../types/question';

interface StageCardProps {
  stageNumber: number;
  difficulty: Difficulty;
  isPassed: boolean;
  isUnlocked: boolean;
  canPlay: boolean;
  onClick: () => void;
}

// فارسی‌سازی سطوح سختی و رنگ‌بندی آن‌ها
const difficultyMeta: Record<Difficulty, { chipBg: string; chipText: string; label: string }> = {
  easy: { chipBg: '#e8f5e9', chipText: '#2e7d32', label: 'آسان' },
  medium: { chipBg: '#fff3e0', chipText: '#ef6c00', label: 'متوسط' },
  hard: { chipBg: '#ffebee', chipText: '#c62828', label: 'سخت' },
};

type StageUiState = 'passed' | 'locked' | 'playable';

function getUiState(args: { isPassed: boolean; isUnlocked: boolean; canPlay: boolean }): StageUiState {
  // اولویت‌ها: پاس‌شده > قفل > قابل بازی
  if (args.isPassed) return 'passed';
  if (!args.isUnlocked) return 'locked';
  return args.canPlay ? 'playable' : 'locked';
}

export const StageCard: React.FC<StageCardProps> = (props) => {
  const { stageNumber, difficulty, isPassed, isUnlocked, canPlay, onClick } = props;

  const meta = difficultyMeta[difficulty] ?? difficultyMeta.easy;
  const uiState = getUiState({ isPassed, isUnlocked, canPlay });

  const clickable = uiState === 'playable';

  const border =
    uiState === 'passed'
      ? '2px solid'
      : uiState === 'playable'
        ? '2px dashed'
        : '1px solid';

  const borderColor =
    uiState === 'passed'
      ? 'success.main'
      : uiState === 'playable'
        ? 'primary.main'
        : 'divider';

  const opacity = uiState === 'locked' ? 0.55 : 1;

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        border,
        borderColor,
        opacity,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        transition: 'transform 120ms ease, box-shadow 120ms ease',
        direction: 'rtl', // تضمین جهت‌دهی راست به چپ در کارت
        ...(clickable
          ? {
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: (theme) => theme.shadows[6],
              },
            }
          : null),
      }}
    >
      <CardActionArea
        onClick={clickable ? onClick : undefined}
        disabled={!clickable}
        sx={{
          height: '100%',
          cursor: clickable ? 'pointer' : 'not-allowed',
          alignItems: 'stretch',
        }}
      >
        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            {/* بالا: چیپ سختی + شماره مرحله */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Chip
                label={meta.label}
                size="small"
                sx={{
                  bgcolor: meta.chipBg,
                  color: meta.chipText,
                  fontWeight: 700,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                مرحله {stageNumber}
              </Typography>
            </Box>

            <Typography variant="h6" fontWeight={800} gutterBottom sx={{ textAlign: 'right' }}>
              مأموریت {stageNumber}
            </Typography>
          </Box>

          {/* پایین: وضعیت مرحله */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, gap: 1, justifyContent: 'flex-start' }}>
            {uiState === 'passed' && (
              <>
                <CheckCircleIcon color="success" fontSize="small" />
                <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                  قبول شده
                </Typography>
              </>
            )}

            {uiState === 'locked' && (
              <>
                <LockIcon color="disabled" fontSize="small" />
                <Typography variant="body2" color="text.disabled">
                  {isUnlocked ? 'در دسترس نیست' : 'قفل شده'}
                </Typography>
              </>
            )}

            {uiState === 'playable' && (
              <>
                <PlayArrowIcon color="primary" fontSize="small" sx={{ transform: 'scaleX(-1)' }} /> {/* قرینه‌سازی فلش برای جهت RTL */}
                <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 800 }}>
                  شروع بازی
                </Typography>
              </>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
