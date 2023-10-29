import Signup from "../components/Signup";
import { UserAuthContextProvider } from '../components/UserAuth';
import { MemoryRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { describe, expect, it, test, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from '../pages/Home';
import Navbar from "../components/Navbar";



describe("#Component Testings", () => {
    // unit tests:
    test("Signup button is shown", () => {
        render(
        <BrowserRouter>
            <UserAuthContextProvider>
                <Signup />
            </UserAuthContextProvider>
        </BrowserRouter>
        );
        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toBeInTheDocument();
    });

    test("Sign up inputs are initially empty", () => {
        render(
            <BrowserRouter>
                <UserAuthContextProvider>
                    <Signup />
                </UserAuthContextProvider>
            </BrowserRouter>
        );
        const usernameElement = screen.getByPlaceholderText(/email/i);
        const passwordElement = screen.getByPlaceholderText(/password/i);
        expect(usernameElement.value).toBe("");
        expect(passwordElement.value).toBe("");
    });

    test("Login button is shown", () => {
        render(
            <BrowserRouter>
                <UserAuthContextProvider>
                    <Login />
                </UserAuthContextProvider>
            </BrowserRouter>
        );
        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toBeInTheDocument();
    });

    test("Login inputs are initially empty", () => {
        render(
            <BrowserRouter>
                <UserAuthContextProvider>
                    <Login />
                </UserAuthContextProvider>
            </BrowserRouter>
        );
        const usernameElement = screen.getByPlaceholderText(/email/i);
        const passwordElement = screen.getByPlaceholderText(/password/i);
        expect(usernameElement.value).toBe("");
        expect(passwordElement.value).toBe("");
    });

    // Sign up should handle invalid input
    test("Signup handles invalid input", async () => {
        render(
            <UserAuthContextProvider>
            <MemoryRouter initialEntries={['/signup']}> 
                <Routes>
                    <Route path="/signup" element={ <Signup /> } />
                    <Route path="/login" element={ <Login /> } />
                </Routes>
            </MemoryRouter>
        </UserAuthContextProvider>
        );
        const usernameElement = screen.getByPlaceholderText(/email/i);
        const passwordElement = screen.getByPlaceholderText(/password/i);
        const buttonElement = screen.getByRole("button");
        fireEvent.change(usernameElement, {target: {value: "test"}}); // invalid email format
        fireEvent.change(passwordElement, {target: {value: "123456"}});
        fireEvent.click(buttonElement);

        await waitFor(() => {
            const signupHeading = screen.getByTestId("signup-heading"); //fail to redirect to login because sign up failed
            expect(signupHeading).toBeInTheDocument();
        });
    });

    // Login should handle invalid input
    test("Login handles invalid input", async () => {
        render(
            <BrowserRouter>
                <UserAuthContextProvider>
                    <Login />
                </UserAuthContextProvider>
            </BrowserRouter>
        );
        const usernameElement = screen.getByPlaceholderText(/email/i);
        const passwordElement = screen.getByPlaceholderText(/password/i);
        const buttonElement = screen.getByRole("button");
        fireEvent.change(usernameElement, {target: {value: "IDontExists@example.com"}}); // an user that doesn't exists
        fireEvent.change(passwordElement, {target: {value: "987654321"}});
        fireEvent.click(buttonElement);

        await waitFor(() => {
            const loginError = screen.getByTestId("login-error"); // error message shows
            expect(loginError).toBeVisible();
        });
    });

    // Expected behavior of sign up
    test("Sign up is successful", async () => {
        render(
        <UserAuthContextProvider>
            <MemoryRouter initialEntries={['/signup']}> 
                <Routes>
                    <Route path="/signup" element={ <Signup /> } />
                    <Route path="/login" element={ <Login /> } />
                </Routes>
            </MemoryRouter>
        </UserAuthContextProvider>
        );
        const usernameElement = screen.getByPlaceholderText(/email/i);
        const passwordElement = screen.getByPlaceholderText(/password/i);
        const buttonElement = screen.getByRole("button");
        fireEvent.change(usernameElement, {target: {value: "testUser@example.com"}});
        fireEvent.change(passwordElement, {target: {value: "123456789"}});
        fireEvent.click(buttonElement);

        await waitFor(() => {
            const loginPageHeading = screen.getByTestId("login-1"); //upon success, should redirect to login page
            expect(loginPageHeading).toBeInTheDocument();
        });
    });

    // Expected Behavior of Login and Logout
    test("Login is successful", async () => {
        render(
        <UserAuthContextProvider>
            <MemoryRouter initialEntries={['/login']}> 
                <Navbar />
                <Routes>
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
                    <Route path="/signup" element={ <Signup /> } />
                </Routes>
            </MemoryRouter>
        </UserAuthContextProvider>
        );
        const usernameElement = screen.getByPlaceholderText(/email/i);
        const passwordElement = screen.getByPlaceholderText(/password/i);
        const buttonElement = screen.getByTestId("login-button");
        fireEvent.change(usernameElement, {target: {value: "testUser@example.com"}});
        fireEvent.change(passwordElement, {target: {value: "123456789"}});
        fireEvent.click(buttonElement);

        await waitFor(() => {
            const homePageHeading = screen.getByTestId("home-1"); //upon success, should redirect to home page
            expect(homePageHeading).toBeInTheDocument();
        });

        const logoutElement = screen.getByTestId("logout");
        fireEvent.click(logoutElement);

        await waitFor(() => {
            const signupPageHeading = screen.getByTestId("signup-heading");
            expect(signupPageHeading).toBeInTheDocument(); // upon logout, user will be redirected to sign up page
        });
    });


    // Integration Test between Login component, Signup component, and Home page component
    test("Integration Test: User sign up successfully, and login in the user successfully, redirected to home page", async () => {
        render(
        <UserAuthContextProvider>
            <MemoryRouter initialEntries={['/signup']}> 
                <Routes>
                    <Route path="/signup" element={ <Signup /> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
                </Routes>
            </MemoryRouter>
        </UserAuthContextProvider>
        );
        const buttonElement = screen.getByRole("button");
        const usernameElement = screen.getByPlaceholderText(/email/i);
        const passwordElement = screen.getByPlaceholderText(/password/i);

        const usernameValue = "test@example.com";
        const passwordValue = "123456789";

        fireEvent.change(usernameElement, {target: {value: usernameValue}});
        fireEvent.change(passwordElement, {target: {value: passwordValue}});
        fireEvent.click(buttonElement);

        expect(usernameElement.value).toBe(usernameValue);
        expect(passwordElement.value).toBe(passwordValue);
        await waitFor(() => {
            const loginPageHeading = screen.getByTestId("login-1");
            expect(loginPageHeading).toBeInTheDocument();
        });

        const loginButtonElement = screen.getByRole("button");
        const loginUsernameElement = screen.getByPlaceholderText(/email/i);
        const loginPasswordElement = screen.getByPlaceholderText(/password/i);
        
        fireEvent.change(loginUsernameElement, {target: {value: usernameValue}});
        fireEvent.change(loginPasswordElement, {target: {value: passwordValue}});
        fireEvent.click(loginButtonElement);

        expect(loginUsernameElement.value).toBe(usernameValue);
        expect(loginPasswordElement.value).toBe(passwordValue);
        await waitFor(() => {
            const homePageHeading = screen.getByTestId("home-1");
            expect(homePageHeading).toBeInTheDocument();
        });
    });

    /* Integration Test handling error condition: sign up using an email already in use will fail, user should be able to
            use "Already have an Account? Login" to redirect to login page
    */
    test("Integration Test: Sign Up using an email already in use, redirect to login page", async () => {
        render(
        <UserAuthContextProvider>
            <MemoryRouter initialEntries={['/signup']}> 
                <Routes>
                    <Route path="/signup" element={ <Signup /> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
                </Routes>
            </MemoryRouter>
        </UserAuthContextProvider>
        );
        const buttonElement = screen.getByRole("button");
        const usernameElement = screen.getByPlaceholderText(/email/i);
        const passwordElement = screen.getByPlaceholderText(/password/i);
        const usernameValue = "test@example.com";
        const passwordValue = "123456789";

        fireEvent.change(usernameElement, {target: {value: usernameValue}});
        fireEvent.change(passwordElement, {target: {value: passwordValue}});
        fireEvent.click(buttonElement);
        await waitFor(() => {
            const errorElement = screen.getByTestId("signup-error");
            expect(errorElement).toBeVisible();
        });

        const redirectLinkElement = screen.getByTestId("redirectLink");
        fireEvent.click(redirectLinkElement);
        const loginHeading = screen.getByTestId("login-1");
        expect(loginHeading).toBeInTheDocument();
    });
});