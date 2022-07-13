import React, { useEffect, useState } from 'react';
import "./css/App.css"
import Login from './components/Login'
import Err from './components/404test'
import Display from './components/Display'
import DisplayTest from './components/DisplayTest'
import Search from './components/Search'
import Layout from './components/Layout'
import Interceptor from './components/Interceptor'
import RequireAuth from './components/RequireAuth'
import { Routes, Route } from 'react-router-dom'

const App = () => {
 
  return (
    <>
      <Routes>
          {/*Public Routes */}
          <Route path="/" element={<Login/>}/>

          {/*Protected Routes*/}
          <Route 
          path="/inter"
          element={
            <RequireAuth>
              <Interceptor/>
            </RequireAuth>
          }
          />
          <Route
          path="/search"
          element={
            <RequireAuth>
              <Search/>
            </RequireAuth>
          }
          />
          <Route
          path="/display"
          element={
            <RequireAuth>
              <Display/>
            </RequireAuth>
          }
          />
          {/* catch all */}
          <Route path="*" element={<Err/>}/>
      </Routes>
       
    </>
  )
}

export default App