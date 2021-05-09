
import './App.css';
import UserForm from './components/UserForm';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="bg-blue-50 min-h-screen w-screen text-center">
      <Header title="Cowin Notifier" subtitle="Enter Details Below"/>
      <UserForm />
      <Dashboard />
    </div>
  );
}

export default App;
