import React from 'react';
import './App.scss';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Home} from "../features/Home/Home";
import {Main} from "../features/Main/Main";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/main'} element={<Main/>}/>
                <Route path={'*'} element={<Navigate to={'/'}/>}/>
            </Routes>

        </div>
    );
}

export default App;
