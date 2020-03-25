import React from 'react';
import SiteContent from './injected/content/siteContent';
import SiteGenerator from './utils/structure/SiteGenerator';


const App: React.FC = () => {
  
  const siteContent: SiteContent = new SiteContent()
  return (
    <div className="App">

      <SiteGenerator content={siteContent}/>

    </div>
  );
}

export default App;
