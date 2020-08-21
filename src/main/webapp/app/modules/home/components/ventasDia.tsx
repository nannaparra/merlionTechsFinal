import React,{ useState } from "react";
import { ISalesProps } from 'app/entities/sales/sales';

interface IPair{
    date:string;
    cont:number;
};

export const VentasDia=()=>{
    const [pairs, setPairs]=useState<IPair[]>([]);

    let props: ISalesProps;
    const salesList=props.salesList;


    const addPair=(date:string)=>{
        const newPairs=[...pairs,{date,cont:0}];
        setPairs(newPairs);
    };

    const setCont=(index: number)=>{
        pairs[index].cont++;
    };

    const ventas=()=>{
        let index: number;
        for(const sale of salesList){
            index=pairs.findIndex(pair =>pair.date===sale.date);
            (index===-1)?(
                addPair(sale.date)
            ):(
                setCont(index)
            )
        };
    }
    
    return(
        <h1>Grafico ventas por dia</h1>
    )
}

