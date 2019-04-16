import * as React from 'react';

interface State {
    count: number;
}

export default class Counter extends React.PureComponent<any, State> {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }
    }

    public render() {
        return (
            <React.Fragment>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increase</button>
                <div>Current count: {this.state.count}</div>
            </React.Fragment>
        );
    }
}