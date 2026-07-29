import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid2 as Grid,
  Button,
  Divider,
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

  const handleLogout = () => {
    clearProfile();
    resetProgress();
    // navigate(ROUTES.welcome);
  };

  const handleStageClick = (stageNumber: number) => {
    navigate(ROUTES.stage(stageNumber));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Soldier: {fullName || "Unknown"}
          </Typography>
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Current Rank:{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                {rank}
              </Box>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Level:{" "}
              <Box
                component="span"
                sx={{ color: "secondary.main", fontWeight: "bold" }}
              >
                {level} / 20
              </Box>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<RestartAltIcon />}
            onClick={resetProgress}
            size="small"
          >
            Reset Progress
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
            size="small"
          >
            Logout
          </Button>
        </Box>
      </Paper>

      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        Missions Grid
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3}>
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
    </Container>
  );
};
