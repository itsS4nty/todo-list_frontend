import { Button, Card, Checkbox, Empty, Flex, Input, Menu, MenuProps } from 'antd';
import { FileDoneOutlined, FileTextOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Duties from '../components/Duty/Duties';
import { DutyStatus } from '../enums/dutyStatus';
import { ItemType, MenuDividerType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { assertNever } from '../utils/never';

const items: ItemType[] = [
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
                return <Duties status={DutyStatus.PENDING} canAdd />;
            case 'done':
                return <Duties status={DutyStatus.COMPLETED} />;
            case 'trash':
                return <Duties status={DutyStatus.DELETED} />;
            default:
                assertNever(menu as never);
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
