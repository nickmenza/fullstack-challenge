import {connect_mysql} from './connect'

class user {
    constructor() {
    }
  
    async get() {
        console.log('user get')
        let pool = await connect_mysql()
        let query = `SELECT * FROM user WHERE email = "${email}" AND password = "${password}" LIMIT 1`;
        const recentVotesQuery = pool.query(query);
        return await createPool();
    }
  }
  
  const singleton = new user();
  export default singleton;
  
 

// export const user = async function() {
//    
// }