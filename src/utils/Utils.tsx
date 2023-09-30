import { Task } from "../redux/actions/types";

export const ReceiveNameTasks = (tasks: Task[]): string[] => tasks.map(({ title }) => title);
export const ReceiveTasksByName = (taskName: string[], tasks: Task[]): Task[] => {
  return tasks.filter(task => taskName.includes(task.title));
}


