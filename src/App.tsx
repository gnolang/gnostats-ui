import { ChakraProvider } from '@chakra-ui/react';
import Home from './components/pages/Home/Home.tsx';

const App = () => {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
};

export default App;
