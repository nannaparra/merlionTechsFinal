/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart,Pie,} from 'recharts';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from 'app/entities/sales/sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { IProduct } from 'app/shared/model/product.model';
import { HomeState } from 'app/modules/home/home.reducer';

export interface ILogicProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

interface IPair{
    Nombre:string;
    Cantidad:number;
};

interface IPairProduct{
    product:IProduct;
    cont:number;
};

export const Logic = (props: ILogicProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);
  
  const { salesList, match, loading } = props;

  const deliveredDia=()=>{
    const pairs:IPair[]=[];

    const addPair=(Nombre:string)=>{
        const Cantidad=1;
        const newPairs={Nombre,Cantidad};
        pairs.push(newPairs);
    }

    for(let i=0;i<salesList.length;i++) {
        let index: number
        if(salesList[i].state==='DELIVERED') { 
            index= pairs.findIndex(pair=>pair.Nombre===(salesList[i].date)),
            (index===-1) ? ( 
                addPair(salesList[i].date)
            ):(
                pairs[index].Cantidad=(pairs[index].Cantidad)+1
            )
        }
    }
    return pairs;
  }

  const ventasDia=()=>{
    const pairs:IPair[]=[];

    const addPair=(Nombre:string)=>{
        const Cantidad=1;
        const newPairs={Nombre,Cantidad};
        pairs.push(newPairs);
    };
    
    let index: number;
    for(const sale of salesList){
        index=pairs.findIndex(pair =>pair.Nombre===sale.date);
        (index===-1)?(
            addPair(sale.date)
        ):(
            pairs[index].Cantidad=(pairs[index].Cantidad)+1
        )
    };
    return pairs;
  }

  const productSales=()=>{
      const pairs:IPairProduct[]=[];

      const addPair=(product:IProduct)=>{
        const cont=1;
        const newPairs={product,cont};
        pairs.push(newPairs);
      };

      let index:number;
      for(const sale of salesList){
          if(sale.product!==null){
            index=pairs.findIndex(pair=>pair.product===sale.product);
            (index===-1)?(
                addPair(sale.product)
            ):(
                pairs[index].cont=(pairs[index].cont)+1
            ) 
          }
      }
      pairs.sort(function (a, b) {
        if (a.cont < b.cont) {
          return 1;
        }
        if (a.cont > b.cont) {
          return -1;
        }
        return 0;
      });

      const fiveProduct:IPairProduct[]=pairs.slice(0,5);
      
      return fiveProduct;
  }

  const productIngresos=()=>{
      const pairs:IPairProduct[]=[];
      const list=productSales();

      const addPair=(product:IProduct,cont:number)=>{
        const newPairs={product,cont};
        pairs.push(newPairs);
      };

      for(const prod of list){
        addPair(prod.product,prod.product.price*prod.cont)
      }
      
      pairs.sort(function (a, b) {
        if (a.cont < b.cont) {
          return 1;
        }
        if (a.cont > b.cont) {
          return -1;
        }
        return 0;
      });


      const fiveProduct:IPairProduct[]=pairs.slice(0,5);
      const returnPair:IPair[]=[];
      for(let i=0;i<fiveProduct.length;i++){
        returnPair.push({Nombre:fiveProduct[i].product.name,Cantidad:fiveProduct[i].cont});
      }
      return returnPair;
  }


  return(
        <div id="General">
            <div id="Ventas en estado de Delivery por Dia">
                <h3>Ventas en estado de delivery por día</h3>
                <BarChart 
                width={500} 
                height={300} 
                data={deliveredDia()}
                margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Nombre" />
                    <YAxis dataKey="Cantidad"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Cantidad" fill="#8884d8" />
                </BarChart>
            </div>
            <div id="Ventas por dia">
                <h3>Ventas por día</h3>
                <BarChart 
                width={500} 
                height={300} 
                data={ventasDia()}
                margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Nombre" />
                    <YAxis dataKey="Cantidad"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Cantidad" fill="#8884d8"/>
                </BarChart>
            </div>
            <div id="5 productos más vendidos">
                <h3>Ranking 5 productos más vendidos</h3>
                <PieChart width={400} height={400}>
                    <Pie data={productSales()} dataKey="cont" cx={200} cy={200} outerRadius={60} fill="#8884d8" label/>
                </PieChart>
            </div>
            <div id="5 producto mas ingresos">
                <h3>Ranking 5 productos que dejaron más ingresos</h3>
                <PieChart width={400} height={400}>
                    <Pie data={productIngresos()} dataKey="Cantidad" cx={200} cy={200} outerRadius={60} fill="#8884d8" label/>
                </PieChart>
            </div>
        </div>
    );
};

export const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

  const mapDispatchToProps = {
    getEntities,
  };
  
  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;
  
  export default connect(mapStateToProps, mapDispatchToProps)(Logic);
  