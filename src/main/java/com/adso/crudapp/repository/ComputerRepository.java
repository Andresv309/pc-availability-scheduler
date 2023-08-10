package com.adso.crudapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adso.crudapp.model.Computer;

public interface ComputerRepository extends JpaRepository<Computer, Long> {

}
