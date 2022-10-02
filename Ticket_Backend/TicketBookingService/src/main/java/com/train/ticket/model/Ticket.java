package com.train.ticket.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Ticket {
	@Id
	private String pnrNo;
	private String userEmail;
	private Train train;
	private List<Passenger> passengers;
}
