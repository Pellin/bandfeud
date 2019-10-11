import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.scss';

import Home from './components/home/Home';
import About from './components/About';
import Highscores from './components/highscores/Highscores';

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/highscores/" component={Highscores} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

export default AppRouter;
