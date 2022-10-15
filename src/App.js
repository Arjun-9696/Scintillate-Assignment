
import './App.css';
import { Box } from '@chakra-ui/react';
import Navbar from './Components/Navbar';
import People from './Pages/People';
import PeoplePage from './Pages/PeoplePage';
import AllRoutes from './Routes/AllRoutes';

function App() {
  return (
    <Box>
      <Navbar/>
      <AllRoutes/>
    </Box>
  );
}

export default App;
