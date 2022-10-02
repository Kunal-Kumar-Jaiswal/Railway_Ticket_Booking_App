package com.learn.user.model;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
	@Id
	private String pnrNo;
	private String from;
	private String to;
	private String boarding;
	private List<Passenger> passengers;
}
