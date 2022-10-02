package com.train.ticket.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Train {
	private int trainNo;
	private String from;
	private String to;
	private LocalDate date;
	
	private String classes;
	private String category;
}
