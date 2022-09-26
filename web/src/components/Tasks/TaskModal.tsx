import { Task } from "../types";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { updateTask } from "../api";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  onClose: () => void;
  task: Task;
}

export default function TaskModal({ task, onClose }: Props) {
  const handleCompleteTask = async () => {
    await updateTask(task.id);
    onClose();
    console.log("task id:", task.id, " completed");
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Task number: {task.id}
        </Typography>
        <Typography sx={{ mt: 2 }}>Description: {task.title}</Typography>

        <Stack direction="row" spacing={2} marginTop={3} justifyContent="end">
          <Button variant="contained" size="small" onClick={handleCompleteTask}>
            Complete
          </Button>
          <Button variant="outlined" size="small" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
