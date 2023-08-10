package com.adso.crudapp.dbSeeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.adso.crudapp.model.Computer;
import com.adso.crudapp.repository.ComputerRepository;

@Component
public class ComputerSeeder implements CommandLineRunner {
    private final ComputerRepository computerRepository;

    @Autowired
    public ComputerSeeder(ComputerRepository entityRepository) {
        this.computerRepository = entityRepository;
    }

    @Override
    public void run(String... args) throws Exception {

    	Computer entity1 = new Computer();
    	entity1.setName("IdeaCentre AIO 5i 7ma Gen");
    	entity1.setBrand("Dell");
    	entity1.setProcessor("Procesador Intel® Core™ i9-12500H de 12ᵃ generación");
    	entity1.setRam("64Gb");
    	entity1.setHasGraphicsCard(true);
        computerRepository.save(entity1);

        Computer entity2 = new Computer();
        entity2.setName("Portátil HP Victus 16-d0504la");
    	entity2.setBrand("HP");
    	entity2.setProcessor("Procesador Intel® Core™ i5 de 11ᵃ generación");
    	entity2.setRam("16Gb");
    	entity2.setHasGraphicsCard(true);
        computerRepository.save(entity2);


    }
}
