import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../views/Login';
import TaskList from '../views/TaskList';
import Header from '../components/Header/Header';
import AddTask from '../views/AddTask';
import Auth from './Auth';
function RouterConfig() {
  console.log('router');
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/add-task'
          element={
            <>
              <Header />
              <AddTask />
            </>
          }
        />
        <Route
          path='/'
          element={
            <>
              <Auth>
                <Header /> <TaskList />
              </Auth>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default RouterConfig;
