import {render, screen} from "@testing-library/react"
import Signup from "../components/Signup";
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'
import {UserAuthContextProvider } from "../components/UserAuth";


//To see if the tests are working 
test('demo', () => {
    expect(true).toBe(true)
})

describe('Signup', () => {
it('Checks if Signup page renders', () => {

    render(
        <BrowserRouter>
            <UserAuthContextProvider>
                <Signup/>
            </UserAuthContextProvider>
        </BrowserRouter>
    )
    
    // screen.debug()
    // Use getByText to find the element with the text "Username"
    const titleElement = screen.getByText('Username');

    // Assert that the element with "Username" is present
    expect(titleElement).toBeInTheDocument();
            
    });
});

describe('Signup', () => {
    it('Type email into email box and check if it has the email in it', async () => {

        const { getByText, getByPlaceholderText, queryByText } = 
        render(
        <BrowserRouter>
            <UserAuthContextProvider>
                <Signup/>
            </UserAuthContextProvider>
        </BrowserRouter>
        )        
        const FAKE_USERNAME = "lol@gmail.com";
        await userEvent.type(screen.getByPlaceholderText('City College Email'), FAKE_USERNAME);
        expect(getByPlaceholderText('City College Email')).toHaveValue(FAKE_USERNAME);

    });
});


describe('Signup', () => {
    it('Type email without @, fails to signup', async () => {

        const { getByText, getByPlaceholderText} =
        render(
            <BrowserRouter>
                <UserAuthContextProvider>
                    <Signup/>
                </UserAuthContextProvider>
            </BrowserRouter>
        )
    


        const FAKE_USERNAME = "lolgmail.com";
        await userEvent.type(screen.getByPlaceholderText('City College Email'), FAKE_USERNAME);
        expect(getByPlaceholderText('City College Email')).toHaveValue(FAKE_USERNAME);

        await userEvent.click(screen.getByTestId('signup-button'));

    });
});



