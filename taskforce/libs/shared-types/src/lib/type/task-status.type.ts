import { TaskStatusEnum } from "../enum/task-status.enum";

export type TaskStatusType = typeof TaskStatusEnum[keyof typeof TaskStatusEnum];
