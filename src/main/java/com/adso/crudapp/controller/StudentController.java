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

import com.adso.crudapp.exception.StudentNotFoundException;
import com.adso.crudapp.model.Student;
import com.adso.crudapp.repository.StudentRepository;

@RestController
public class StudentController {
	
	@Autowired
	private StudentRepository studentRepository;
	
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
				.map(user -> {
					user.setName(student.getName());
					user.setCardIdType(student.getCardIdType());
					user.setCardIdNumber(student.getCardIdNumber());
					user.setSession(student.getSession());
					
					return studentRepository.save(user);
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
