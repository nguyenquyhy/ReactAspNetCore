import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Counter from './Counter';
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Counter Tests', () => {
    it('renders Counter without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Counter />, div);
    });

    it('reacts to button clicks', () => {
        const { getByText, getByTestId, container, asFragment } = render(<Counter />);

        expect(asFragment()).toMatchSnapshot()

        // Act
        fireEvent.click(getByText(/increase/i));

        // Assert
        expect(getByText(/current count/i)).toHaveTextContent('Current count: 1');
        
        expect(asFragment()).toMatchSnapshot()
    });
});