import React from 'react';
import ZincContent from './injected/content/zincContent';
import SiteGenerator from './utils/structure/SiteGenerator';


const App: React.FC = () => {
  
  const zincContent: ZincContent = new ZincContent()
  return (
    <div className="App">

      <SiteGenerator content={zincContent}/>

    </div>
  );
}

export default App;
