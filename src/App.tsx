import { ChakraProvider, Box, Container, VStack, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { SaveLinkForm } from './components/links/SaveLinkForm';
import { LinkList } from './components/links/LinkList';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800'
      }
    }
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  }
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh" bg="white">
          <Container maxW="container.lg" py={8}>
            <VStack spacing={8} align="stretch" w="100%">
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                  path="/"
                  element={
                    <VStack spacing={8} w="100%" align="stretch">
                      <SaveLinkForm />
                      <LinkList />
                    </VStack>
                  }
                />
              </Routes>
            </VStack>
          </Container>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App
