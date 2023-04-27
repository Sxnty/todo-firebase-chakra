import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../views/Login';
import TaskList from '../views/TaskList';
import Header from '../components/Header/Header';
function RouterConfig() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <>
              <Header /> <TaskList />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default RouterConfig;
