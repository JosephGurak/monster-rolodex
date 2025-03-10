import logo from './logo.svg';
import './App.css';
import {Component} from 'react';

import CardList from './components/card-list/card-list.componet';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
    constructor() {
        super();

        this.state = {
          monsters: [],  //initializing array 
          searchField: ''      
        };              
    }

    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/users')   //mounting api 
        .then((response) => response.json())
        .then((users) => this.setState(() => {
          return {monsters: users}
        }
      ));
    }

  onSearchChange = (event) => {     // moving method outside of render component for performance increase       

    const searchField = event.target.value.toLocaleLowerCase();          
    this.setState(() => {  //call back fucntion
      return {searchField};
    })

  }

  render() {   
    const {monsters, searchField} = this.state;  //destructuring for quality of life
    const {onSearchChange} = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
        <div className="App">   
          <h1 className='app-title'>Monsters Rolodex</h1>  
                       
          <SearchBox onChangeHandler = {onSearchChange} placeholder = {'Search Name'} className = "search-box" />          
          <CardList monsters={filteredMonsters} />
        </div>
    );
  }

}

export default App;
