import React,{Component} from 'react';
import Layout from '../Layout'
import Input from '../input'
import Table from '../Table'
import Pagination from '../Pagination'

class Product extends Component {
  constructor(props) {
      super(props);
      this.state = {
          loading :true,
          errors : {},
          response : {
            current_page : 1,
            last_page : 1,
            data :[]
          }
      }
  }
  render(){
    return (
      <Layout>
          <div className="container">
              <form>
                <h4 className="text-center">
                  PRODCUT
                </h4>
                <div className="text-right">
                    <button type="button" className="btn btn-primary active " 
                    onClick = {()=>this.props.history.push('/product/create')}
                    >CREATE PRODUCT</button>
                </div>
                <Table/>
                <Pagination {...this.state.response}/>
                <Input name="product_name" placeholder="Product Name" errors={this.state.errors}
                  type="text"
                  setRef = {(value,input) => this[value] = input}
                />
              </form>
          </div>
      </Layout>
    );
  }
}

export default Product;
