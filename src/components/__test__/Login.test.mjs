// Login.test.js

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For expect extensions

// Import the component to be tested
import Login from "./Login";

// Mock the useUserAuth hook
jest.mock("./UserAuth", () => ({
  useUserAuth: () => ({
    logIn: jest.fn(),
  }),
}));

describe("Login component", () => {
  test("renders without errors", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("login-1")).toBeInTheDocument();
  });

  test("handles form submission", async () => {
    const { getByTestId, getByLabelText } = render(<Login />);

    // Mock the logIn function
    const logInMock = jest.fn().mockResolvedValueOnce();
    jest.mock("./UserAuth", () => ({
      useUserAuth: () => ({
        logIn: logInMock,
      }),
    }));

    // Fill in the form
    fireEvent.change(getByLabelText(/username/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Trigger form submission
    fireEvent.submit(getByTestId("login-button"));

    // Wait for the asynchronous submission to complete
    await waitFor(() => {
      expect(logInMock).toHaveBeenCalledWith("test@example.com", "password123");
      // You can also add more assertions based on your component behavior
    });
  });
});
