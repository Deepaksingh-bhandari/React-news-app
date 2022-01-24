import './App.css';
import Navbar from './components/Navbar'
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar title="News Champ" />
        <Routes>
          <Route exact path="/"  element={<News key="home" country="in" category="general"/>}></Route>
          <Route exact path="general"  element={<News key="general" country="in" category="general" />}></Route>
          <Route exact path="business" element={<News country="in" category="business" />}></Route>
          <Route exact path="sports"  element={<News key="sports" country="in" category="sports" />}></Route>
          <Route exact path="health"  element={<News key="health" country="in" category="health" />}></Route>
          <Route exact path="technology"  element={<News key="technololgy" country="in" category="technology" />}></Route>
          <Route exact path="entertainment"  element={<News key="entertainment" country="in" category="entertainment" />}></Route>
        </Routes>
      </BrowserRouter>,
    </div>
  );
}

export default App;
