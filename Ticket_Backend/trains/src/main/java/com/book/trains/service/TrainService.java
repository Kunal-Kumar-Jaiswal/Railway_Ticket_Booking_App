package com.book.trains.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.book.trains.exception.TrainAlreadyExistsException;
import com.book.trains.model.Train;
import com.book.trains.repository.TrainRepository;

@Service
public class TrainService {
	@Autowired
	private TrainRepository trainRepository;
	
	public Train addTrain(Train train) throws TrainAlreadyExistsException {
		if(trainRepository.existsByTrainNoAndDate(train.getTrainNo(), train.getDate())) {
			throw new TrainAlreadyExistsException();
		}
		return trainRepository.save(train);
	}
	
	public List<Train> getAllTrains(String from, String to, LocalDate date) {
		return trainRepository.findAllByFromAndToAndDate(from, to, date);
	}
	
	public Train getTrainById(int trainNo) {
		return trainRepository.findById(trainNo).get();
	}
	
	public List<Train> getAllTrains() {
		return trainRepository.findAll();
	}

	public Set<String> getAllFrom() {
		List<Train> trains = getAllTrains();
		
		Set<String> fromList = new HashSet<>();
		
		for (Train train : trains) {
			fromList.add(train.getFrom());
		}
		
		return fromList;
	}
	
	public Set<String> getAllTo() {
		List<Train> trains = getAllTrains();
		
		Set<String> toList = new HashSet<>();
		
		for (Train train : trains) {
			toList.add(train.getTo());
		}
		
		return toList;
	}
}
