import { ChakraProvider } from '@chakra-ui/react';
import Home from './components/pages/Home/Home.tsx';
import theme from './theme/theme.ts';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
};

export default App;
