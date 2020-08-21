import React,{ useState } from "react";
import { ISalesProps } from 'app/entities/sales/sales';
import { IProduct } from 'app/shared/model/product.model';

interface IPair{
    producto:IProduct;
    cont:number;
};

export let ProductoVentas: IPair[]=[];

export const ProductosMasVendidos=()=>{
    const [pairs, setPairs]=useState<IPair[]>([]);
    // Esto se lo tengo que pasar a productosMasingresos.
    ProductoVentas=pairs;
    
    let props: ISalesProps;
    const salesList=props.salesList;

    const addPair=(producto:IProduct)=>{
        const newPairs=[...pairs,{producto,cont:0}];
        setPairs(newPairs);
    };

    const setCont=(index: number)=>{
        pairs[index].cont++;
    };

    const ventas=()=>{
        let index:number;
        for(const sale of salesList){
            index=pairs.findIndex(pair=>pair.producto===sale.product);
            (index===-1)?(
                addPair(sale.product)
            ):(
                setCont(index)
            )
        }
    }
    
    // Falta función para mostrar solo los 5 mayores.
    
    return(
        <h1>Graficos productos mas vendidos</h1>
    )

}










