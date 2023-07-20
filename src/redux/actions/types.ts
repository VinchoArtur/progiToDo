export interface Task {
  id: string;
  title: string;
  dueDate: Date;
  description?: string;
  isClosest?: boolean;
}

export type RootStackParamList = {
  EditTask: {taskId: string};
  // Другие экраны и параметры
};
