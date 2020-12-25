import { useSelector } from 'react-redux';
import './App.css';
import { selectSignedIn } from './app/features/userSlice';
import Blogs from './Components/Blogs';
import Homepage from './Components/Homepage';
import Navbar from './Components/Navbar';

const App = () => {
  
  const isSignedIn = useSelector(selectSignedIn)
  
  return (
    <>
      <Navbar />
      <Homepage />
      {isSignedIn && <Blogs />}
    </>
  )
}

export default App;
