package com.adso.crudapp.exception;

public class ComputerStockNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1586971342234033986L;
	
	public ComputerStockNotFoundException(Long id) {
		super("Could not found the computerStock with id: " + id);
	}
}
