import './App.css';
import {NavTable} from './components/navTable/navTable'
import {InfoTable} from './components/infoTable/infoTable'


function App() {
  return (
    <div className="App">
      <NavTable title = "test main" link = "https://swapi.dev/api/"/>
      <InfoTable title = "people" link = "https://swapi.dev/api/people"/>
      
    </div>
  );
}

export default App;
