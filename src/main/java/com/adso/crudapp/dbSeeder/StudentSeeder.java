package com.adso.crudapp.dbSeeder;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.adso.crudapp.enums.CardIdType;
import com.adso.crudapp.enums.Session;
import com.adso.crudapp.model.Student;
import com.adso.crudapp.repository.StudentRepository;

@Component
public class StudentSeeder implements CommandLineRunner {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentSeeder(StudentRepository entityRepository) {
        this.studentRepository = entityRepository;
    }

    @Override
    public void run(String... args) throws Exception {

    	Student entity1 = new Student();
    	entity1.setName("Carl");
    	entity1.setCardIdType(CardIdType.CC);
    	entity1.setCardIdNumber("123456789");
    	entity1.setSession(Session.NIGHT);
//        studentRepository.save(entity1);

        Student entity2 = new Student();
        entity2.setName("Anna");
    	entity2.setCardIdType(CardIdType.TI);
    	entity2.setCardIdNumber("798456123");
    	entity2.setSession(Session.MORNING);
//        studentRepository.save(entity2);
        
        Student entity3 = new Student();
        entity3.setName("Sophia");
        entity3.setCardIdType(CardIdType.TI);
        entity3.setCardIdNumber("543210987");
        entity3.setSession(Session.AFTERNOON);
//        studentRepository.save(entity3);

        Student entity4 = new Student();
        entity4.setName("Liam");
        entity4.setCardIdType(CardIdType.CC);
        entity4.setCardIdNumber("654789321");
        entity4.setSession(Session.NIGHT);
//        studentRepository.save(entity4);

        Student entity5 = new Student();
        entity5.setName("Emma");
        entity5.setCardIdType(CardIdType.TI);
        entity5.setCardIdNumber("456123789");
        entity5.setSession(Session.NIGHT);
//        studentRepository.save(entity5);
        
        studentRepository.saveAll(
        		List.of(entity1, entity2, entity3, entity4, entity5)
		);


    }
}
