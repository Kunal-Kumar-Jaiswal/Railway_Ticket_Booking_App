package com.book.trains.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code=HttpStatus.CONFLICT, reason = "Train Id already present for particular date")
public class TrainAlreadyExistsException extends Exception {

}
