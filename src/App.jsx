import Login from './views/Login';
import './styles/reset.scss';
import RouterConfig from './routes/RouterConfig';
import { TasksProvider } from './states/TasksContext';
import { AuthProvider } from './states/AuthContext';
function App() {
  return (
    <>
      <AuthProvider>
        <TasksProvider>
          <RouterConfig />
        </TasksProvider>
      </AuthProvider>
    </>
  );
}

export default App;
