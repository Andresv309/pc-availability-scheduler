package com.adso.crudapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adso.crudapp.model.ComputerStock;

@Repository
public interface ComputerStockRepository extends JpaRepository<ComputerStock, Long>{

}
