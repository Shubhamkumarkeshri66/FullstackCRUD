
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard'
import PostUser from './components/postUser/postUser';
import UpdateUser from './components/updateUser/updateUser';
import NoMatch from './components/noMatch/noMatch';
import Header from './components/header/header';
function App() {
  return (
    <>
          <Header/>
          <Routes>
           <Route path='/' element={<Dashboard/>}></Route>
           <Route path='/user' element={<PostUser/>}></Route>
           <Route path='/user/:id' element={<UpdateUser/>}></Route>
           <Route path='*' element={<NoMatch/>}></Route>

          </Routes>
    </>
  );
}

export default App;
