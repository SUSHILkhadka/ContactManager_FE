import React from "react"
import "../../__mocks__/matchMedia"
import '@testing-library/jest-dom' //important to toBeInDocument() to run
import { render } from "./componentTestConfig";
import { LoginPage } from "../../pages/login/LoginPage";


it('should render login page properly',()=>{
const page=render(<LoginPage/>)
expect(page.asFragment()).toMatchSnapshot();
})
