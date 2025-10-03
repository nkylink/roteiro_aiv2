import './App.css';
import ScreenplayInfoPanel from './components/ScreenplayInfoPanel';
import ScreenplayViewer from './components/ScreenplayViewer';
import CounterPanel from './components/CounterPanel';

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Painel de Roteiro</h1>
      </header>

      <div className="panels-grid">
        <ScreenplayInfoPanel />
        <CounterPanel />
      </div>

      <ScreenplayViewer />
    </div>
  );
};

export default App;
