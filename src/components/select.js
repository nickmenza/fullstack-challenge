import React, { Component } from 'react'

class Select extends Component {
    componentDidMount () {
    }
    // onChange(e){

    // }
    render () {
        let error = this.props.errors[this.props.name]
        let category = this.props.category ? this.props.category : []
       
        // this.props.errors.find((value,index) => console.log(value))
        // console.log(this.props.errors)
        // console.log( this.props.errors.findIndex(this.props.name))
        return (
            <div className="form-group">
                <label htmlFor={"Input"+this.props.placeholder}>{this.props.placeholder}</label>
                <select
                    value = {this.props.value}
                    className={error ? "form-control is-invalid" : "form-control"}
                    placeholder={this.props.placeholder} id={"Input"+this.props.placeholder} autoComplete="off"
                    name={this.props.name}
                    ref = {input => this.props.setRef(this.props.name,input)}
                    defaultValue = {this.props.defaultValue}
                    onChange = {this.props.onChange}
                >
                    <option value="">{this.props.placeholder}</option>
                    {category.map((value,index)=>
                        <option value={value.id} key={index}>
                            {value.category_name}
                        </option>
                    )}
                </select>
                {error ?
                <div className="invalid-feedback">
                    <label>
                        {this.props.errors[this.props.name]}
                        {/* {error[0]} */}
                    </label>
                </div> 
                : null}
                
            </div>
        )
    }
}


export default Select