import React, { useEffect, useState } from 'react';
import "./css/App.css"
import Login from './components/Login'
import Err from './components/404test'
import DisplayTest from './components/DisplayTest'
import SearchTest from './components/SearchTest'
import Layout from './components/Layout'
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
          path="/search"
          element={
            <RequireAuth>
              <SearchTest/>
            </RequireAuth>
          }
          />
          <Route
          path="/display"
          element={
            <RequireAuth>
              <DisplayTest/>
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