import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Components from './components'
import Layout from './components/Layout'
import { connect } from 'react-redux'
import axios from 'axios'


const NotFound = () => <h1>404.. This page is not found!</h1>
const Unauthorized = () => (<Layout><h1>This page is Unauthorized</h1></Layout>)
const NotPermission = () => (<Layout><h1>This page is Not Permission</h1></Layout>)

class CRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading :true,
        }
        this.create_UUID = this.create_UUID.bind(this)
    }

    componentDidMount(){
        this.getUsers()
    }

    create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    async getUsers () {
        // console.log(this.props)
        let token = localStorage.getItem('token');
        const config = { headers :{ Authorization : `bearer ${token ? token : ''}`} }
        console.log(config)
        try {
            let res = await axios.get("/api/user?v="+this.create_UUID(),config);
            // this.state.user = res.data
            // console.log(res)
            this.props.SET_USER({user : res.data})
            this.state.loading = false;
            this.forceUpdate()
        } catch (err) {
            console.log(err)
            if( err.response.status == 401){
                // console.log(true)
                // this.props.history.push('/login')
                this.state.loading = false;
                this.forceUpdate()
            }
        }

        
        // this.props.history.push('/login')
    };

  render () {
    return (

      <Router>
          {this.state.loading ? 'loading...' :
          <Switch>
              <PrivateRouteTest path="/product/:id" component={Components.ProductUpdate}></PrivateRouteTest>
              <PrivateRouteTest path="/product" component={Components.Product}></PrivateRouteTest>

              <Route path="/login">
                  <Components.Login />
              </Route>
              <PrivateRouteTest path="/" component={Components.App}></PrivateRouteTest>
            <Route component={NotFound} />
          </Switch>
          }
      </Router>
    );
  }
}

const mapStateToProps = state => ({
    ...state.UserReducer
})

const mapDispatchToProps = dispatch => ({
    SET_USER: (data) => {
        dispatch({
            type: 'SET_USER',
            data
        });
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CRoute)

console.log(localStorage.getItem('token'))

const PrivateRoute = ((props) => (
    props.user.id ? 
    <Route {...props} >
    </Route>
    : 
    <Redirect to='/login' />
))

const PrivateRouteTest = connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
