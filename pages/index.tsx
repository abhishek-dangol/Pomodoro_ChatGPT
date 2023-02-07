import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

const PomodoroTimer = () => {
  const classes = useStyles();
  const [duration, setDuration] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            setIsRunning(false);
            return duration;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId!);
  }, [isRunning, duration]);

  const handleStartStopClick = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(event.target.value) * 60);
    setTimeLeft(Number(event.target.value) * 60);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">Pomodoro Timer</Typography>
      <Input
        type="number"
        value={duration / 60}
        onChange={handleDurationChange}
      />
      <Typography variant="h5">
        {Math.floor(timeLeft / 60)}:{timeLeft % 60}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartStopClick}
      >
        {isRunning ? "Stop" : "Start"}
      </Button>
      <Button variant="contained" onClick={handleResetClick}>
        Reset
      </Button>
    </div>
  );
};

export default PomodoroTimer;
