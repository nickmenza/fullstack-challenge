import React,{Component} from 'react';
import {
     withRouter,
  } from "react-router-dom";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios'

class Table extends Component {
    constructor(props) {
        super(props);
       this.state = {
           loading : false
       }
    }

    delete(id){
        let token = localStorage.getItem('token');
        const config = { headers :{ Authorization : `bearer ${token ? token : ''}`} }
        console.log('delete',id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then( async(result) => {
            if (result.value) {
                this.state.loading = true
                this.forceUpdate()
                let ax = await axios.delete('/api/product/'+id ,config)
                await this.props.getApi()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product has been deleted',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.state.loading = false
                this.forceUpdate()
            
            }
        })
    }
    
    render(){
        return(
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Catgory</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((value,index) =>
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{value.category_id}</td>
                        <td>{value.product_name}</td>
                        <td>{value.detail}</td>
                        <td>{value.price}</td>
                        <td>
                            <button type="button" className="btn btn-primary active mr-2" 
                            onClick = {()=>this.props.history.push('/product/'+value.id)}
                            disabled = {this.state.loading}
                            >EDIT</button>
                            <button type="button" className="btn btn-danger active " 
                            onClick = {()=>this.delete(value.id)}
                            disabled = {this.state.loading}
                            >DELETE</button>
                        </td>

                    </tr>
                    )}
                </tbody>
            </table>
        )
    }
}

export default withRouter(Table)