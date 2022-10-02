package com.learn.user.model;

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
	private char gender;
}
