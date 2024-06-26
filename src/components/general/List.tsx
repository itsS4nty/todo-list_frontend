import { Card, Flex, Checkbox, Empty, Button } from 'antd';
import { DutiesData } from '../../types/duty/response';
import { DutyStatus } from '../../enums/dutyStatus';
import { RedoOutlined, DeleteOutlined } from '@ant-design/icons';

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
                    <Card key={duty.id} className='duty-card'>
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
                                        aria-label='Restore'
                                    />
                                )}
                                <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                        onDelete?.(duty.id, status === DutyStatus.DELETED)
                                    }
                                    aria-label='Delete'
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
