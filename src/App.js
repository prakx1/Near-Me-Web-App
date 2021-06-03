import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import "./App.css";

import Login from "./components/login.js";
import Register from "./components/register.js";
import RegisterAdmin from "./components/registerAdmin.js";
import Review from "./components/review.js";
import Explore from "./components/explore.js";
import UserProfile from "./components/user-profile.js";
import Help from "./components/help.js";
import About from "./components/aboutUs.js";
import ServiceProviderProfile from "./components/service-provider-profile.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: null,
      email: null,
      isProvider: null,
    };
    this.loadUser = this.loadUser.bind(this);
    this.logout = this.logout.bind(this);
    this.ProfileHandler = this.ProfileHandler.bind(this);
  }
  async componentWillMount() {
    await this.loadUser();
  }

  async loadUser() {
    const user = localStorage.getItem("user");
    const loggedInUser = user != null ? JSON.parse(user) : null;
    if (loggedInUser == null) {
    } else {
      this.setState({
        email: loggedInUser.email,
        isProvider: loggedInUser.isProvider,
        userid: loggedInUser.userid,
      });
    }
  }
  logout() {
    localStorage.setItem("user", null);
    window.alert("logged out of session !");
    window.location.href='/home'
  }

  ProfileHandler() {
    const user = localStorage.getItem("user");
    const loggedInUser = user != null ? JSON.parse(user) : null;
    if (loggedInUser == null) {
      window.location.href = "/login";
    } else {
      if (this.state.isProvider == true) {
        window.location.href = "/service-provider-profile/" + this.state.userid;
      } else {
        window.location.href = "/user-profile/" + this.state.userid;
      }
    }
  }

  render() {
    return (
      <div>
      <BrowserRouter>
        <div>
          <div>
            <ul class="main-navigation">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/explore">Find</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li id="account">
                <Link to="#">Accounts</Link>

                <ul>
                  <li>
                    <a href="#" onClick={this.ProfileHandler}>
                      Profile
                    </a>
                  </li>
                  {this.state.userid == null ? (
                    <li>
                      <a href="login">Login</a>
                    </li>
                  ) : (
                    <li>
                      <a href="#" onClick={this.logout}>
                        Logout
                      </a>
                    </li>
                  )}

                  <li>
                    <a href="#">Register as</a>
                    <ul>
                      <li>
                        <a href="/register">Normal user</a>
                      </li>
                      <li>
                        <a href="/registerAdmin">Service Provider</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <Switch>
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/register" component={() => <Register />} />
            <Route
              exact
              path="/registerAdmin"
              component={() => <RegisterAdmin />}
            />
            
            <Route
              exact
              path="/explore"
              component={() => (
                <>
                  <Explore />
                </>
              )}
            />
            <Route
              exact
              path="/user-profile/:ID"
              component={() => <UserProfile />}
            />
            <Route
              path="/service-provider-profile/:ID"
              exact
              component={() => <ServiceProviderProfile />}
            />
            <Route
              path="/help"
              exact
              component={() => <Help />}
            />
            <Route
              path="/about"
              exact
              component={() => <About />}
            />
            <Route
              path="/addreview/:ID"
              exact
              component={() => <Review />}
            />
          </Switch>
        </div>
      </BrowserRouter>
      
      <div id="AppFooter">


  <footer class="footer-distributed">
 
 <div class="footer-left">
 
 <h3>NEAR<span> ME</span></h3>
 
 
 <br></br>
 <p class="footer-company-name">WCE Mini Project II  All Rights Reserved. &copy; 2021</p>
 </div>
 
 <div class="footer-center">
 
 <div>
 <i class="fa fa-map-marker"></i>
 <p><span>Walchand College Of Engineering </span> Sangli , India</p>
 </div>
 
 <div>
 <i class="fa fa-phone"></i>
 <p>+91-9146744882</p>
 </div>
 
 <div>
 <i class="fa fa-envelope"></i>
 <p><a href="mailto:support@company.com">yashbhange888@gmail.com</a></p>
 </div>
 
 </div>
 
 <div class="footer-right">
 
 <p class="footer-company-about">
 <span>About the company</span>
 'Naer-Me' Multi-Sevice App is an aggregator with IT-based digital platform which aims to find win-win businnes opportunities for both th multi service app service and the service providers on an online platform.
 </p>
 
 <div class="footer-icons">
 
 <a href="https://www.facebook.com/profile.php?id=100012438314245"><i class="fa fa-facebook"></i></a>
 <a href="https://twitter.com/yashbhange1"><i class="fa fa-twitter"></i></a>
 <a href="https://www.linkedin.com/in/yash-bhange/"><i class="fa fa-linkedin"></i></a>
 <a href="https://github.com/Yash-Bhange"><i class="fa fa-github"></i></a>
 
 </div>
 
 </div>
 
 </footer>
 

      </div>

      </div>
    );
  }
}


export default App;
