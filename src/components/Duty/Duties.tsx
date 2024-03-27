import { useState } from 'react';
import { DutyStatus } from '../../enums/dutyStatus';
import useDutyFetch from '../../hooks/useDutyFetch';
import { Flex, Input, Button } from 'antd';
import List from '../general/List';
import { DutiesData } from '../../types/duty/response';
import axiosConfig from '../../config/axios';

type DutiesProps =
    | {
          status: Exclude<DutyStatus, DutyStatus.DELETED>;
          onCheckboxClick: (id: number) => void;
          onTrashClick: (id: number) => void;
          canAdd?: boolean;
      }
    | {
          status: DutyStatus.DELETED;
          canAdd: false;
          onRestoreClick: (id: number) => void;
      };

const Duties = (props: DutiesProps) => {
    const { data, error, loading } = useDutyFetch<DutiesData[]>(props.status);
    const [value, setValue] = useState<string>();

    const onClickAdd = () => {
        if (!value) return;
        axiosConfig.post('/duty', { name: value });
        setValue('');
    };

    return (
        <>
            {props.canAdd && (
                <Flex gap='middle'>
                    <Input onChange={e => setValue(e.target.value)} value={value} />
                    <Button onClick={onClickAdd}>Add</Button>
                </Flex>
            )}
            <List data={data} status={props.status} />
        </>
    );
};

export default Duties;
