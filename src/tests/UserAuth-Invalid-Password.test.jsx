import { describe, expect, test, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserAuthContextProvider, useUserAuth } from "../components/UserAuth";


let mockLogIn = vi.fn(async (f, u, p) => {
    try {
        return await f(u, p);
    } catch (error) {
        return error;
    }
});


describe('UserAuth', () => {
    afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = '';
    });

    describe('firebase-login', () => {
        describe('invalid-input', () => {
            test('password', async () => {
                const TestUserAuthInvalidUsername = () => {
                    const { user, logIn, signUp, logOut } = useUserAuth();
                    const testfunc = async () => {
                        mockLogIn(logIn, 'test@test.com', 'b');
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
                await new Promise((cb) => setTimeout(cb, 2 * 1000));
                expect(mockLogIn.mock.results[0].value.toString()).toContain('FirebaseError: Firebase: Error (auth/invalid-login-credentials)');
            });
        });
    });
});
