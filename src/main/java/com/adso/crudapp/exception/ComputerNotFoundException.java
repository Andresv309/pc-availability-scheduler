package com.adso.crudapp.exception;

public class ComputerNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 2000012253460272039L;

	public ComputerNotFoundException(Long id) {
		super("Could not found the computer with id: " + id);
	}
}
