import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserAuthContextProvider, useUserAuth } from "../components/UserAuth";

const mockFunction = vi.fn(async (f, p) => {
    try {
        return await f(...p);
    } catch (error) {
        return error;
    }
});



describe('UserAuth', () => {
    describe('firebase-login', () => {
        describe('invalid-input', () => {
            test('username', async () => {
                const TestUserAuthInvalidUsername = () => {
                    const { user, logIn, signUp, logOut } = useUserAuth();
                    const testfunc = async () => {
                        mockFunction(logIn, ['a', 'b']);
                    };

                    return (
                        <div>
                            <button onClick={testfunc} aria-label="login">
                                Login
                            </button>
                        </div>
                    );
                };

                render(
                    <UserAuthContextProvider>
                        <TestUserAuthInvalidUsername/>
                    </UserAuthContextProvider>
                )

                const loginButton = screen.getByRole("button", { name: "login" });
                fireEvent.click(loginButton);
                await new Promise((cb) => setTimeout(cb, 0.5 * 1000));
                expect(mockFunction.mock.results[0].value.toString()).toContain('FirebaseError: Firebase: Error (auth/invalid-email)');
            });
        });
    });
});
