package com.learn.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learn.user.model.User;

@Repository
public interface UserRespository extends JpaRepository<User, String>{
	public  Optional<User> findByEmailAndPassword(String email, String password);
}
