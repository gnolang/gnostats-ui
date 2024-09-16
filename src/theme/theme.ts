import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Text: {
      baseStyle: () => ({
        color: 'gno.green'
      })
    },
  },
  styles: {
    global: () => ({
      body: {
        margin: 0,
        color: 'white',
        background: '#090909'
      }
    })
  },
  fonts: {
    body: 'Fira Code, sans-serif'
  },
  colors: {
    gno: {
      green: '#50fa7b',
      yellow: '#f1fa8c',
      purple: '#bd93f9',
      blue: '#8be9fd',
      gray: '#888888'
    }
  }
});

export default theme;
