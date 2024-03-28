import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import List from '../../../components/general/List';
import { DutyStatus } from '../../../enums/dutyStatus';

describe('List Component', () => {
    const mockData = [
        { id: 1, name: 'Test Duty 1' },
        { id: 2, name: 'Test Duty 2' },
    ];

    const mockOnCheckboxChange = jest.fn();
    const mockOnDelete = jest.fn();
    const mockOnRestore = jest.fn();

    test('renders duties data correctly for pending status', () => {
        render(
            <List
                data={mockData}
                status={DutyStatus.PENDING}
                onCheckboxChange={mockOnCheckboxChange}
                onDelete={mockOnDelete}
                onRestore={mockOnRestore}
            />,
        );

        expect(screen.getByText('Test Duty 1')).toBeInTheDocument();
        expect(screen.getByText('Test Duty 2')).toBeInTheDocument();
        expect(screen.getAllByRole('checkbox').length).toBe(2);
    });

    test('renders empty state correctly for no data', () => {
        render(<List data={[]} status={DutyStatus.PENDING} />);

        expect(screen.getByText('No pending duties found')).toBeInTheDocument();
    });

    test('check action buttons for deleted status', () => {
        render(
            <List
                data={mockData}
                status={DutyStatus.DELETED}
                onCheckboxChange={mockOnCheckboxChange}
                onDelete={mockOnDelete}
                onRestore={mockOnRestore}
            />,
        );

        const firstDutyRestoreButton = screen.getAllByRole('button', { name: /restore/i })[0];
        fireEvent.click(firstDutyRestoreButton);

        expect(mockOnRestore).toHaveBeenCalledWith(mockData[0].id);

        const firstDutyDeleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
        fireEvent.click(firstDutyDeleteButton);

        expect(mockOnDelete).toHaveBeenCalledWith(mockData[0].id, true);
    });

    test('checkbox change triggers callback', () => {
        render(
            <List
                data={mockData}
                status={DutyStatus.PENDING}
                onCheckboxChange={mockOnCheckboxChange}
                onDelete={mockOnDelete}
                onRestore={mockOnRestore}
            />,
        );

        const firstDutyCheckbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(firstDutyCheckbox);

        expect(mockOnCheckboxChange).toHaveBeenCalledWith(mockData[0].id);
    });
});
