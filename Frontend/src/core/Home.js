import React , {useEffect,useState}from 'react';
import {getProducts} from "./helper.js/coreapicalls";
import Base from "./Base";
import Card from "./Card";

export default function Home(){
    const [products,setProducts] = useState([]);
    const [error,setError] = useState(false);

    const loadAllProducts = () => {
        getProducts()
            .then((data) => {
                if (data?.error)
                {
                    setError(data.error);
                    console.log(error);
                }
                else {
                    setProducts(data);
                }
            });
    };


    useEffect(() => {
        loadAllProducts();
    },[]);

    return(
        <Base title="Integer-i" description="Welcome to the Merchandise Store">
            <div className='row'>
                { products.map( (product,index) =>{
                   return(
                     <div key={index} className='col-4 mb-4'>
                        <Card product={product}/>
                     </div>

                   );
                })
                }
            </div>
        </Base>
    );
}
