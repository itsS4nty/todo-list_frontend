import { render, screen, waitFor } from '@testing-library/react';
import Router from '../../router/Router'; // Update the import path as necessary
import { JSX } from 'react/jsx-runtime';
import '@testing-library/jest-dom';

jest.mock('../../config/constants', () => ({
    MODE: 'development',
}));

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui);
};

describe('Router', () => {
    test('renders List component for root route', async () => {
        await waitFor(() => renderWithRouter(<Router />, { route: '/' }));
        expect(screen.getByText('ToDo List')).toBeInTheDocument();
    });

    test('renders Not found message for unmatched route', async () => {
        await waitFor(() => renderWithRouter(<Router />, { route: '/some-random-route' }));
        expect(screen.getByText('Not found')).toBeInTheDocument();
    });
});
