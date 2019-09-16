import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import Controls from "./Controls";

describe("<Controls />", () => {
  it("matches Snapshot", () => {
    const tree = renderer.create(<Controls />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it("should invoke a function toggle locked after button pressed", () => {
    const toggleLocked = jest.fn();
    const locked = true;
    const closed = true;

    const { getByText } = render(
      <Controls toggleLocked={toggleLocked} locked={locked} closed={closed} />
    );
    fireEvent.click(getByText("Unlock Gate"));
    expect(toggleLocked).toHaveBeenCalled();
  });
  it("should invoke a function toggle close after button pressed", () => {
    const toggleClosed = jest.fn();
    const locked = false;
    const closed = false;

    const { getByText } = render(
      <Controls toggleClosed={toggleClosed} locked={locked} closed={closed} />
    );
    fireEvent.click(getByText("Close Gate"));
    expect(toggleClosed).toHaveBeenCalled();
  });
  it("Checking if the button is disabled", () => {
    const { getByText } = render(<Controls locked={true} closed={true} />);

    expect(getByText("Open Gate").disabled).toBeTruthy();
  });
  it("Checking the button if disabled", () => {
    const { getByText } = render(<Controls />);
    expect(getByText("Lock Gate").disabled).toBeTruthy();
  });

});