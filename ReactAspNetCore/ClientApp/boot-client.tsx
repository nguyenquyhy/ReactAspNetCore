import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from './components/layout/Layout';

var root = document.getElementById('root');
function renderApp() {
    ReactDOM.render(<Layout />, root);
}

renderApp();