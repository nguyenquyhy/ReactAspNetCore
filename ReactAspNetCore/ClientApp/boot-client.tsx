import 'styles/site.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from './components/layout/Layout';

var root = document.getElementById('root');
function renderApp() {
    ReactDOM.render(<Layout />, root);
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./components/layout/Layout', () => {
        renderApp();
    });
}
