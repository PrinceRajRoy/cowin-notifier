
import './App.css';
import UserForm from './components/UserForm';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Modal from './components/Modal';

function App() {
  return (
    <div className="bg-blue-50 min-h-screen w-screen text-center font-montserrat">
      <Header title="Cowin Notifier" subtitle="Enter Details Below"/>
      <UserForm />
      <Dashboard />
      <Modal />
    </div>
  );
}

export default App;
