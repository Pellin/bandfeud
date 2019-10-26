import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.scss';

import Header from './components/Header';
import Home from './components/home/Home';
import About from './components/About';
import Highscores from './components/highscores/Highscores';
// import TestArea from './components/TestArea';

function AppRouter() {
  return (
    <Router>
      <Header />
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/highscores/" component={Highscores} />
        <Route path="/about" component={About} />
        {/* <Route path="/test" component={TestArea} /> */}
      </div>
    </Router>
  );
}

export default AppRouter;
