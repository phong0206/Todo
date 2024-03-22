/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { describe, expect, it } from "vitest";
import {render, screen} from "@testing-library/react"

import App from './App'

describe('App', () => {
    it('Render hello world', () => {
        //ARRANGE
        render(<App/>);
        //ACT
        //EXPECT
        expect(screen.getByRole('heading', {
            level: 1
        })).toHaveTextContent('Hello World')
    })
})