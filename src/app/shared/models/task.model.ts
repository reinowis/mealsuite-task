export type Task = {
  id: string;
  description: string;
  assigneeId: string;
  completed: boolean;
};

export type User = {
  id: string;
  name: string;
};