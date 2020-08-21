import React, {useState} from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
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
        <BarChart
        width={500}
        height={300}
        data={pairs}
        margin={{
            top: 5, right: 30, left: 20, bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cont" fill="#8884d8" />
        </BarChart>
    )
}


    