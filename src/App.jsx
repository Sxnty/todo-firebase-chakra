import Login from './views/Login';
import './styles/reset.scss';
import RouterConfig from './routes/RouterConfig';
import { TasksProvider } from './states/TasksContext';

function App() {
  return (
    <>
      <TasksProvider>
        <RouterConfig />
      </TasksProvider>
    </>
  );
}

export default App;
