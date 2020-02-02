import React from 'react';
import './App.css';
import ZincContent from './zinc/zincContent';

const App: React.FC = () => {
  
  const zincContent: ZincContent = new ZincContent()
  return (
    <div className="App">
      <header className="App-header">
        <h2>Zinc Test</h2>
        <div>{zincContent.body.getBody()}</div>
      </header>
    </div>
  );
}

export default App;
