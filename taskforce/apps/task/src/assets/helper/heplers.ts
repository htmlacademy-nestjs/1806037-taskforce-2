import { TaskStatusEnum } from "@taskforce/shared-types";

export const checkUpdateStatusTaskFn = (currentStatus: string, newStatus: string): boolean | string => {
  if (currentStatus === TaskStatusEnum.New) {
    switch (newStatus) {
      case TaskStatusEnum.New: return `It is not possible to update the current status: «${currentStatus}» to the status: «${TaskStatusEnum.New}»`;
      case TaskStatusEnum.Realized: return `It is not possible to update the current status: «${currentStatus}» to the status: «${TaskStatusEnum.Realized}»`;
      case TaskStatusEnum.Failed: return `It is not possible to update the current status: «${currentStatus}» to the status: «${TaskStatusEnum.Failed}»`;
    }
  }
  if (currentStatus === TaskStatusEnum.Working) {
    switch (newStatus) {
      case TaskStatusEnum.New: return `It is not possible to update the current status: «${currentStatus}» to the status: «${TaskStatusEnum.New}»`;
      case TaskStatusEnum.Working: return `It is not possible to update the current status: «${currentStatus}» to the status: «${TaskStatusEnum.Working}»`;
      case TaskStatusEnum.Cancelled: return `It is not possible to update the current status: «${currentStatus}» to the status: «${TaskStatusEnum.Cancelled}»`;
    }
  }
  if (currentStatus === TaskStatusEnum.Realized || currentStatus === TaskStatusEnum.Failed || currentStatus === TaskStatusEnum.Cancelled) {
    return 'It is not possible to update the current status, it is final';
  }

  return true;
};
