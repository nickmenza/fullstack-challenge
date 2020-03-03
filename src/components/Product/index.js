import React,{Component} from 'react';
import Layout from '../Layout'
import Input from '../input'
import Table from './table'
import Pagination from '../Pagination'
import axios from 'axios'

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
      this.getApi = this.getApi.bind(this)
  }

  componentWillMount(){
    this.getApi()
  }

  async getApi(){
      // console.log(this.props)
      let token = localStorage.getItem('token');
      const config = { headers :{ Authorization : `bearer ${token ? token : ''}`} }
      console.log(config)
      try {
          let res = await axios.get("/api/product",config);
          // this.state.user = res.data
          console.log(res)
          this.setState({
            ...this.state,
            response : {
              ...this.state.response,
              data : res.data,
            },
            loading : false

          })
          
      } catch (err) {
          console.log(err)
         
      }
  }

  render(){
    return (
      <Layout>
          <div className="container">
              {this.state.loading ? "Loading..." : 
              <div>
                <h4 className="text-center">
                  PRODCUT
                </h4>
                <div className="text-right">
                    <button type="button" className="btn btn-primary active " 
                    onClick = {()=>this.props.history.push('/product/create')}
                    >CREATE PRODUCT</button>
                </div>
                <Table data={this.state.response.data} getApi={this.getApi} loading={this.state.loading}/>
                <Pagination {...this.state.response}/>
              </div>
              }
          </div>
      </Layout>
    );
  }
}

export default Product;
