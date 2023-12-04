import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For expect extensions
import { act } from "react-dom/test-utils";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { MemoryRouter, Route } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

jest.mock("firebase/auth", () => ({
  sendPasswordResetEmail: jest.fn(),
}));

jest.mock("../firebase", () => ({
  auth: jest.fn(),
}));

describe("ForgotPassword component", () => {
  it("renders without errors", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    expect(getByTestId("login-1")).toBeInTheDocument();
  });

  it("handles form submission and shows success message", async () => {
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter initialEntries={["/forgot-password"]}>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
      </MemoryRouter>
    );

    // Mocking Firebase auth
    auth.mockReturnValue({});

    // Fill in the form
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    // Mocking sendPasswordResetEmail
    sendPasswordResetEmail.mockResolvedValueOnce();

    // Trigger form submission
    fireEvent.submit(getByTestId("login-button"));

    // Wait for the asynchronous submission to complete
    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        expect.any(Object),
        "test@example.com"
      );
    });

    // You may need to adjust this assertion based on your actual component behavior
    expect(window.alert).toHaveBeenCalledWith(
      "Password reset completed, check your email."
    );
  });

  it("handles form submission and shows error message", async () => {
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter initialEntries={["/forgot-password"]}>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
      </MemoryRouter>
    );

    // Mocking Firebase auth
    auth.mockReturnValue({});

    // Fill in the form
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    // Mocking sendPasswordResetEmail with an error
    sendPasswordResetEmail.mockRejectedValueOnce(new Error("Test error"));

    // Trigger form submission
    fireEvent.submit(getByTestId("login-button"));

    // Wait for the asynchronous submission to complete
    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        expect.any(Object),
        "test@example.com"
      );
    });

    // You may need to adjust this assertion based on your actual component behavior
    expect(window.alert).toHaveBeenCalledWith("Test error");
  });
});
