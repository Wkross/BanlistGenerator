import './styles/App.css';
import CardSearch from './components/CardSearch/CardSearch'
import CardList from './components/CardList/CardList'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

function App() {
  const [banlist, setBanlist] = useState({
    forbidden: [],
    limited:[],
    semilimited:[],
    unlimited: [],
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="App-title">BANLIST GENERATOR</h1>
        <hr id="App-line"></hr>
      </header>

      <CardSearch
        banlistRef={banlist}
        setBanlist={setBanlist}
      />

      <CardList
        title="FORBIDDEN"
        listTag="forbidden"
        banlistRef={banlist}
        setBanlist={setBanlist}
      />
      <CardList
        title="LIMITED"
        listTag="limited"
        banlistRef={banlist}
        setBanlist={setBanlist}
      />
      <CardList
        title="SEMI LIMITED"
        listTag="semilimited"
        banlistRef={banlist}
        setBanlist={setBanlist}
      />
      <CardList
        title="UNLIMITED"
        listTag="unlimited"
        banlistRef={banlist}
        setBanlist={setBanlist}
      />

      <footer>BY: SKULLKROBAT</footer>
    </div>
  );
}

export default App;
