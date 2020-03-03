import React, { Component } from 'react'
import {
    Link,
    withRouter
  } from "react-router-dom";
import Layout from '../Layout';
import axios from 'axios';
import Alert from '../alert'
import Input from '../input'
import cookie from 'react-cookies'
import { connect } from 'react-redux';
import { graphql, buildSchema } from 'graphql';

import './login.css'

const inst = axios.create({
    proxy: {
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    }
  });
  
class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            alert : {
                class : 'd-none',
                text : '',
            },
            errors : {}
        
        }
        this.apiSend = this.apiSend.bind(this)
        this.validate = this.validate.bind(this)
    }

    validate(form) {
        return {
            email: form.email.length === 0 ? 'Username field is required.' : false,
            password: form.password.length === 0 ? 'Password field is required' : false
        };
    }

    async apiSend(e) {
        e.preventDefault();
        // // let self = this

        // // var schema = buildSchema(`
        // //     type Query {
        // //         userId: ID,
        // //         title: String
        // //     }
        // // `);

        // // let res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');

        // console.log('test',res)

        // graphql(schema, '{ userId, title }', res.data).then((response) => {
        //     console.log(response);
        // });

        const form = {
            email : this.email.value,
            password : this.password.value
        }

        const errors = this.validate(form);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        if(isDisabled){
            this.setState({
                errors : errors
            })
            return false
        }else{
            this.setState({
                errors : {}
            })
        }

        try{
            let res_login = await axios.post('/api/login',form)
            localStorage.setItem("token", res_login.data.token);
            this.props.SET_USER({user : res_login.data.user})
            this.props.history.push('/product')
            // if(res_login.status == 200){
                
            // }
        }catch(error){
            if(error.response.status == 401){
                this.setState({
                    alert : {
                        class : 'alert-danger d-block',
                        text : error.response.data.message,
                    },
                })
            }
            console.log(error,'error',error.response.status)
        }
        

        
       

        // const config = { headers :{ Authorization : `bearer ${res_login.data.token}`} }
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE1ODI5MTA1Mzh9.2BU0Pp5g1EhAj7vxAKHHT_seVsvdMSh11IoWVHe-_eM
        // let res_product = await axios.get('/api/product',config);
        // console.log(res_product)
        
        // this.state.loading = true;
        // this.forceUpdate()
        // const form = {}
        // axios.post('/api/login',form)
        // .then((response) => {
        //     // handle success
        //     console.log(response)
        // })
        // .catch(function (error) {
        //     console.log(error)
        //     // self.state.alert.class = 'alert-danger';
        //     // self.state.alert.text = 'เข้าระบบสำเร็จ';
        //     self.state.errors = error.response.data.errors;
        //     self.forceUpdate();
           
        // })
    }

    render () {
        // console.log(cookie.load('api_token'))
    return (
        <Layout>
            <div className="container">
                <form className="page-login" onSubmit={this.apiSend}>
                    <h4 className="text-center">
                        Login
                    </h4>
                    <Alert {...this.state.alert}/>
                    <Input name="email" placeholder="Username" errors={this.state.errors}
                    type="text"
                    setRef = {(value,input) => this[value] = input}
                    />

                    <Input name="password" placeholder="Password" errors={this.state.errors}
                    type="password"
                    setRef = {(value,input) => this[value] = input}
                    />
                    
                    <button type="submit" className="btn btn-primary active w-100" disabled={this.state.loading}>Login</button>

                </form>
            </div>
        </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))

// export default withRouter(Login)