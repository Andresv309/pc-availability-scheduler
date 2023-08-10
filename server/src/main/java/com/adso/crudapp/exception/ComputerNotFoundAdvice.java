package com.adso.crudapp.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ComputerNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(ComputerNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public Map<String, String> exceptionHandler(ComputerNotFoundException exception) {
		
		Map<String, String> errorMap = new HashMap<>();
		errorMap.put("status", "error");
		errorMap.put("errorMessage", exception.getMessage());
		
		return errorMap;
	}
}
