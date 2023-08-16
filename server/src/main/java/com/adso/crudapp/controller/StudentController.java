package com.adso.crudapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.adso.crudapp.exception.ComputerStockNotFoundException;
import com.adso.crudapp.exception.StudentNotFoundException;
import com.adso.crudapp.model.Computer;
import com.adso.crudapp.model.ComputerStock;
import com.adso.crudapp.model.Student;
import com.adso.crudapp.repository.ComputerStockRepository;
import com.adso.crudapp.repository.StudentRepository;

@RestController
public class StudentController {
	
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private ComputerStockRepository computerStockRepository;
	
	@PostMapping("/student")
	Student newStudent(@RequestBody Student newStudent) {
		return studentRepository.save(newStudent);
	}
	
	@GetMapping("/students")
	List<Student> getAllStudent() {
		return studentRepository.findAll();
	}
	
	@GetMapping("/student/{id}")
	Student getStudentById(@PathVariable Long id) {
		return studentRepository.findById(id)
				.orElseThrow(() -> new StudentNotFoundException(id));
	}
	
	@PutMapping("/student/{id}")
	Student updateStudent(@RequestBody Student student, @PathVariable Long id) {
		return studentRepository.findById(id)
				.map(studentDB -> {
					studentDB.setName(student.getName());
					studentDB.setCardIdType(student.getCardIdType());
					studentDB.setCardIdNumber(student.getCardIdNumber());
					studentDB.setSession(student.getSession());
					
					// This is where I need help
//					studentDB.setComputerStock(new ComputerStock());
					
	                if (student.getComputerStock() != null && student.getComputerStock().getId() != null) {
	                	Long idComputerStock =  student.getComputerStock().getId();
	                	
	                    ComputerStock computerStock = computerStockRepository.findById(idComputerStock)
	                            .orElseThrow(() -> new ComputerStockNotFoundException(idComputerStock));
	                	               	
	                    studentDB.setComputerStock(computerStock);
	                } else {
	                	studentDB.setComputerStock(null);
	                }
					
					
					
					return studentRepository.save(studentDB);
				}).orElseThrow(() -> new StudentNotFoundException(id));
	}
	
	@DeleteMapping("/student/{id}")
	String deleteStudent(@PathVariable Long id) {
		if (!studentRepository.existsById(id)) {
			throw new StudentNotFoundException(id);
		}
		studentRepository.deleteById(id);
		return "Student with id " + id + "has been deleted succesfully.";
		
	}
	
}
