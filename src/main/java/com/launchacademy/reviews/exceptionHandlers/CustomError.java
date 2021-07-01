package com.launchacademy.reviews.exceptionHandlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
@RestController
public class CustomError extends ResponseEntityExceptionHandler {
    public ResponseEntity<Object> handleBindingErrors(BindingResult bindingResult) {
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        Map<String, String> errors = new HashMap<>();
        for (FieldError fieldError : fieldErrors) {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        ErrorResponse errorResponse = new ErrorResponse(errors, "Validation Failed");
        return new ResponseEntity<>(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    public ResponseEntity<Object> alreadyExists() {
        Map<String, String> errors = new HashMap<>();
        errors.put("Style", "already exists");
        ErrorResponse errorResponse = new ErrorResponse(errors, "Pizza Style already exists");
        return new ResponseEntity<>(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    public ResponseEntity<Object> doesntExists() {
        Map<String, String> errors = new HashMap<>();
        errors.put("Style", "Not Found");
        ErrorResponse errorResponse = new ErrorResponse(errors, "Pizza Style Not Found");
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
}
