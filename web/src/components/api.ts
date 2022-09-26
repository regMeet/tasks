import axios from "axios";
import { Task } from "./types";

const URL = "http://localhost:8080/tasks";

export const getTasks = async (count: number = 1) => {
  const { data } = await axios.get<Task[]>(URL, {
    params: {
      count,
    },
  });
  return data;
};

export const updateTask = async (taskId: number) => {
  const { data } = await axios.put<Task[]>(`${URL}/${taskId}`);
  return data;
};
