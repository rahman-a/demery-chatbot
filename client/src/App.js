import Login from "./views/login";
import Home from './views/Home'
import Profile from "./views/Profile";
import Dashboard from "./views/Dashboard";
import Writers from './views/Writers';
import Info from './views/Info'
import {Switch, Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {ChatBlockProvider} from './context/blockData'


function App() {
  const {isAuth} = useSelector(state => state.writer)
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <Login/>
        </Route>
        <Route path='/home'>
          {isAuth ? <Home/> : <Redirect to='/'/>}
        </Route>
        <Route path='/profile'>
          {isAuth ? <Profile/> : <Redirect to='/'/>}
        </Route>
        <Route path='/info/:id'>
          {isAuth ? <Info/> : <Redirect to='/'/>}
        </Route>
        <Route path='/dashboard/:id'>
          {isAuth 
          ? <ChatBlockProvider>
              <Dashboard/> 
            </ChatBlockProvider> 
          :  <Redirect to='/'/>}
        </Route>
        <Route path='/writers'>
          {isAuth ? <Writers/> :  <Redirect to='?redirect=writers'/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
