import React, { Component } from 'react'
import Header from './header'
import './layout.css'

class Layout extends Component {
    render () {
    return (
        <div>
            <Header/>
            <div className="layoutmain-course">
                {this.props.children}
            </div>
        </div>
    )
    }
}

export default Layout