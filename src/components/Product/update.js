import React,{Component} from 'react';
import Layout from '../Layout'
import Input from '../input'
import Table from '../Table'
import Pagination from '../Pagination'
import axios from 'axios'

class ProductUpdate extends Component {
  constructor(props) {
      super(props);
      this.state = {
          loading :false,
          errors : {},
          
      }
  }

  apiPost(e){
    e.preventDefault();
    // axios.
    console.log('update')
  }

  render(){
    return (
      <Layout>
          <div className="container">
              <form onSubmit={this.apiPost}>
                <h4 className="text-center">
                  PRODCUT CREATE
                </h4>
                
                <Input name="product_name" placeholder="Product Name" errors={this.state.errors}
                  type="text"
                  setRef = {(value,input) => this[value] = input}
                />
                <Input name="detail" placeholder="Detail" errors={this.state.errors}
                  type="text"
                  setRef = {(value,input) => this[value] = input}
                />
                <Input name="price" placeholder="Price" errors={this.state.errors}
                  type="text"
                  setRef = {(value,input) => this[value] = input}
                />
                <div className="text-center">
                    <button type="submit" className="btn btn-primary active w-100" disabled={this.state.loading}>บันทึก</button>
                </div>
              </form>
          </div>
      </Layout>
    );
  }
}

export default ProductUpdate;
