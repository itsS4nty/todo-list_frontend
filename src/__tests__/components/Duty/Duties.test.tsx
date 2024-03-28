import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Duties from '../../../components/Duty/Duties';
import axiosConfig from '../../../config/axios';
import { DutyStatus } from '../../../enums/dutyStatus';
import * as notifications from '../../../utils/notifications';
import useDutyFetch from '../../../hooks/useDutyFetch';

jest.mock('../../../config/axios');
jest.mock('../../../hooks/useDutyFetch');
jest.mock('../../../utils/notifications');
jest.mock('../../../config/constants', () => ({
    MODE: 'development',
}));

describe('Duties Component', () => {
    const mockDutiesData = [
        { id: 1, name: 'Test Duty 1', status: DutyStatus.PENDING },
        { id: 2, name: 'Test Duty 2', status: DutyStatus.DONE },
    ];

    beforeEach(() => {
        (useDutyFetch as jest.Mock).mockImplementation(() => ({
            data: mockDutiesData,
            loading: false,
        }));
        jest.spyOn(notifications, 'notifyError').mockClear();
        jest.spyOn(notifications, 'notifySuccess').mockClear();
    });

    test('submits form and adds a duty successfully', async () => {
        (axiosConfig.post as jest.Mock).mockResolvedValue({ data: 'Success' });
        render(<Duties status={DutyStatus.PENDING} canAdd={true} />);

        fireEvent.change(screen.getByPlaceholderText('Duty name'), {
            target: { value: 'New Duty' },
        });
        fireEvent.click(screen.getByRole('button', { name: /add/i }));

        await waitFor(() => expect(axiosConfig.post).toHaveBeenCalled());
        expect(notifications.notifySuccess).toHaveBeenCalledWith('Duty added correctly.');
    });

    test('displays error notification on form submit failure', async () => {
        (axiosConfig.post as jest.Mock).mockRejectedValue({ response: { statusText: 'Error' } });
        render(<Duties status={DutyStatus.PENDING} canAdd={true} />);

        fireEvent.change(screen.getByPlaceholderText('Duty name'), {
            target: { value: 'New Duty' },
        });
        fireEvent.click(screen.getByRole('button', { name: /add/i }));

        await waitFor(() => expect(axiosConfig.post).toHaveBeenCalled());
        expect(notifications.notifyError).toHaveBeenCalledWith('Error');
    });

    // Test checkbox functionality
    test('toggles duty status on checkbox change', async () => {
        const mockPut = (axiosConfig.put as jest.Mock).mockResolvedValue({ data: 'Success' });
        render(<Duties status={DutyStatus.PENDING} />);

        const checkbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(checkbox);

        await waitFor(() => expect(mockPut).toHaveBeenCalled());
        expect(notifications.notifySuccess).toHaveBeenCalledWith(expect.any(String));
    });

    // Test delete button functionality
    test('deletes a duty on delete button click', async () => {
        (axiosConfig.delete as jest.Mock).mockResolvedValue({ data: 'Success' });
        render(<Duties status={DutyStatus.PENDING} />);

        const deleteButton = screen.getAllByLabelText('Delete')[0]; // Assuming 'Delete' is visible text on the button
        fireEvent.click(deleteButton);

        await waitFor(() => expect(axiosConfig.delete).toHaveBeenCalled());
        expect(notifications.notifySuccess).toHaveBeenCalledWith(expect.any(String));
    });

    // Test restore button functionality for deleted duties
    test('restores a duty on restore button click', async () => {
        (axiosConfig.put as jest.Mock).mockResolvedValue({ data: 'Success' });
        render(<Duties status={DutyStatus.DELETED} />);

        const restoreButton = screen.getAllByLabelText('Restore')[0]; // Assuming 'Restore' is visible text on the button
        fireEvent.click(restoreButton);

        await waitFor(() => expect(axiosConfig.put).toHaveBeenCalled());
        expect(notifications.notifySuccess).toHaveBeenCalledWith('Duty restored correctly.');
    });
});
