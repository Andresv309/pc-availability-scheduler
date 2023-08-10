package com.adso.crudapp.exception;

public class ComputerAssignmentNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 7014252688008566098L;

	public ComputerAssignmentNotFoundException(Long id) {
		super("Could not found the computerAssignment with id: " + id);
	}
}
