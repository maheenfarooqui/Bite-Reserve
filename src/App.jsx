import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';

function App() {
  

  return (
    <>
      <BrowserRouter>
      {/* Abhi hum simple rakhte hain, baad mein MainLayout use karenge */}
      <Navbar />
      <div className="pt-20"> 
        <AppRoutes />
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
