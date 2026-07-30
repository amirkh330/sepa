import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid2 as Grid,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { usePlayerProfile } from "../../hooks/usePlayerProfile";
import { useGameProgress } from "../../hooks/useGameProgress";
import { ROUTES } from "../../config/routes";
import { STAGES } from "../../data/stages";
import { StageCard } from "../StageCard/StageCard";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { fullName, clearProfile } = usePlayerProfile();
  const {
    level,
    rank,
    resetProgress,
    isStageUnlocked,
    isStagePassed,
    canPlayStage,
  } = useGameProgress();

  // وضعیت برای نمایش دیالوگ تایید حذف پیشرفت
  const [openResetDialog, setOpenResetDialog] = useState(false);

  const handleLogout = () => {
    clearProfile();
    resetProgress();
    navigate(ROUTES.welcome);
  };

  const handleConfirmReset = () => {
    resetProgress();
    setOpenResetDialog(false);
  };

  const handleStageClick = (stageNumber: number) => {
    navigate(ROUTES.stage(stageNumber));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, direction: "rtl" }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            سرباز: {fullName || "ناشناس"}
          </Typography>
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 1 }}>
            <Typography variant="body1" color="text.secondary">
              درجه فعلی:{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                {rank}
              </Box>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              مرحله:{" "}
              <Box
                component="span"
                sx={{ color: "secondary.main", fontWeight: "bold" }}
              >
                {level} / 20
              </Box>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5, flexDirection: "row-reverse" }}>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<RestartAltIcon sx={{ ml: 1, mr: 0 }} />} // جابجایی آیکون برای فارسی
            onClick={() => setOpenResetDialog(true)}
            size="small"
          >
            پاکسازی پیشرفت
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<ExitToAppIcon sx={{ ml: 1, mr: 0 }} />}
            onClick={handleLogout}
            size="small"
          >
            خروج
          </Button>
        </Box>
      </Paper>

      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3, textAlign: "right" }}>
        نقشه مأموریت‌ها
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3} sx={{ direction: "rtl" }}>
        {STAGES.map((stage) => {
          const sNum = stage.stageNumber;
          const unlocked = isStageUnlocked(sNum);
          const passed = isStagePassed(sNum);
          const playable = canPlayStage(sNum);

          return (
            <Grid key={sNum} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <StageCard
                stageNumber={sNum}
                difficulty={stage.difficulty}
                isPassed={passed}
                isUnlocked={unlocked}
                canPlay={playable}
                onClick={() => handleStageClick(sNum)}
              />
            </Grid>
          );
        })}
      </Grid>

      {/* دیالوگ تایید برای ریست کردن بازی */}
      <Dialog
        open={openResetDialog}
        onClose={() => setOpenResetDialog(false)}
        dir="rtl"
      >
        <DialogTitle>{"آیا مطمئن هستید؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            با تایید این گزینه، تمام مراحل طی شده و امتیازات شما پاک خواهد شد و قابل بازیابی نیست.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'flex-start' }}>
          <Button onClick={() => setOpenResetDialog(false)} color="inherit">
            انصراف
          </Button>
          <Button onClick={handleConfirmReset} color="warning" variant="contained" autoFocus>
            بله، پاکسازی شود
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
