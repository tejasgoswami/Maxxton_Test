import './App.css';
import ToDOList from "./components/TodoList";
import HeaderComponent from "./components/Header";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="container">  
      <div className="row mt-10">
          <div className="col-md-10 mx-auto">
          <ToastContainer />
          <HeaderComponent />    
          <ToDOList />
          </div>
      </div>
    </div>
  );
}

export default App;
