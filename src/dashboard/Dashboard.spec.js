// Test away
import React from "react";
import renderer from "react-test-renderer";
import {render, fireEvent, act} from '@testing-library/react'
import Dashboard from "./Dashboard";
import '@testing-library/jest-dom/extend-expect'

describe("<Dashboard />", () => {
  it('renders',()=>{
    expect(render(<Dashboard/>)).not.toBeNull()
  })
  it("matches snapshot", () => {
    const tree = renderer.create(<Dashboard />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('<Controls/> renders in <Dashboard/>',()=>{
    const { getByText} = render(<Dashboard/>)

    expect(getByText(/close/i)).toHaveTextContent(/close gate/i)
  })
  it('<Display /> renders in <Dashboard />', () => {
    const { getByText } = render(<Dashboard />)

    expect(getByText(/unlocked/i)).toHaveTextContent(/unlocked/i)
})
it('<Display /> renders in <Dashboard />', () => {
  const { getByText } = render(<Dashboard />)

  expect(getByText(/unlocked/i)).toHaveTextContent(/unlocked/i)
})

it('defaults to Unlocked and Open', () => {
  const { getByText } = render(<Dashboard />)

  expect(getByText(/unlocked/i)).toHaveTextContent(/unlocked/i)
  expect(getByText(/open/i)).toHaveTextContent(/open/i)
})

});

describe('Click tests',()=>{
  it('close gate clicked',()=>{
    const { getByText } = render(<Dashboard/>)
    const closeBtn = getByText(/close gate/i)
    const lockBtn = getByText(/lock gate/i)
    const dispOpen = getByText(/open/i)
    const dispLock = getByText(/unlocked/i)

  act(()=>{
    fireEvent.click(closeBtn)
  })
  expect(dispLock).toHaveTextContent(/unlocked/i)
  expect(dispOpen).toHaveTextContent(/closed/i)
  expect(lockBtn).toHaveTextContent(/lock gate/i)
  expect(lockBtn).not.toBeDisabled()
  expect(closeBtn).toHaveTextContent(/open gate/i)
  expect(closeBtn).not.toBeDisabled()
  })
  it('Close gate clicked, then lock gate clicked', () => {
    const { getByText } = render(<Dashboard />)
    const closeBtn = getByText(/close gate/i)
    const lockBtn = getByText(/lock gate/i)
    const dispOpen = getByText(/open/i)
    const dispLock = getByText(/unlocked/i)

    act(()=>{
      fireEvent.click(closeBtn)
    })
    act(() => {
      fireEvent.click(lockBtn)
    })
    expect(dispLock).toHaveTextContent(/locked/i)
    expect(dispOpen).toHaveTextContent(/closed/i)
    expect(lockBtn).toHaveTextContent(/unlock gate/i)
    expect(lockBtn).not.toBeDisabled()
    expect(closeBtn).toHaveTextContent(/open gate/i)
    expect(closeBtn).toBeDisabled()

  })
})