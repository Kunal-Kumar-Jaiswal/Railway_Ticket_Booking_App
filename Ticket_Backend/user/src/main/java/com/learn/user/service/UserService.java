package com.learn.user.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.user.exception.UserAlreadyExists;
import com.learn.user.exception.UserNotExistsException;
import com.learn.user.model.User;
import com.learn.user.repository.UserRespository;

@Service
public class UserService {
	@Autowired
	private UserRespository userRespository;
	
	public User addUser(User user) throws UserAlreadyExists {
		if(userRespository.existsById(user.getEmail())) {
			throw new UserAlreadyExists();
		}
		return userRespository.save(user);
	}
	
	public List<User> getAllUsers() {
		return userRespository.findAll();
	}
	
	public User userLogin(User user) {
		System.out.println(user);
		Optional<User> userObj = userRespository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		if(userObj.isPresent()) {
			return userObj.get();
		}
		return null;
	}
	
	public User findByEmail(String email) {
		return userRespository.findById(email).get();
	}
	
	public User updateUser(User user) throws UserNotExistsException {
		if(userRespository.existsById(user.getEmail())) {
			return userRespository.save(user);
		}
		throw new UserNotExistsException();
	}
	
	public boolean deleteUser(String email) throws UserNotExistsException {
		if(userRespository.existsById(email)) {
			userRespository.deleteById(email);
		}
		throw new UserNotExistsException();
	}
}
