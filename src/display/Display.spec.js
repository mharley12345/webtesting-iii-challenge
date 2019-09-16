// Test away!
import React from 'react'
import renderer from "react-test-renderer";
import { fireEvent, render, queryByText } from "@testing-library/react";
import Display from './Display'


describe("<Display/>",()=>{
    it("matches snapshot",()=> {
        const tree = renderer.create(<Display/>);
        expect(tree.toJSON()).toMatchSnapshot();
    });
    it("should display unlocked",()=>{
        const {queryByText} = render(<Display/>);
        expect(queryByText(/unlocked/i)).toBeTruthy;
    });
    it("should display open",()=>{
        const { queryByText } = render(<Display/>);
        expect(queryByText(/open/i)).toBeTruthy;
    })
    it("should display closed and locked",()=>{
        const { queryByText} = render(<Display closed={true} locked={true}/>);
        expect(queryByText(/closed/i)).toBeTruthy();
        expect(queryByText(/locked/i)).toBeTruthy();

    })
    it("Should have green light when open or unlocked", () => {
        const { queryAllByTestId } = render(
          <Display closed={false} locked={false} />
        );
        expect(queryAllByTestId("led green-led")).toBeTruthy();
      });
      it("Should have red-led when locked or closed", () => {
        const { queryAllByTestId } = render(
          <Display closed={true} locked={false} />
        );
        expect(queryAllByTestId("led red-led")).toBeTruthy();
      });
})
