import axiosConfig from '../config/axios';
import { DutyStatus } from '../enums/dutyStatus';

export const createDuty = (name: string) => axiosConfig.post('/duty', { name });

export const updateDuty = (id: number, status: DutyStatus) =>
    axiosConfig.put('/duty', { id, status });

export const deleteDuty = (id: number, fullDelete: boolean) =>
    axiosConfig.delete('/duty', { data: { id, fullDelete } });
