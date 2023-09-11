export interface Task {
  id: string;
  eventId?: string | null;
  title: string;
  startDate: Date | string;
  dueDate: Date | string;
  description?: string;
  isClosest?: boolean;
  notificationTime?: number;
  startReminder?: number;
  endReminder?: number;
  groupId?: string;
  group?: TaskGroup;
}

export interface TaskGroup {
  groupId: string;
  groupName: string;
  tasks: Task[]
}

export type RootStackParamList = {
  EditTask: {taskId: string};
  CreateGroup: {};
  // Другие экраны и параметры
};
