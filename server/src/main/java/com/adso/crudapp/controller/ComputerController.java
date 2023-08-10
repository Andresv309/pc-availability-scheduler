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
import com.adso.crudapp.model.Computer;
import com.adso.crudapp.repository.ComputerRepository;

@RestController
public class ComputerController {

	@Autowired
	private ComputerRepository computerRepository;
	
	@PostMapping("/computer")
	Computer newComputer(@RequestBody Computer newComputer) {
		return computerRepository.save(newComputer);
	}
	
	@GetMapping("/computers")
	List<Computer> getAllComputers() {
		return computerRepository.findAll();
	}
	
	@GetMapping("/computer/{id}")
	Computer getComputerById(@PathVariable Long id) {
		return computerRepository.findById(id)
				.orElseThrow(() -> new ComputerNotFoundException(id));
	}
	
	@PutMapping("/computer/{id}")
	Computer updateComputer(@RequestBody Computer computer, @PathVariable Long id) {
		return computerRepository.findById(id)
				.map(computerDb -> {
					computerDb.setName(computer.getName());
					computerDb.setBrand(computer.getBrand());
					computerDb.setProcessor(computer.getProcessor());
					computerDb.setRam(computer.getRam());
					computerDb.setHasGraphicsCard(computer.getHasGraphicsCard());

					return computerRepository.save(computerDb);
				}).orElseThrow(() -> new ComputerNotFoundException(id));
	}
	
	@DeleteMapping("/computer/{id}")
	String deleteComputer(@PathVariable Long id) {
		if (!computerRepository.existsById(id)) {
			throw new ComputerNotFoundException(id);
		}
		computerRepository.deleteById(id);
		return "Computer with id " + id + "has been deleted succesfully.";
		
	}
}
