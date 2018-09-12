import React, { Component } from 'react';
import './App.css';
import Account from './Components/Account';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      robots: []
    }
  }

  componentDidMount() {
    this.getAccounts(this.state.accounts);
    this.getCleanings(this.state.robots);
  }
 
  /**
   * Get the list of accounts
   * return {Array} - the list of accounts
  */
  getAccounts = function () {
    const accounts = [
        {id: 0, parent: null, name: 'Account 0'},
        {id: 1, parent: 0   , name: 'Account 1'},
        {id: 2, parent: 0   , name: 'Account 2'},
        {id: 3, parent: 0   , name: 'Account 3'},
        {id: 4, parent: 1   , name: 'Account 4'},
        {id: 5, parent: 1   , name: 'Account 5'},
        {id: 6, parent: 1   , name: 'Account 6'},
        {id: 7, parent: 2   , name: 'Account 7'},
        {id: 8, parent: 3   , name: 'Account 8'},
        {id: 9, parent: 4   , name: 'Account 9'}
    ];

    this.setState({
      accounts: accounts
    })
  };

  /**
  * Get the list of cleanings
  * return {Array} - the list of cleanings
  */
  getCleanings = function () {
    const cleanings = [];
    for (let i = 0; i < 100; i++) {
        cleanings.push({
            id:         i,
            account:    Math.floor(Math.random() * 10),
            robot:      Math.floor(Math.random() * 10),
            area:       Math.floor(Math.random() * 100),
            time:       Math.floor(Math.random() * 1000)
        });
    }
    this.setState({
      robots: cleanings
    })
  }

  render() {

    // function from stack overflow 
    // https://stackoverflow.com/questions/22367711/construct-hierarchy-tree-from-flat-list-with-parent-field/22367819#22367819
    function treeify(list, idAttr, parentAttr, childrenAttr) {
      if (!idAttr) idAttr = 'id';
      if (!parentAttr) parentAttr = 'parent';
      if (!childrenAttr) childrenAttr = 'children';
  
      var treeList = [];
      var lookup = {};
      list.forEach(function(obj) {
          lookup[obj[idAttr]] = obj;
          obj[childrenAttr] = [];
      });
      list.forEach(function(obj) {
          if (obj[parentAttr] != null) {
              lookup[obj[parentAttr]][childrenAttr].push(obj);
          } else {
              treeList.push(obj);
          }
      });
      return treeList;
    };


    // creates a tree view of all the accounts
    var accountTree = treeify(this.state.accounts,"id","parent");

    console.log(accountTree);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">AvidBots Challenge</h1>
        </header>

        <Account data={accountTree} robots={this.state.robots} name={accountTree.name} />
      </div>
    );
  }
}

export default App;


