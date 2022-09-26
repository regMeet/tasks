import {
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import { usePromise } from "promise-hooks-react";
import { ChangeEvent, useState } from "react";
import { getTasks } from "../api";
import TaskModal from "./TaskModal";

export function ShowTasks() {
  const [taskNumber, setTaskNumber] = useState(2);
  const [selectedTaskId, setSelectedTaskId] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [data, error, isLoading, reload] = usePromise(
    () => getTasks(taskNumber),
    [taskNumber]
  );

  const handleTaskNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    Number.isInteger(number) && number >= 0 && setTaskNumber(number);
  };

  const handleOpenTask = (taskId: number) => {
    setSelectedTaskId(taskId);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="center" marginTop={5}>
        <TextField
          id="standard-basic"
          label="Task number"
          placeholder="Insert task number.."
          variant="standard"
          autoFocus
          onChange={handleTaskNumberChange}
          value={taskNumber}
        />
      </Box>

      {data && (
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          marginTop={3}
        >
          {data?.map((t, i) => (
            <Grid item key={t.id} xs={12} sm={6} md={4}>
              <Paper
                sx={{ padding: 2, bgcolor: green[100] }}
                onClick={() => handleOpenTask(i)}
              >
                <Typography>Task #{t.id}</Typography>
                {t.title}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      {showModal && data && (
        <TaskModal
          onClose={() => setShowModal(false)}
          task={data[selectedTaskId]}
        />
      )}
    </Box>
  );
}
