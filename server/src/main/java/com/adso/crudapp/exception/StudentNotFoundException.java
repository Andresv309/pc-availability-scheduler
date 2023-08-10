package com.adso.crudapp.exception;

public class StudentNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 2164267074858576666L;

	public StudentNotFoundException(Long id) {
		super("Could not found the student with id: " + id);
	}
}
