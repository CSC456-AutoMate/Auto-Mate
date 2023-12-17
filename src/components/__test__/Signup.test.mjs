import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For expect extensions
import { act } from "react-dom/test-utils";
import { useUserAuth } from "./UserAuth";
import { MemoryRouter, Route } from "react-router-dom";
import Signup from "./Signup";

jest.mock("./UserAuth");

describe("Signup component", () => {
  it("renders without errors", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    expect(getByTestId("signup-heading")).toBeInTheDocument();
  });

  it("handles form submission and redirects to login on success", async () => {
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Route path="/login">
          <div data-testid="login-page">Login Page</div>
        </Route>
        <Signup />
      </MemoryRouter>
    );

    // Mock user signUp function
    const mockSignUp = jest.fn().mockResolvedValueOnce();

    // Mock useUserAuth hook
    useUserAuth.mockReturnValueOnce({ signUp: mockSignUp });

    // Fill in the form
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Trigger form submission
    fireEvent.submit(getByTestId("signup-button"));

    // Wait for the asynchronous submission to complete
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });

    // Check if the component redirects to the login page
    expect(getByTestId("login-page")).toBeInTheDocument();
  });

  it("handles form submission and shows error message on failure", async () => {
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Signup />
      </MemoryRouter>
    );

    // Mock user signUp function with an error
    const mockSignUp = jest.fn().mockRejectedValueOnce(new Error("Test error"));

    // Mock useUserAuth hook
    useUserAuth.mockReturnValueOnce({ signUp: mockSignUp });

    // Fill in the form
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Trigger form submission
    fireEvent.submit(getByTestId("signup-button"));

    // Wait for the asynchronous submission to complete
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });

    // Check if the error message is displayed
    expect(getByTestId("signup-error")).toHaveTextContent("Sign up error");
  });
});
