import { Card, Flex, Checkbox, Empty } from 'antd';
import { DutiesData } from '../../types/duty/response';
import { DutyStatus } from '../../enums/dutyStatus';

type ListProps = {
    data: DutiesData[] | null;
    status: DutyStatus;
    onCheckboxClick?: (id: number) => void;
    onTrashClick?: (id: number) => void;
    onRestoreClick?: (id: number) => void;
};

const List = (props: ListProps) => {
    return (
        <>
            {props.data?.length ? (
                props.data.map(d => (
                    <Card key={d.id}>
                        <Flex justify='space-between'>
                            {d.name}
                            <Checkbox checked={props.status === DutyStatus.COMPLETED}  />
                        </Flex>
                    </Card>
                ))
            ) : (
                <Empty />
            )}
        </>
    );
};

export default List;
