package com.adso.crudapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adso.crudapp.model.Computer;

@Repository
public interface ComputerRepository extends JpaRepository<Computer, Long> {

}
