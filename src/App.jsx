
// import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader';
import { SugarApp } from './pages/SugarApp';
import { StatisticsPage } from './pages/StatisticsPage';
import { RecordEdit } from './pages/RecordEdit';

export function App() {
  return (
    <Router>
      < div className="App" >
        <AppHeader />
        <main className='container'>
          <Switch>
            <Route component={RecordEdit} path='/record/edit/:id?' />
            <Route component={StatisticsPage} path='/statistics' />
            <Route component={SugarApp} path='/' />
          </Switch>
        </main>
      </div >
    </Router >
  );
}

export default App;
