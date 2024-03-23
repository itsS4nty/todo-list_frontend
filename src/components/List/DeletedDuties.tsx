import { Flex, Card, Checkbox, Empty } from 'antd';
import useFetch from '../../hooks/useFetch';
import { DutiesData } from '../../types/duty/response';

const DeletedDuties = () => {
    const { data, error, loading } = useFetch<DutiesData[]>('/duty?deleted=true');

    return (
        <>
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

export default DeletedDuties;
