import axios from 'axios'

export default function ajax(url,data={},type='GET'){
  return new Promise((resolve,reject) =>{
      let promise
      if (type==='GET') {
          promise = axios.get(url,{//配置对象
            params:data
          })
      }else{
        //   let instance = axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
          promise = axios.post(url,data)
      }
      promise.then(response =>{
          resolve(response.data)
      }).catch(error =>{
          reject(error)
      })
  })
}