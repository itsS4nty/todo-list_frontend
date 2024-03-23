import { Button, Card, Checkbox, Empty, Flex, Input, Menu, MenuProps } from 'antd';
import { FileDoneOutlined, FileTextOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import PendingDuties from '../components/List/PendingDuties';
import DeletedDuties from '../components/List/DeletedDuties';

const items: MenuProps['items'] = [
    {
        label: 'Pending',
        key: 'pending',
        icon: <FileTextOutlined />,
    },
    {
        label: 'Done',
        key: 'done',
        icon: <FileDoneOutlined />,
    },
    {
        label: 'Trash',
        key: 'trash',
        icon: <DeleteOutlined />,
    },
];

const List = () => {
    const [menu, setMenu] = useState('pending');

    const getList = () => {
        switch (menu) {
            case 'pending':
                return <PendingDuties />;
            case 'trash':
                return <DeletedDuties />;
            default:
                return <span>{menu}</span>;
        }
    };

    return (
        <Flex gap='middle' vertical align='center'>
            <h1>ToDo List</h1>
            <Menu
                items={items}
                mode='horizontal'
                selectedKeys={[menu]}
                onClick={e => setMenu(e.key)}
            />
            <Flex gap='middle' vertical>
                {getList()}
            </Flex>
        </Flex>
    );
};

export default List;
