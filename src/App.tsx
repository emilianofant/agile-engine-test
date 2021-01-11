import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Main } from './modules/';
import './App.scss';
import AppProvider from './modules/store/AppProvider';

function App(): JSX.Element {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          {/* <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div> */}
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
          </Switch>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
