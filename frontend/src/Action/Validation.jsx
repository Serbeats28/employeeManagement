export default function Validation(data){
    let error = [];


    if(data.oldPass === '' || data.newPass === '' || data.conPass === ''){
      error.require = 'All fields is required'
    }else{
      error.require = ''
    }
    if(data.newPass !== data.conPass){
       error.notMatch = 'fuck the world'
    }else{
      error.notMatch = ''
    }

    return error;
}