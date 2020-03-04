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
            limit : 15,
            data :[]
          }
      }
      this.getApi = this.getApi.bind(this)
      this.create_UUID = this.create_UUID.bind(this)
  }

  componentWillMount(){
    this.getApi()
  }

  async getApi(page = 1){
      // console.log(this.props)
      let token = localStorage.getItem('token');
      const config = { 
        headers :{ 
          Authorization : `bearer ${token ? token : ''}`
        }, 
        params : {
          uid : this.create_UUID(),
          page : page,
          limit : this.state.response.limit
        }
      }
      console.log(config)
      try {
          let res = await axios.get("/api/product",config);
          // this.state.user = res.data
          console.log(res)
          this.setState({
            ...this.state,
            response : {
              ...this.state.response,
              ...res.data
            },
            loading : false

          })
          
      } catch (err) {
          console.log(err)
         
      }
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
                <Table {...this.state.response} getApi={this.getApi} loading={this.state.loading}/>
                <Pagination {...this.state.response} chagePage = {(page)=>this.getApi(page)}/>
              </div>
              }
          </div>
      </Layout>
    );
  }
}

export default Product;
