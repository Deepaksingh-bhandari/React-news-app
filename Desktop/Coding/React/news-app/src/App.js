import './App.css';
import Navbar from './components/Navbar'
import News from './components/News';
import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  state = {
    progress: 0
  }

  setProgress=(prog)=>{
    this.setState({progress:prog})
  }
 

  render() {
    let category = ['general', 'business', 'sports', 'health', 'technology', 'entertainment'];
    return (<div className="App">
      <BrowserRouter>
        <Navbar title="News Champ" />
        <LoadingBar color="#f11946" height={3} progress={this.state.progress} />

        <Routes>
          {category?.map((elem, i) => {
            // Manual Binding is to be done while passing function as a prop if ES6 class is used  
            return (<Route exact key={"route" + i} path={elem === 'general' ? '/' : elem} element={<News key={elem} onProgressChange={this.setProgress.bind(this)} country="in" category={elem} pageSize="8" />}></Route>)
          })}
        </Routes>
      </BrowserRouter>,
    </div>
    );
  }
}

export default App;
