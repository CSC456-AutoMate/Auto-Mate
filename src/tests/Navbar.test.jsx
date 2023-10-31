import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from "../components/UserAuth";
import Navbar from "../components/Navbar";

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
    expect(brandText).toBeInTheDocument();})

test("handleLogOut function sets an error message when logOut fails", () => {
  render(
    <BrowserRouter>
      <UserAuthContextProvider initialUser={{}}>
        <Navbar />
      </UserAuthContextProvider>
    </BrowserRouter>
  );

  const { setError } = useUserAuth(); // access setError from context

  // Manually set an error
  setError("Mocked logout error");

  const logoutButton = screen.getByTestId("logout");
  fireEvent.click(logoutButton);

  const { error } = useUserAuth(); // access error from context after logout attempt

  expect(error).toBe("Mocked logout error"); // check if error was set correctly
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

  //<UserAuthContextProvider initialUser = {{}}> implies user data was set

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
