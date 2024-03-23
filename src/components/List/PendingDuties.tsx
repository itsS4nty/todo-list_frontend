import { Flex, Input, Button, Card, Checkbox, Empty } from 'antd';
import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { DutiesData } from '../../types/duty/response';

const PendingDuties = () => {
    // const [data, setData] = useState<string[]>([]);
    const { data, error, loading } = useFetch<DutiesData[]>('/duty?deleted=false');
    const [value, setValue] = useState<string>();

    const onClick = () => {
        if (!value) return;
        // setData([...data, value]);
        setValue('');
    };

    return (
        <>
            <Flex gap='middle'>
                <Input onChange={e => setValue(e.target.value)} value={value} />
                <Button onClick={onClick}>Add</Button>
            </Flex>
            {data?.length ? (
                data.map(d => (
                    <Card key={d.id}>
                        <Flex justify='space-between'>
                            {d.name}
                            <Checkbox />
                        </Flex>
                    </Card>
                ))
            ) : (
                <Empty />
            )}
        </>
    );
};

export default PendingDuties;
