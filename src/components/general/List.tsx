import { Card, Flex, Checkbox, Empty } from 'antd';
import { DutiesData } from '../../types/duty/response';

type ListProps = {
    data: DutiesData[] | null;
};

const List = (props: ListProps) => {
    return (
        <>
            {props.data?.length ? (
                props.data.map(d => (
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

export default List;
