package merliontechs.web.rest;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import merliontechs.domain.Sales;
import merliontechs.domain.Pair;
import merliontechs.domain.Product;

@Controller
@RequestMapping("/api")
public class HomeResource {
    private final Logger log = LoggerFactory.getLogger(SalesResource.class);
    
    public Sales[] getAllSales() {
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        //headers.add("Authorization", token);
        HttpEntity entity = new HttpEntity(headers);
        ResponseEntity<Sales[]> salesEntity = rest.exchange("/sales", HttpMethod.GET, entity, Sales[].class);
        Sales[] sales = salesEntity.getBody();
        System.out.println(sales);
        return sales;
    }

    public Product[] getAllProduct() {
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        //headers.add("Authorization", token);
        HttpEntity entity = new HttpEntity(headers);
        ResponseEntity<Product[]> productsEntity = rest.exchange("/products", HttpMethod.GET, entity, Product[].class);
        Product[] products = productsEntity.getBody();

        return products;
    }

    // @GetMapping("/")
    public List<Pair> getDeliveredDay(){
        log.debug("REST request to get all pairs");
        List<Pair> list= new ArrayList<Pair>();
        Sales[] sales=getAllSales();
        int index;
        for(int i=0; i<sales.length;i++){
            if((sales[i].getState().toString()).equals("DELIVERED")){
                index=indexList(sales[i].getDate().toString(),list);
                if(index==-1)
                    list.add(new Pair(sales[i].getDate().toString()));
                else
                    list.get(index).setCont(list.get(index).getCont()+1);
            }
        }
        return list;
    }

    
    private int indexList(String date,List<Pair> list){
        int index=-1;
        for(Pair e:list){
            if(e.getDate().equals(date))
                index=list.indexOf(e);
        }
        return index;
    }

    //@GetMapping("/")
    public List<Pair> getSalesDay(){
        List<Pair> list=new ArrayList<Pair>();
        Sales[] sales=getAllSales();
        int index;
        for(Sales sale:sales){
            index=indexList(sale.getDate().toString(),list);
            if(index==-1)
                list.add(new Pair(sale.getDate().toString()));
            else
                list.get(index).setCont(list.get(index).getCont()+1);
        }
        return list;
    }

    //@GetMapping("/")
    public List<Pair> getProductSales(){
        List<Pair> list=new ArrayList<Pair>();
        Sales[] sales=getAllSales();
        int index;
        for(Sales sale:sales){
            if(sale.getProduct()!=null){
                index=indexList(sale.getProduct().getName(),list);
                if(index==-1)
                    list.add(new Pair(sale.getProduct().getName()));
                else
                    list.get(index).setCont(list.get(index).getCont()+1);
            }
        }
        return list;
    }

    //@GetMapping("/")
    public List<Pair> getProductIngresos(){
        List<Pair> list=new ArrayList<Pair>();
        Product[] products=getAllProduct();
        List<Pair> listProducts=getProductSales();

        for(Pair pair:listProducts){
            for(Product product:products){
                if(pair.getDate().equals(product.getName()))
                    list.add(new Pair(pair.getDate(),pair.getCont()*product.getPrice().floatValue()));
            }
        }
        return list;
    }
    
}