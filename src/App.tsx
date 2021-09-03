import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExamplesPage from './pages/ExamplesPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <ExamplesPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
