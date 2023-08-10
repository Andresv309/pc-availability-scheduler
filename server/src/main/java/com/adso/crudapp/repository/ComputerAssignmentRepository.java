package com.adso.crudapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adso.crudapp.model.ComputerAssignment;

@Repository
public interface ComputerAssignmentRepository extends JpaRepository<ComputerAssignment, Long>{

}
