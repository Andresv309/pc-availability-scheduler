package com.adso.crudapp.dbSeeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.adso.crudapp.controller.ComputerController;
import com.adso.crudapp.model.ComputerStock;
import com.adso.crudapp.repository.ComputerStockRepository;

@Component
public class ComputerStockSeeder implements CommandLineRunner {
    private final ComputerStockRepository computerStockRepository;

    @Autowired
    public ComputerStockSeeder(ComputerStockRepository entityRepository) {
        this.computerStockRepository = entityRepository;
    }

    @Override
    public void run(String... args) throws Exception {
    	
//    	ComputerController computerController = new ComputerController();
//    	Computer computer1 = computerController.
//
//    	ComputerStock entity1 = new ComputerStock();
//    	entity1.set
//        computerStockRepository.save(entity1);
//
//        ComputerStock entity2 = new ComputerStock();
//
//        computerStockRepository.save(entity2);


    }
}
