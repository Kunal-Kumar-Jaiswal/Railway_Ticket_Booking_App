package com.learn.user.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
	@Id
	private String email;
	private String password;
	private String username;
	private Date dob;
	private String gender;
	private String mobile;
	@Column(name="image", length=1000000,columnDefinition = "mediumtext")
	private String image;
}
