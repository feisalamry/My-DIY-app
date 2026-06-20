import { useState } from 'react';
import { BottomNav } from './components/layout/BottomNav';
import { ExploreView } from './views/ExploreView';
import { ScanView } from './views/ScanView';
import { CategoriesView } from './views/CategoriesView';
import type { ActiveView } from './types';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('scan');

  return (
    <div className="relative bg-black overflow-hidden" style={{ height: '100dvh' }}>
      <div className="w-full h-full">
        {activeView === 'scan' && <ScanView />}
        {activeView === 'explore' && <ExploreView />}
        {activeView === 'categories' && <CategoriesView />}
      </div>
      <BottomNav activeView={activeView} onNavigate={setActiveView} />
    </div>
  );
}

export default App;
