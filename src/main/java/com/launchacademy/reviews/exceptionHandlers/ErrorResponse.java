package com.launchacademy.reviews.exceptionHandlers;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class ErrorResponse {
    private String message;
    private Map<String, String> errors;

    public ErrorResponse(Map<String, String> errors, String message) {
        this.errors = errors;
        this.message = message;
    }
}
