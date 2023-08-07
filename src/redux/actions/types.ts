export interface Task {
  id: string;
  eventId?: string | null;
  title: string;
  startDate: Date | string;
  dueDate: Date | string;
  description?: string;
  isClosest?: boolean;
  notificationTime?: number
}

export type RootStackParamList = {
  EditTask: {taskId: string};
  // Другие экраны и параметры
};
