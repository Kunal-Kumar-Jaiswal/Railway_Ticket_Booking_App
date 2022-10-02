package com.book.trains.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.book.trains.model.Train;

@Repository
public interface TrainRepository extends MongoRepository<Train, Integer>{
	boolean existsByTrainNoAndDate(int trainNo, LocalDate  date);
	List<Train> findAllByFromAndToAndDate(String from,String to, LocalDate  date);
}
