import { hot } from 'react-hot-loader/root'
import * as React from 'react';
import Counter from 'components/Counter';

const Layout = () => (
    <React.Fragment>
        <h2>Welcome to React</h2>
        <Counter />
    </React.Fragment>
)

export default hot(Layout);