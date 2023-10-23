import { describe, expect, test } from 'vitest';
import { render, screen, getByLabelText, getByRole } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserAuthContextProvider } from "../components/UserAuth";
import Login from '../components/Login';

describe('Login', () => {
    test('Render', () => {
        render(
            <BrowserRouter>
                <UserAuthContextProvider>
                    <Login />
                </UserAuthContextProvider>
            </BrowserRouter>
        );

        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });
});
