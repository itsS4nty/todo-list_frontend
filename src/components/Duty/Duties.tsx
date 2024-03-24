import { useState } from 'react';
import { DutyStatus } from '../../enums/dutyStatus';
import useDutyFetch from '../../hooks/useDutyFetch';
import { Flex, Input, Button } from 'antd';
import List from '../general/List';
import { DutiesData } from '../../types/duty/response';

type DutiesProps = {
    status: DutyStatus;
    canAdd?: boolean;
};

const Duties = (props: DutiesProps) => {
    const { data, error, loading } = useDutyFetch<DutiesData[]>(props.status);
    const [value, setValue] = useState<string>();

    const onClick = () => {
        if (!value) return;
        setValue('');
    };

    return (
        <>
            {props.canAdd && (
                <Flex gap='middle'>
                    <Input onChange={e => setValue(e.target.value)} value={value} />
                    <Button onClick={onClick}>Add</Button>
                </Flex>
            )}
            <List data={data} />
        </>
    );
};

export default Duties;
