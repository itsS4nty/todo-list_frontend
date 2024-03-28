import { Card, Flex, Checkbox, Empty, Button, Input } from 'antd';
import { DutiesData } from '../../types/duty/response';
import { DutyStatus } from '../../enums/dutyStatus';
import { RedoOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';

type ListProps = {
    data: DutiesData[] | null;
    status: DutyStatus;
    onCheckboxChange?: (id: number) => void;
    onDelete?: (id: number, fullDelete?: boolean) => void;
    onRestore?: (id: number) => void;
};

const List = ({ data, status, onCheckboxChange, onDelete, onRestore }: ListProps) => {
    const descriptions: Record<DutyStatus, string> = {
        [DutyStatus.DONE]: 'No done duties found',
        [DutyStatus.PENDING]: 'No pending duties found',
        [DutyStatus.DELETED]: 'No deleted duties found',
    };

    return (
        <>
            {data?.length ? (
                data.map(duty => (
                    <Card key={duty.id} style={{ minWidth: 300, width: 'fit-content' }}>
                        <Flex justify='space-between'>
                            <span>{duty.name}</span>
                            <Flex gap={8}>
                                {status !== DutyStatus.DELETED ? (
                                    <Checkbox
                                        checked={status === DutyStatus.DONE}
                                        onChange={() => onCheckboxChange?.(duty.id)}
                                    />
                                ) : (
                                    <Button
                                        icon={<RedoOutlined />}
                                        onClick={() => onRestore?.(duty.id)}
                                    />
                                )}
                                <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                        onDelete?.(duty.id, status === DutyStatus.DELETED)
                                    }
                                />
                            </Flex>
                        </Flex>
                    </Card>
                ))
            ) : (
                <Empty description={descriptions[status]} />
            )}
        </>
    );
};

export default List;
