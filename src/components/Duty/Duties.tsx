import { useState } from 'react';
import { DutyStatus } from '../../enums/dutyStatus';
import useDutyFetch from '../../hooks/useDutyFetch';
import { Flex, Input, Button, Spin, Form } from 'antd';
import List from '../general/List';
import { DutiesData } from '../../types/duty/response';
import { AxiosError } from 'axios';
import { notifyError, notifySuccess } from '../../utils/notifications';
import { createDuty, deleteDuty, updateDuty } from '../../requests/duty';

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
        createDuty(value)
            .then(() => {
                notifySuccess('Duty added correctly.');
                setValue('');
                toggleRefetch();
            })
            .catch((err: AxiosError<string>) => notifyError(err.response?.statusText));
    };

    const handleCheckboxChange = (id: number) => {
        const newStatus = status === DutyStatus.PENDING ? DutyStatus.DONE : DutyStatus.PENDING;
        updateDuty(id, newStatus)
            .then(() => {
                notifySuccess(
                    `Duty ${newStatus === DutyStatus.DONE ? 'completed' : 'uncompleted'}.`,
                );
                toggleRefetch();
            })
            .catch((err: AxiosError<string>) => notifyError(err.response?.statusText));
    };

    const handleDelete = (id: number, fullDelete: boolean = false) => {
        deleteDuty(id, fullDelete)
            .then(() => {
                notifySuccess(`Duty ${fullDelete ? 'permanently' : ''} deleted correctly.`);
                toggleRefetch();
            })
            .catch((err: AxiosError<string>) => notifyError(err.response?.statusText));
    };

    const handleRestore = (id: number) => {
        updateDuty(id, DutyStatus.PENDING)
            .then(() => {
                notifySuccess('Duty restored correctly.');
                toggleRefetch();
            })
            .catch((err: AxiosError<string>) => notifyError(err.response?.statusText));
    };

    return (
        <>
            {canAdd && (
                <Form onSubmitCapture={submit} className='add-duty'>
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
