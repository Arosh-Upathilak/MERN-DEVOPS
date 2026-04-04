import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createNote" element={<CreateNote />} />
        <Route path="/updateNode/:id" element={<UpdateNote />} />
      </Routes>
    </>
  );
}

export default App;
