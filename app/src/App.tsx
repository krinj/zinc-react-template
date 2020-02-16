import React from 'react';
import ZincContent from './zinc/zincContent';
import ApiFetcher from './ApiFetcher';
import ContentPage from './utils/layout/ContentPage/ContentPage';
import ZincGenerator from './utils/generator/ZincGenerator';

const App: React.FC = () => {
  
  const zincContent: ZincContent = new ZincContent()
  return (
    <div className="App">

      <ZincGenerator content={zincContent}/>

    </div>
  );
}

export default App;
