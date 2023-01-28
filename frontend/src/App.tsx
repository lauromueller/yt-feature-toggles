import React from 'react';
import { Employees } from './employees';
import { Config } from './config';

function App() {
  return (
    <div className="grid gap-4 p-8">
      <Config />
      <Employees />
    </div>
  );
}

export default App;
