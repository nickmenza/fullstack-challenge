import React, { Component } from 'react'
import {
    Link, withRouter,
  } from "react-router-dom";
import cookie from 'react-cookies'
import axios from 'axios';
import { connect } from 'react-redux';


class Header extends Component {
    constructor(props) {
        super(props);
        
        this.Logout = this.Logout.bind(this)
    }
    Logout(){
        // let form = {
        //     api_token : cookie.load('api_token'),
        // }
        // axios.get('/api/logout',{params : form})
        // .then((response) => {
        //     // handle success
        //     // cookie.remove('api_token')
        //     // this.props.history.push('/login')
        //     // console.log(this.state)
        // })
        // cookie.remove('api_token')
        localStorage.removeItem('token')
        this.props.SET_USER({user : {}})
        this.props.history.push('/login')
        // this.props.history.push('/login')
    }
    render () {
    return (
        <nav id="navbar-example2" className="navbar navbar-light bg-light">
            <Link className="navbar-brand" to="/">E-commerce</Link>
            <ul className="nav nav-pills">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/product">Product</Link>
            </li>
            {this.props.user.id ? 
            <li className="nav-item">
                <a className="nav-link" onClick={this.Logout} href="#" >Logout</a>
            </li>
            :
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            }
            
            </ul>
        </nav>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))