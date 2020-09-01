package merliontechs.web.rest;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import merliontechs.service.HomeService;
import merliontechs.domain.Pair;

@RestController
@RequestMapping("/api")
@Transactional
public class HomeResource {
    private final Logger log = LoggerFactory.getLogger(SalesResource.class);

    private final HomeService homeService;

    public HomeResource(HomeService homeService){
        this.homeService=homeService;
    }
    
    @GetMapping("/")
    public List<List<Pair>> getMetrics(){
        log.debug("REST request to get all metrics");
        List<List<Pair>> list= new ArrayList<List<Pair>>();
        list.add(homeService.getDeliveredDay());
        list.add(homeService.getSalesDay());
        list.add(homeService.getProductSales());
        list.add(homeService.getProductIngresos());
        return list;
    }

}