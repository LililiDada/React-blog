import Axios from "axios"

export let request = (options={}) => {
    return new Promise((resolve,reject)=>{
        Axios({
            method:options.method,
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Authorization':localStorage.getItem('token')?`Bearer ${localStorage.getItem('token')}`:''
            },
            url:options.url,
            data:options.data || {},
        }).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
    
}

export let login =  (options={}) => {
    return new Promise((resolve,reject)=>{
        Axios({
            method:options.method,
            url:options.url,
            data:options.data,
        }).then(res=>{
            resolve(res); 
        }).catch(err=>{
            reject(err);
        })
    })
    
}
