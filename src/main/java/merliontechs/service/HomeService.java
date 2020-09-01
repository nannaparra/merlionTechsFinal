package merliontechs.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import merliontechs.domain.Sales;
import merliontechs.repository.ProductRepository;
import merliontechs.repository.SalesRepository;
import merliontechs.domain.Pair;
import merliontechs.domain.Product;

@Service
@Transactional
public class HomeService {
    private final Logger log = LoggerFactory.getLogger(HomeService.class);

    private final SalesRepository salesRepository;
    private final ProductRepository productRepository;

    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    public HomeService(SalesRepository sales, ProductRepository prod){
        salesRepository=sales;
        productRepository=prod;
    }
   
    public List<Pair> getDeliveredDay(){
        log.debug("REST request to get all pairs");
        List<Pair> list= new ArrayList<Pair>();
        List<Sales> sales=salesRepository.findAll();
        int index;
        for(Sales sale:sales){
            if((sale.getState().toString()).equals("DELIVERED")){
                index=indexList(sale.getDate().format(formatter),list);
                if(index==-1)
                    list.add(new Pair(sale.getDate().format(formatter)));
                else
                    list.get(index).setCantidad(list.get(index).getCantidad()+1);
            }
        }
        return list;
    }

    
    private int indexList(String date,List<Pair> list){
        int index=-1;
        for(Pair e:list){
            if(e.getNombre().equals(date))
                index=list.indexOf(e);
        }
        return index;
    }

    public List<Pair> getSalesDay(){
        List<Pair> list=new ArrayList<Pair>();
        List<Sales> sales=salesRepository.findAll();
        int index;
        for(Sales sale:sales){
            index=indexList(sale.getDate().format(formatter),list);
            if(index==-1)
                list.add(new Pair(sale.getDate().format(formatter)));
            else
                list.get(index).setCantidad(list.get(index).getCantidad()+1);
        }
        return list;
    }

    public List<Pair> getProductSales(){
        List<Pair> list=new ArrayList<Pair>();
        List<Sales> sales=salesRepository.findAll();
        int index;
        for(Sales sale:sales){
            if(sale.getProduct()!=null){
                index=indexList(sale.getProduct().getName(),list);
                if(index==-1)
                    list.add(new Pair(sale.getProduct().getName()));
                else
                    list.get(index).setCantidad(list.get(index).getCantidad()+1);
            }
        }
        list.sort(Comparator.comparing(Pair::getCantidad).reversed());
        return list.subList(0, 5);
    }


    public List<Pair> getProductIngresos(){
        List<Pair> list=new ArrayList<Pair>();
        List<Product> products=productRepository.findAll();
        List<Pair> listProducts=getProductSales();
        for(Pair pair:listProducts){
            for(Product product:products){
                if(pair.getNombre().equals(product.getName()))
                    list.add(new Pair(pair.getNombre(),pair.getCantidad()*product.getPrice().floatValue()));
            }
        }
        list.sort(Comparator.comparing(Pair::getCantidad).reversed());
        return list.subList(0, 5);
    }
    
}