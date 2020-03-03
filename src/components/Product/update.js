import React,{Component} from 'react';
import Layout from '../Layout'
import Input from '../input'
import Select from '../select'
import Table from '../Table'
import Pagination from '../Pagination'
import axios from 'axios'
import Swal from 'sweetalert2'

class ProductUpdate extends Component {
  constructor(props) {
      super(props);
      this.state = {
          loading : true,
          errors : {},
          data : {}
          
      }
      this.apiGet = this.apiGet.bind(this)
      this.apiPost = this.apiPost.bind(this)
      this.validate = this.validate.bind(this)
      this.onChange = this.onChange.bind(this)
  }

  componentWillMount(){
    this.apiGet()
  }

  validate(form) {
      // console.log()
      let price = false
      if(form.price.length != 0){
        if(new RegExp("^[0-9]*$").test(form.price)){
          
        }else{
          price = 'Price number only'
        }
      }else{
        price = 'Price field is required'
      }
      
      return {
          category_id: form.category_id.length === 0 ? 'Category Name field is required.' : false,
          product_name: form.product_name.length === 0 ? 'Prodcut Name field is required' : false,
          detail: form.detail.length === 0 ? 'Dateil field is required' : false,
          price: price,

      };
  }

  apiPost(e){
    e.preventDefault();

    let token = localStorage.getItem('token');
    let self = this
    let config = { headers :{ Authorization : `bearer ${token ? token : ''}`} }

    let form = {
        category_id : this.category_id.value,
        product_name : this.product_name.value,
        detail : this.detail.value,
        price : this.price.value,
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

    
    console.log(config)
    let success = (response) =>{
        console.log(response)
        this.props.history.push('/product')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.data,
          showConfirmButton: false,
          timer: 1500
      })
    }
    let axcatch = (error) => {
        this.state.errors = error.response.data.errors;
        this.forceUpdate();
    }
    // let url = '/api/course'
    if(this.props.match.params.id != 'create'){
        let ax = axios.patch('/api/product/'+this.props.match.params.id ,form ,config).then(success).catch(axcatch)
    }else{
        let ax = axios.post('/api/product',form,config).then(success).catch(axcatch)
    }
  }

  apiGet(){
    console.log('apiGet',this.props)

    let token = localStorage.getItem('token');
    const config = { headers :{ Authorization : `bearer ${token ? token : ''}`} }
    let ar_  = [];
    let getCategory = axios.get("/api/category",config);
    ar_.push(getCategory);
    if(this.props.match.params.id != 'create'){
        let getCourse = axios.get('/api/product/'+this.props.match.params.id ,config);
        ar_.push(getCourse);
    }

    axios.all(ar_).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1] ? responses[1] : {}
        console.log(responses)
        if(this.props.match.params.id != 'create'){
            this.setState({
                loading : false,
                category : responseOne.data,
                data : {
                    ...responseTwo.data[0],
                   
                }
            })
        }else{
            this.setState({
              loading : false,
                category : responseOne.data,
            })
        }
        console.log(responseOne,responseTwo)
    })).catch(errors => {
        console.log(errors)
    // react on errors.
    })
  }

  onChange(e){
    this.setState({
      data : {
        ...this.state.data,
        category_id : e.target.value
      } 
    })
  }

  render(){
    return (
      <Layout>
          <div className="container">
              {this.state.loading ? "Loading..." : 
              <form onSubmit={this.apiPost}>
                <h4 className="text-center">
                  PRODCUT 
                  {this.props.match.params.id == 'create' ? " CREATE" : " UPDATE"}
                </h4>
                <Select name="category_id" placeholder="Category Name" errors={this.state.errors}
                  category = {this.state.category}
                  value = {this.state.data.category_id}
                  onChange = {(e)=>this.onChange(e)}
                  type="text"
                  setRef = {(value,input) => this[value] = input}
                />
                <Input name="product_name" placeholder="Product Name" errors={this.state.errors}
                  type="text"
                  defaultValue = {this.state.data.product_name}
                  setRef = {(value,input) => this[value] = input}
                />
                <Input name="detail" placeholder="Detail" errors={this.state.errors}
                  type="text"
                  defaultValue = {this.state.data.detail}
                  setRef = {(value,input) => this[value] = input}
                />
                <Input name="price" placeholder="Price" errors={this.state.errors}
                  type="text"
                  defaultValue = {this.state.data.price}
                  setRef = {(value,input) => this[value] = input}
                />
                <div className="text-center">
                    <button type="submit" className="btn btn-primary active w-100" disabled={this.state.loading}>บันทึก</button>
                </div>
              </form>
              }
          </div>
      </Layout>
    );
  }
}

export default ProductUpdate;
