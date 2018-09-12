import React, { Component } from 'react';

class Aggregate extends Component {

    render() {
        const data = this.props.data;

        let totalAreaCleaned = data.map(robot => {return robot.area}).reduce((a, b) => a + b);
        let totalTime = data.map(robot => {return robot.time}).reduce((a, b) => a + b);
        let productivity = (totalAreaCleaned / totalTime).toFixed(4);

        return(
            <div>
                Account - {totalAreaCleaned} (m&#178;) - {totalTime} (s) - {productivity} m&#178;/s
            </div>
        );
    }
};

export default Aggregate;