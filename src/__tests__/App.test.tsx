import App from '../App';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../config/constants', () => ({
    MODE: 'development',
}));

test('Renders the main page', async () => {
    await waitFor(() => render(<App />));
    expect(true).toBeTruthy();
});
