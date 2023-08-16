package com.adso.crudapp.dbSeeder;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.adso.crudapp.controller.ComputerController;
import com.adso.crudapp.enums.CardIdType;
import com.adso.crudapp.enums.Session;
import com.adso.crudapp.enums.State;
import com.adso.crudapp.model.Computer;
import com.adso.crudapp.model.ComputerStock;
import com.adso.crudapp.model.Student;
import com.adso.crudapp.repository.ComputerStockRepository;
import com.adso.crudapp.repository.StudentRepository;

@Component
public class ComputerStockSeeder implements CommandLineRunner {
	
	@Autowired
	private ComputerStockRepository computerStockRepository;
	@Autowired
	private StudentRepository studentRepository;
//    private final StudentRepository studentRepository;

//    @Autowired
//    public ComputerStockSeeder(ComputerStockRepository entityRepository) {
//        this.computerStockRepository = entityRepository;
//    }

    @Override
    public void run(String... args) throws Exception {
    	
    	Student entity1 = new Student();
    	entity1.setName("Wilson");
    	entity1.setCardIdType(CardIdType.CC);
    	entity1.setCardIdNumber("487512395");
    	entity1.setSession(Session.NIGHT);
    	
    	Computer entity1Comp = new Computer();
    	ComputerStock entity1CompStock = new ComputerStock();
//    	ComputerAssignment entity1CompAss = new ComputerAssignment();
    	
    	entity1Comp.setName("MacBook Air M1");
    	entity1Comp.setBrand("Apple");
    	entity1Comp.setProcessor("Apple M1");
    	entity1Comp.setRam("8GB");
    	entity1Comp.setHasGraphicsCard(false);
    	
    	entity1CompStock.setCode("COMP-45");
    	entity1CompStock.setLocation("Ventana");
    	entity1CompStock.setState(State.WORKING);
    	
    	entity1CompStock.setComputer(entity1Comp);
    	entity1.setComputerStock(entity1CompStock);
//    	entity1CompAss.setComputerStock(entity1CompStock);
//    	entity1.setComputerAssignment(entity1CompAss);
    	
    	Student entity2 = new Student();
    	entity2.setName("Emily");
    	entity2.setCardIdType(CardIdType.TI);
    	entity2.setCardIdNumber("0987654321");
    	entity2.setSession(Session.MORNING);

    	Computer entity2Comp = new Computer();
    	ComputerStock entity2CompStock = new ComputerStock();
//    	ComputerAssignment entity2CompAss = new ComputerAssignment();

    	entity2Comp.setName("Inspiron 15");
    	entity2Comp.setBrand("HP");
    	entity2Comp.setProcessor("Intel Core i5-11300H");
    	entity2Comp.setRam("16GB");
    	entity2Comp.setHasGraphicsCard(false);

    	entity2CompStock.setCode("COMP-46");
    	entity2CompStock.setLocation("Desk");
    	entity2CompStock.setState(State.WORKING);

    	entity2CompStock.setComputer(entity2Comp);
    	entity2.setComputerStock(entity2CompStock);
//    	entity2CompAss.setComputerStock(entity2CompStock);
//    	entity2.setComputerAssignment(entity2CompAss);
    	
    	Student entity3 = new Student();
    	entity3.setName("Sophia");
    	entity3.setCardIdType(CardIdType.CC);
    	entity3.setCardIdNumber("9876543210");
    	entity3.setSession(Session.AFTERNOON);

    	Computer entity3Comp = new Computer();
    	ComputerStock entity3CompStock = new ComputerStock();
//    	ComputerAssignment entity3CompAss = new ComputerAssignment();

    	entity3Comp.setName("Aspire 5");
    	entity3Comp.setBrand("Acer");
    	entity3Comp.setProcessor("AMD Ryzen 7 5800U");
    	entity3Comp.setRam("12GB");
    	entity3Comp.setHasGraphicsCard(true);

    	entity3CompStock.setCode("COMP-47");
    	entity3CompStock.setLocation("Table");
    	entity3CompStock.setState(State.WORKING);

    	entity3CompStock.setComputer(entity3Comp);
    	entity3.setComputerStock(entity3CompStock);
//    	entity3CompAss.setComputerStock(entity3CompStock);
//    	entity3.setComputerAssignment(entity3CompAss);
    	

    	Student entity4 = new Student();
    	entity4.setName("Oliver");
    	entity4.setCardIdType(CardIdType.TI);
    	entity4.setCardIdNumber("5678901234");
    	entity4.setSession(Session.NIGHT);

    	Computer entity4Comp = new Computer();
    	ComputerStock entity4CompStock = new ComputerStock();
//    	ComputerAssignment entity4CompAss = new ComputerAssignment();

    	entity4Comp.setName("ThinkPad X1 Carbon");
    	entity4Comp.setBrand("Lenovo");
    	entity4Comp.setProcessor("Intel Core i7-1165G7");
    	entity4Comp.setRam("32GB");
    	entity4Comp.setHasGraphicsCard(true);

    	entity4CompStock.setCode("COMP-48");
    	entity4CompStock.setLocation("Shelf");
    	entity4CompStock.setState(State.MAINTENANCE);

    	entity4CompStock.setComputer(entity4Comp);
    	entity4.setComputerStock(entity4CompStock);
//    	entity4CompAss.setComputerStock(entity4CompStock);
//    	entity4.setComputerAssignment(entity4CompAss);
    	
    	
        studentRepository.saveAll(
        		List.of(entity1, entity2, entity3, entity4)
		);

    }
}
