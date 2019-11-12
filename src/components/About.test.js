import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import About from './About';

let container = document.createElement('div');


afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


describe('about us', () => {
    it('renders without crashing', () => {
        ReactDOM.render(<About />, container);
    });

    act(() => {
        ReactDOM.render(<About />, container);
    });
    expect(container.querySelector("h3").textContent).toBe("About");
});