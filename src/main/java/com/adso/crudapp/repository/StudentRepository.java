package com.adso.crudapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adso.crudapp.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
