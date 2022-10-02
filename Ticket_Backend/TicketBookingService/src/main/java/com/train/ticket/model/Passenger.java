package com.train.ticket.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Passenger {
	private int passengerId;
	private String passengerName;
	private int age;
	private String gender;
	private boolean status;
}
