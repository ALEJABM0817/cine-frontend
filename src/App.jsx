import AppRouter from './routes/AppRouter';

const App = () => {
  console.log('API_URL:', import.meta.env.VITE_API_URL);

  return <AppRouter />;
}

export default App;
