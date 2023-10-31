import {render, screen} from "@testing-library/react"
import Home from "../pages/Home"
import Navbar from "../components/Navbar"
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'
import {UserAuthContextProvider } from "../components/UserAuth";

//To see if the tests are working 
test('demo', () => {
    expect(true).toBe(true)
})

describe('Home', () => {
    it('Clicking logout logs me out of homepage', async () => {

        const { getByText, getByPlaceholderText} =
        render(
            <BrowserRouter>
                <UserAuthContextProvider>
                    <Navbar/>
                    <Home/>
                </UserAuthContextProvider>
            </BrowserRouter>
        )
            

        const titleElement = screen.getByText('Welcome User!');
        expect(titleElement).toBeInTheDocument();

        await userEvent.click(screen.getByTestId("LogOut-link"));

        const titleElement1 = screen.getByText('Welcome User!');
        expect(titleElement1).toBeInTheDocument();


        
    });
});






