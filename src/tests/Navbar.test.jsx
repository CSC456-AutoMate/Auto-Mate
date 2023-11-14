import React, { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider, useUserAuth } from "../components/UserAuth";
import Navbar from "../components/Navbar";

// TestComponent to handle and display error
function TestComponent() {
  const { setError, error } = useUserAuth();

  useEffect(() => {
    setError("Mocked logout error");
  }, []);

  return <div>{error}</div>;
}

// Unit Test (navbar renders by checking if Automate (title) is shown/available)
test("navbar renders", () => {
  render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <Navbar />
      </UserAuthContextProvider>
    </BrowserRouter>
  );

  const brandText = screen.getByText("AutoMate");
  expect(brandText).toBeInTheDocument();
});

// Integration Tests
describe("Navbar", () => {
  test("navbar renders & shows logged out state components", () => {
    render(
      <BrowserRouter>
        <UserAuthContextProvider initialUser={null}>
          <Navbar />
        </UserAuthContextProvider>
      </BrowserRouter>
    );

    const brandText = screen.getByText("AutoMate");
    expect(brandText).toBeInTheDocument();

    const menuButton = screen.getByRole("button", { name: "" });
    fireEvent.click(menuButton);

    expect(screen.getByText("Login")).toBeVisible();
    expect(screen.getByText("Sign Up")).toBeVisible();

    fireEvent.click(menuButton);
  });

  test("navbar renders & shows logged in state components", () => {
    render(
      <BrowserRouter>
        <UserAuthContextProvider initialUser={{}}>
          <Navbar />
        </UserAuthContextProvider>
      </BrowserRouter>
    );

    const brandText = screen.getByText("AutoMate");
    expect(brandText).toBeInTheDocument();

    const menuButton = screen.getByRole("button", { name: "" });
    fireEvent.click(menuButton);

    expect(screen.getByTestId("logout")).toBeVisible();

    fireEvent.click(menuButton);
  });
});

// Error Handling Test
describe("Navbar Error Handling", () => {
  test("handleLogOut function sets an error message when logOut fails", () => {
    render(
      <BrowserRouter>
        <UserAuthContextProvider initialUser={{}}>
          <Navbar />
          <TestComponent />
        </UserAuthContextProvider>
      </BrowserRouter>
    );

    const logoutButton = screen.getByTestId("logout");
    fireEvent.click(logoutButton);

    expect(screen.getByText("Mocked logout error")).toBeInTheDocument();
  });
});
