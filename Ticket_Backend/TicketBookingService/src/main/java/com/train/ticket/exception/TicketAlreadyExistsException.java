package com.train.ticket.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Ticket already exists")
public class TicketAlreadyExistsException extends Exception {
	
}
