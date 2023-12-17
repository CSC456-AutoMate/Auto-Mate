import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useUserAuth } from "./UserAuth";

jest.mock("./UserAuth");

describe("ProtectedRoute component", () => {
  it("renders children when user is authenticated", () => {
    // Mock user authentication to simulate an authenticated user
    useUserAuth.mockReturnValueOnce({
      user: {
        /* mock user data */
      },
    });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Check if the protected content is rendered
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });

  it("redirects to signup when user is not authenticated", () => {
    // Mock user authentication to simulate a non-authenticated user
    useUserAuth.mockReturnValueOnce({ user: null });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Route path="/signup">
          <div data-testid="signup-page">Signup Page</div>
        </Route>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Check if the component redirects to the signup page
    expect(screen.getByTestId("signup-page")).toBeInTheDocument();
  });
});
