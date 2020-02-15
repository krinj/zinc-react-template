import React from 'react';
import './App.css';
import ZincContent from './zinc/zincContent';
import ApiFetcher from './ApiFetcher';

const App: React.FC = () => {
  
  const zincContent: ZincContent = new ZincContent()
  return (
    <div className="App">
      <header className="App-header">
        <h2>Zinc Test</h2>
        <div>{zincContent.body.getBody()}</div>
        <ApiFetcher zincContent={zincContent}/>
      </header>
    </div>
  );
}

export default App;
