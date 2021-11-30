//import logo from './logo.svg';
//import './App.css';
import { Route, Switch } from "react-router-dom"
import Auth from "../hoc/auth";
import About from "./about/index"
import Login from "./LoginRegister/index"
import Home from "./home/index"
import Register from "./LoginRegister/register"
import ChatPage from "./chatPage/chatPage"
import NavBar from "./NavBar/NavBar";
import Footer from "./footer/footer"

function App() {
  return (
    <>
        <NavBar />
        <div className="content_wrapper" style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route path="/chat" component={Auth(ChatPage, null)} />
          <Route path="/about" component={Auth(About, null)} />
          <Route path="/login" component={Auth(Login, false)} />
          <Route path="/register" component={Auth(Register, false)} />
          <Route path="/" component={Auth(Home, null)} />

        </Switch>
      </div>
      <Footer />
      </>
    
  );
}

export default App;
