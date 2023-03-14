package com.fgc.combo.companion.exception;

public class OperationNotAllowedException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public OperationNotAllowedException(String message) {
        super(message);
    }
}
