package com.adso.crudapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
	
	
}
