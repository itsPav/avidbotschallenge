import React, { Component } from 'react';

class Robot extends Component {

    componentWillMount() {
        this.props.addDataRobot(this.props.area, this.props.time);
    }

    render() {
        return(
            <div className="robot">
                Robot: {this.props.robot} - Area: {this.props.area} (m&#178;) - Time: {this.props.time} (s)
            </div>
        );
    }
};

export default Robot;