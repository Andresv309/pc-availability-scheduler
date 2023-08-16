package com.adso.crudapp.model;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.OneToOne;
//
//@Entity
//public class ComputerAssignment {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @OneToOne(cascade = CascadeType.PERSIST)
//    @JoinColumn(name = "student_id")
//    private Student student;
//
//    @OneToOne(cascade = CascadeType.PERSIST)
//    @JoinColumn(name = "computer_stock_id")
//    private ComputerStock computerStock;
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public Student getStudent() {
//		return student;
//	}
//
//	public void setStudent(Student student) {
//		this.student = student;
//	}
//
//	public ComputerStock getComputerStock() {
//		return computerStock;
//	}
//
//	public void setComputerStock(ComputerStock computerStock) {
//		this.computerStock = computerStock;
//	}
//    
//
//}
//
