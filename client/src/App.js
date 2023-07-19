import React, { Component } from 'react'
// import './App.css';
import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from "./pages/LoginPage"
import Home from "./pages/Home"
import BookPage from "./pages/BookPage"
import SearchPage from "./pages/SearchPage"
import Header from "./components/Header"
import SellPage from "./pages/SellPage"
import MyShelves from "./pages/MyShelves"
import ShelfPage from "./pages/ShelfPage"
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"

class App extends Component {
  constructor() {
    super()
    const token = localStorage.getItem("token");
    this.state = {
      authToken: token
    }
    axios.defaults.headers.common['authorization'] = token ? `Bearer ${token}` : ""
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    const token = localStorage.getItem("token");
    this.setState({
      authToken: token
    })
    axios.defaults.headers.common['authorization'] = token ? `Bearer ${token}` : ""

    window.location.reload()
  }
  render() {

    return (
      <Router>

        <Header isLogin={this.state.authToken} handleLogin={this.handleLogin} />
        <Routes>

          <Route path="/search" element={<SearchPage />} />
          <Route path="/forSaleBooks/:OL_ID" element={<BookPage />} />
          <Route path="my" element={<MyShelves />} >
            <Route path="book-shelf" element={<ShelfPage key="book-shelf" inBookshelf={true} />} />
            <Route path="store-shelf" element={<ShelfPage key="store-shelf" inBookshelf={false} />} />
          </Route>
          {/* <Route exact path={`/my/book-shelf`} element={<ShelfPage key="book-shelf" inBookshelf={true} />} />
          <Route exact path={`/my/store-shelf`} element={<ShelfPage key="store-shelf" inBookshelf={false} />} /> */}
          {/* <Route exact path={`/my/book-shelf`}>
            <ShelfPage key="book-shelf" inBookshelf={true} />
          </Route>
          <Route exact path={`/my/store-shelf`}>
            <ShelfPage key="store-shelf" inBookshelf={false} />
          </Route> */}
          <Route exact path="/login" element={<LoginPage handleLogin={this.handleLogin} />} />
          <Route exact path="/user/sell" element={<SellPage />} />
          <Route exact path="/register" element={<LoginPage handleLogin={this.handleLogin} />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    )
  }
}

export default App;
