import { useState } from 'react';

export default function CounterPanel() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="panel counter-panel">
      <h2>Contador</h2>
      <button className="counter-button" onClick={increment}>
        <span className="counter-value">{count}</span>
      </button>
      <button className="reset-button" onClick={reset}>
        Voltar para 0
      </button>
    </div>
  );
}
