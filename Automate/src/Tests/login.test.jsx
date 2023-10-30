import React from "react";
import Login from "../components/Login";
import { render, fireEvent, waitFor } from "@testing-library/react";

// Mock the dependencies (you can adjust them as needed)
jest.mock("./UserAuth", () => ({
  useUserAuth: () => ({
    logIn: async (email, password) => {
      // Mock the login function
      if (email === "test@example.com" && password === "password") {
        return;
      } else {
        throw new Error("Login failed");
      }
    },
  }),
}));

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"), // Use the actual implementation for other components
//   Link: ({ to, children }) => <a href={to}>{children}</a>, // Mock the Link component
// }));

describe("Login Component", () => {
  it("renders the login form", () => {
    const { getByLabelText, getByText, getByPlaceholderText } = render(
      <Login />
    );

    const emailInput = getByPlaceholderText("City College Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailInput = getByPlaceholderText("City College Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      // Implement assertions based on your expected behavior
      // For example, check if the navigation to the home page is happening as expected
    });
  });
});
