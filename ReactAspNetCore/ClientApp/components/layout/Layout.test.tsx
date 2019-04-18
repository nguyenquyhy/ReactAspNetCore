import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from './Layout';

it('renders Layout without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Layout />, div);
});
