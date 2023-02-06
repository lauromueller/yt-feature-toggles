import React from 'react';
import { Employees } from './employees';
import { Config } from './config';
import { TogglesProvider, userClassFactory } from './feature-toggles';
import { userPermissionsFactory } from './feature-toggles/userPermissions';

function App() {
  return (
    <TogglesProvider
      defaultUserClass={userClassFactory('stable')}
      defaultUserPermissions={userPermissionsFactory('anonymous')}
    >
      <div className="grid gap-4 p-8">
        <Config />
        <Employees />
      </div>
    </TogglesProvider>
  );
}

export default App;
