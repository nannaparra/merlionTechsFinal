import React,{ useState } from "react";
import { ISalesProps } from 'app/entities/sales/sales';
import { IProduct } from 'app/shared/model/product.model';
import {ProductoVentas} from './productosMasVendidos';

interface IPair{
    producto:IProduct;
    ingreso:number;
};

export const ProductosMasIngresos=()=>{
    const [pairs, setPairs]=useState<IPair[]>([]);

    let props: ISalesProps;
    const salesList=props.salesList;


    const addPair=(producto:IProduct, ingreso:number)=>{
        const newPairs=[...pairs,{producto,ingreso}];
        setPairs(newPairs);
    };

    const calculoIngresos=()=>{
        for(const prod of ProductoVentas){ // pairs de productos mas vendidos.
            addPair(prod.producto, prod.producto.price*prod.cont)
        }
    }

    // Falta función para mostrar solo los 5 mayores.


    return(
        <h1>Grafico productos mas vendidos</h1>
    )
}





