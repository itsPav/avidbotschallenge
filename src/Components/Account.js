import React, { Component } from 'react';
import Robot from './Robot';
import Aggregate from './Aggregate';

class Account extends Component {
    
    constructor(props) {
        super(props);
        
        this.addDataRobot = this.addDataRobot.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state = {
            area: 0,
            time: 0,
            productivity: 0,
            name: '',
            isHidden: false
        };
    }

    getInitialState() {
        return {
            isHidden: this.props.isHidden,
            name: this.props.name
        };
    }

    toggle() {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }

    addDataRobot(robotArea, robotTime) {
        this.setState((prevState) => ({
            area: prevState.area + robotArea,
            time: prevState.time + robotTime
        }));
    }

    render() {
        let accountClass = (!this.state.isHidden ? 'account ': 'account hide');

        // get IDs of parent and all of its children
        let accountIDs = [];

        function getIDs(node) {
            if(node.id != null) {
                accountIDs.push(node.id);
            }
            if(node.children && node.children.length > 0) {
                node.children.forEach(element => {
                    getIDs(element)
                });
            }
            return accountIDs;
        }

        var children = this.props.data.map(account => 
                
            <div className="account">
                <li key={account.id}>

                    {account.name} - {account.id} - {account.parent} 

                    {console.log(accountIDs = [])}
                    {console.log((getIDs(account)))}

                    {account.children.length > 0
                        ?
                        <Aggregate
                            // pass all robots that are in current account and child accounts
                            data={this.props.robots.filter(robot => accountIDs.indexOf(robot.account) !== -1)}
                        />
                        :
                        undefined
                    }

                    <Aggregate data={this.props.robots.filter(robot => robot.account === account.id)} />
          
                    <div className="robotContainer">
                        {this.props.robots.filter(robot => robot.account === account.id).map(robot => (
                            <Robot key={robot.id} robotAccount={robot.account} addDataRobot={this.addDataRobot} robot={robot.id} area={robot.area} time={robot.time} />
                        ))}
                    </div>
                    
                    {(account.children.length > 0) 
                        ?
                        <Account robots={this.props.robots} data={account.children} /> 
                        :
                        null
                    }
                </li>    
            </div>
        )

        return(
            // recursion using the Account component
            <div>
                <span onClick={this.toggle}></span>
                <ul className={accountClass}>
                    {children}
                </ul>
            </div>
        );
    }
};

export default Account;