import { Flex, Menu } from 'antd';
import { FileDoneOutlined, FileTextOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Duties from '../components/Duty/Duties';
import { DutyStatus } from '../enums/dutyStatus';
import { ItemType } from 'antd/es/menu/hooks/useItems';

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

type MenuKey = 'pending' | 'done' | 'trash';
const menuMapping: Record<MenuKey, DutyStatus> = {
    pending: DutyStatus.PENDING,
    done: DutyStatus.DONE,
    trash: DutyStatus.DELETED,
};

const List = () => {
    const [menu, setMenu] = useState<MenuKey>('pending');

    return (
        <Flex gap='middle' vertical align='center' className='main-container'>
            <h1>ToDo List</h1>
            <Menu
                items={items}
                mode='horizontal'
                selectedKeys={[menu]}
                onClick={e => setMenu(e.key as MenuKey)}
            />
            <Flex gap='middle' vertical>
                <Duties
                    status={menuMapping[menu]}
                    canAdd={menuMapping[menu] === DutyStatus.PENDING}
                />
            </Flex>
        </Flex>
    );
};

export default List;
