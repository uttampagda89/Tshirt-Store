import {API} from "../../backend";
import {cartEmpty} from "../../core/helper.js/cartHelper";

export const signup = user => {
    return fetch(`${API}user/`, {
        method: 'POST',
        headers: {accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
        .then((response)=>{                  //if we receive response from api
            return response.json();
        })
        .catch((err => console.log(err)))
};

// using form data method(we also can do signin method as sign in method as JSON format)
export const signin = user => {
    const formData = new FormData();

    for (const name in user){
        formData.append(name,user[name]);
    }

                                                            {/* const {email,password} = user;
                                                             const formData = new FormData()
                                                             fromData.append('email':email)
                                                             formData.append('password':password);
                                                             */}  //alternative of upper for loop


    for (var key of formData.keys()){
        console.log('MYKEY:',key)
    }

    return fetch(`${API}user/login/`, {
        method: 'POST',
        body: formData
    })
        .then((response)=>{                  //if we receive response from api
            return response.json();
        })
        .catch((err => console.log(err)))

}

export const authenticate = (data,next) =>{
    if(typeof window !==undefined){
        localStorage.setItem('jwt',JSON.stringify(data));         //JWT is noting but our custom cookie
        next();
    }
};

export const isAuthenticated = () =>{                                //S12V5
    if(typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
        //TODO: compare JWT with database token to make it more secure
    } else {
        return false;
    }
};

export const signout= next =>{                                     //S12V5
 const userId = isAuthenticated() && isAuthenticated().user.id;

 if (typeof window !== undefined){
     localStorage.removeItem('jwt')
     cartEmpty(()=>{});
     //next()  testing purpose

     return fetch(`${API}user/logout/${userId}`,{method:'GET', mode: 'no-cors',} )
         .then(response=>{console.log('Signout Sucess');
         next();
         })
         .catch(err=>console.log(err));
 }
};
