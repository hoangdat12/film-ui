import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/home/Home';
import Detail from './pages/detail/Detail';
import Catalog from './pages/catalog/Catalog';
import Login from './pages/login/Login';
import Person from './pages/person/Person';
import Search from './pages/search/Search';
import WatchFilm from './pages/watch/WatchFilm';
import AuthProvider from './context/authContext';
import PrivateRoute from './utils/PrivateRoute';
import Update from './pages/update/Update';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path='/:category/:id' element={<Detail />} />
                        <Route path='/watch/:category/:id' element={<WatchFilm />} />
                        <Route path='/profile' element={<Person />} />
                        <Route path='/profile/update' element={<Update />} />
                    </Route>

                    <Route path='/person/:login' element={<Login />} />
                    <Route path='/:category/search/:keyword' element={<Search />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/:catalog' element={<Catalog />} />
                    <Route path='/' element={<Home />} />
                </Routes>   
            </AuthProvider>
        </Router>
    )
}

export default App;
