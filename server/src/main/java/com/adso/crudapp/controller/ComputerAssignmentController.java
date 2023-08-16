package com.adso.crudapp.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.adso.crudapp.model.ComputerStock;
//import com.adso.crudapp.model.Student;
//import com.adso.crudapp.exception.ComputerAssignmentNotFoundException;
//import com.adso.crudapp.exception.ComputerStockNotFoundException;
//import com.adso.crudapp.exception.StudentNotFoundException;
//import com.adso.crudapp.model.ComputerAssignment;
//import com.adso.crudapp.repository.ComputerAssignmentRepository;
//import com.adso.crudapp.repository.ComputerStockRepository;
//import com.adso.crudapp.repository.StudentRepository;
//
//@RestController
//public class ComputerAssignmentController {
//
//	@Autowired
//	private ComputerAssignmentRepository computerAssignmentRepository;
//	
//    @Autowired
//    private ComputerStockRepository computerStockRepository;
//
//    @Autowired
//    private StudentRepository studentRepository;
//	
//	@PostMapping("/computer-assignment")
//	ComputerAssignment newComputerAssignment(@RequestBody ComputerAssignment newComputerAssignment) {
//		Long idComputerStock = newComputerAssignment.getComputerStock().getId();
//		Long idStudent = newComputerAssignment.getStudent().getId();
//		
//		System.out.println("idComputerStock " + idComputerStock);
//		System.out.println("idStudent " + idStudent);
//		if (idComputerStock == null) new ComputerStockNotFoundException(idComputerStock);
//		if (idStudent == null) new StudentNotFoundException(idStudent);
//
////		ComputerStock computerStock = computerStockController.getComputerStockById(idComputerStock);
////		Student student = studentController.getStudentById(idStudent);
//		
//		ComputerStock computerStock = computerStockRepository.findById(idComputerStock)
//				.orElseThrow(() -> new ComputerStockNotFoundException(idComputerStock));
//		
//		Student student = studentRepository.findById(idStudent)
//				.orElseThrow(() -> new ComputerStockNotFoundException(idStudent));
//		
//		
//		newComputerAssignment.setComputerStock(computerStock);
//		newComputerAssignment.setStudent(student);
//		
//		return computerAssignmentRepository.save(newComputerAssignment);
//	}
//	
//	@GetMapping("/computer-assignment")
//	List<ComputerAssignment> getAllComputerAssignments() {
//		return computerAssignmentRepository.findAll();
//	}
//	
//	@GetMapping("/computer-assignment/{id}")
//	ComputerAssignment getComputerAssignmentById(@PathVariable Long id) {
//		return computerAssignmentRepository.findById(id)
//				.orElseThrow(() -> new ComputerAssignmentNotFoundException(id));
//	}
//	
//	@PutMapping("/computer-assignment/{id}")
//	ComputerAssignment updateComputerAssignment(@RequestBody ComputerAssignment computerAssignment, @PathVariable Long id) {
//		Long idComputerStock = computerAssignment.getComputerStock().getId();
//		Long idStudent = computerAssignment.getStudent().getId();
//		if (idComputerStock == null) new ComputerStockNotFoundException(idComputerStock);
//		if (idStudent == null) new StudentNotFoundException(idStudent);
//
//		ComputerStock computerStock = new ComputerStockController().getComputerStockById(idComputerStock);
//		Student student = new StudentController().getStudentById(idStudent);
//		
//		return computerAssignmentRepository.findById(id)
//				.map(computerAssignmentDb -> {
//					computerAssignmentDb.setComputerStock(computerStock);
//					computerAssignmentDb.setStudent(student);
//					
//					return computerAssignmentRepository.save(computerAssignmentDb);
//				}).orElseThrow(() -> new ComputerAssignmentNotFoundException(id));
//	}
//	
//	@DeleteMapping("/computer-assignment/{id}")
//	String deleteComputerAssignment(@PathVariable Long id) {
//		if (!computerAssignmentRepository.existsById(id)) {
//			throw new ComputerAssignmentNotFoundException(id);
//		}
//		computerAssignmentRepository.deleteById(id);
//		return "ComputerAssignment with id " + id + "has been deleted succesfully.";
//		
//	}
//}
