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

import com.adso.crudapp.exception.ComputerNotFoundException;
import com.adso.crudapp.exception.ComputerStockNotFoundException;
import com.adso.crudapp.model.Computer;
import com.adso.crudapp.model.ComputerStock;
import com.adso.crudapp.repository.ComputerRepository;
import com.adso.crudapp.repository.ComputerStockRepository;

@RestController
public class ComputerStockController {
	
	@Autowired
	private ComputerStockRepository computerStockRepository;
	
	@Autowired
	private ComputerRepository computerRepository;
	
	@PostMapping("/computer-stock")
	ComputerStock newComputerStock(@RequestBody ComputerStock newComputerStock) {
//		Long idComputer = newComputerStock.getComputer().getId();
//		if (idComputer == null) new ComputerNotFoundException(idComputer);
		
//		Computer computer = computerRepository.findById(idComputer)
//				.orElseThrow(() -> new ComputerStockNotFoundException(idComputer));
		
//		Computer computer = new Computer();
//		computer.setId(idComputer);
		
//		newComputerStock.setComputer(computer);
		
		return computerStockRepository.save(newComputerStock);
	}
	
	@GetMapping("/computer-stocks")
	List<ComputerStock> getAllComputerStocks() {
		return computerStockRepository.findAll();
	}
	
	@GetMapping("/computer-stock/{id}")
	ComputerStock getComputerStockById(@PathVariable Long id) {
		return computerStockRepository.findById(id)
				.orElseThrow(() -> new ComputerStockNotFoundException(id));
	}
	
	@PutMapping("/computer-stock/{id}")
	ComputerStock updateComputerStock(@RequestBody ComputerStock computerStock, @PathVariable Long id) {
		return computerStockRepository.findById(id)
				.map(computerStockDb -> {
					computerStockDb.setCode(computerStock.getCode());
					computerStockDb.setLocation(computerStock.getLocation());
					computerStockDb.setState(computerStock.getState());

	                if (computerStock.getComputer() != null && computerStock.getComputer().getId() != null) {
	                	Long idComputer =  computerStock.getComputer().getId();
	                	
	                    Computer computer = computerRepository.findById(idComputer)
	                            .orElseThrow(() -> new ComputerStockNotFoundException(idComputer));
	                	               	
	                    computerStockDb.setComputer(computer);
	                }

					return computerStockRepository.save(computerStockDb);
				}).orElseThrow(() -> new ComputerStockNotFoundException(id));
	}
	
	@DeleteMapping("/computer-stock/{id}")
	String deleteComputerStock(@PathVariable Long id) {
		if (!computerStockRepository.existsById(id)) {
			throw new ComputerStockNotFoundException(id);
		}
		computerStockRepository.deleteById(id);
		return "ComputerStock with id " + id + "has been deleted succesfully.";
		
	}
}
