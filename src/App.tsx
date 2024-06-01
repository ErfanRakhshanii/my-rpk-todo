import * as React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTodos from './Components/AddTodos';
import InProgressTodos from './Components/InProgressTodos';
import DoneTodos from './Components/DoneTodos';
import WrongPaths from './Components/WrongPaths';
import Header from './Components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<AddTodos />} />
        <Route path="InProgressTodos" element={<InProgressTodos />} />
        <Route path="DoneTodos" element={<DoneTodos />} />
        <Route path="*" element={<WrongPaths />} />
      </Routes>
    </BrowserRouter>
  )
}