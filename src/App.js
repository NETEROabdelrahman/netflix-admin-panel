import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/TopBar";
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";




function App() {

  
  
  return (
    <Router>
     {localStorage.getItem("user") && localStorage.getItem("user")!="undefined" && <Topbar /> } 
      <div className="container">
     {localStorage.getItem("user") && localStorage.getItem("user")!="undefined" && <Sidebar /> } 
      <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/users" element={<UserList/>}/>
            <Route path="/user/:userId" element={<User/>}/>
            <Route path="/newuser" element={<NewUser/>}/>
          <Route path="/movies" element={<ProductList />}/>
            <Route path="/movie/:movieId" element={<Product/>}/>
            <Route path="/newMovie" element={<NewProduct/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/lists" element={<ListList/>}/>
            <Route path="/list/:listId" element={<List/>}/>
            <Route path="/newList" element={<NewList/>}/>
    
    
      </Routes>
      </div>
    </Router>
  );
}

export default App;
