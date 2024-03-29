import { useState } from 'react';
import { DutyStatus } from '../../enums/dutyStatus';
import useDutyFetch from '../../hooks/useDutyFetch';
import { Flex, Input, Button, Spin, Form } from 'antd';
import List from '../general/List';
import { DutiesData } from '../../types/duty/response';
import axiosConfig from '../../config/axios';
import { AxiosError } from 'axios';
import { notifyError, notifySuccess } from '../../utils/notifications';

type DutiesProps = {
    status: DutyStatus;
    canAdd?: boolean;
};

const Duties = ({ status, canAdd }: DutiesProps) => {
    const [triggerFetch, setTriggerFetch] = useState(true);
    const { data, loading } = useDutyFetch<DutiesData[]>(status, triggerFetch);
    const [value, setValue] = useState<string>('');

    if(loading) return <Spin />;

    const toggleRefetch = () => setTriggerFetch(!triggerFetch);

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!value) {
            notifyError('Name can not be empty.');
            return;
        }
        axiosConfig
            .post('/duty', { name: value })
            .then(() => {
                notifySuccess('Duty added correctly.');
                setValue('');
                toggleRefetch();
            })
            .catch((err: AxiosError<string>) => notifyError(err.response?.statusText));
    };

    const handleCheckboxChange = (id: number) => {
        const newStatus = status === DutyStatus.PENDING ? DutyStatus.DONE : DutyStatus.PENDING;
        axiosConfig
            .put('/duty', { id, status: newStatus })
            .then(() => {
                notifySuccess(
                    `Duty ${newStatus === DutyStatus.DONE ? 'completed' : 'uncompleted'}.`,
                );
                toggleRefetch();
            })
            .catch((err: AxiosError<string>) => notifyError(err.response?.statusText));
    };

    const handleDelete = (id: number, fullDelete: boolean = false) => {
        axiosConfig
            .delete('/duty', { data: { id, fullDelete } })
            .then(() => {
                notifySuccess(`Duty ${fullDelete ? 'permanent' : ''} deleted correctly.`);
                toggleRefetch();
            })
            .catch((err: AxiosError<string>) => notifyError(err.response?.statusText));
    };

    const handleRestore = (id: number) => {
        axiosConfig
            .put('/duty', { id, status: DutyStatus.PENDING })
            .then(() => {
                notifySuccess('Duty restored correctly.');
                toggleRefetch();
            })
            .catch((err: AxiosError<string>) => notifyError(err.response?.statusText));
    };

    return (
        <>
            {canAdd && (
                <Form onSubmitCapture={submit}>
                    <Flex gap='middle'>
                        <Input
                            onChange={e => setValue(e.target.value)}
                            value={value}
                            placeholder='Duty name'
                            required
                        />
                        <Button htmlType='submit'>Add</Button>
                    </Flex>
                </Form>
            )}
            <List
                data={data}
                status={status}
                onCheckboxChange={handleCheckboxChange}
                onDelete={handleDelete}
                onRestore={handleRestore}
            />
        </>
    );
};

export default Duties;
