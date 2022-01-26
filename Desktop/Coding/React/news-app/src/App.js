import './App.css';
import Navbar from './components/Navbar'
import News from './components/News';
import React, { Component ,useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

// export class App extends Component {
  const App=()=>{
  const [progress, setprogress] = useState(0);
  // state = {
  //   progress: 0
  // }

  const setProgressValue=(prog)=>{
    setprogress(prog)
  }
  
  let apiKey=process.env.REACT_APP_NEWS_API;

  
    let category = ['general', 'business', 'sports', 'health', 'technology', 'entertainment'];
    return (<div className="App">
      <BrowserRouter>
        <Navbar title="News Champ" />
        <LoadingBar color="#f11946" height={3} progress={progress} />

        <Routes>
          {category?.map((elem, i) => {
            // Manual Binding is to be done while passing function as a prop if ES6 class is used  
            return (<Route exact key={"route" + i} path={elem === 'general' ? '/' : elem} element={<News key={elem} onProgressChange={setProgressValue.bind(this)} country="in" category={elem} pageSize="8"  apiKey={apiKey}/>}></Route>)
          })}
        </Routes>
      </BrowserRouter>,
    </div>
    );
}

export default App;
