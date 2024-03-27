import { notification } from 'antd';

export const notifySuccess = (message: string, description?: string) => {
  notification.success({ message, description });
};

export const notifyError = (message: string = 'Something went wrong!', description?: string) => {
  notification.error({ message, description });
};
