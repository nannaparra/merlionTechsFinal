import React, {useState} from 'react';
import {ISalesProps} from 'app/entities/sales/sales';

interface IPair{
    date:string;
    cont:number;
};

export const DeliveredDia=()=>{

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
        let index:number;
        for(const sale of salesList){
            if(sale.state==='DELIVERED') { // Si esta en estado de deliveri...
                index= pairs.findIndex(pair=>pair.date===(sale.date)),
                (index===-1)?(  // Si no esta en el arreglo agrego, sino incremento- 
                    addPair(sale.date)
                ):(
                setCont(index) // Seteo el contador, lo incremento, primero deberia buscar el index en el arreglo.
                )
            };
        }
    };

    return (
        <h1>Grafico deliverededDia</h1>
    )
}


    