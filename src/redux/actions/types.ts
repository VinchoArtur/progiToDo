export interface Task {
  id: string;
  title: string;
  dueDate: Date;
  isClosest: boolean;
}

export type RootStackParamList = {
  EditTask: {taskId: string};
  // Другие экраны и параметры
};
