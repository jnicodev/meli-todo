import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import TaskCreatePage from "./pages/TaskCreatePage.tsx";

const enableMocking = async () => {
  const { worker } = await import('./mocks/browser');

  return worker.start();
}

enableMocking().then( () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='tasks'>
              <Route path='create' element={ <TaskCreatePage /> } />
              <Route path=':id' />
            </Route>
          </Route>
        </Routes>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
