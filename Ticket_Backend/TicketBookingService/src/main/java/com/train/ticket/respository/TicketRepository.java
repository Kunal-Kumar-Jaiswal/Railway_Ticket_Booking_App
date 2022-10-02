package com.train.ticket.respository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.train.ticket.model.Ticket;

@Repository
public  interface TicketRepository extends MongoRepository<Ticket, String>{
	//Optional<Ticket> findByPassengersPassengerId(int passengerId);
	
	Optional<Ticket> findByPnrNoAndPassengersPassengerId(String pnrNo, int passengerId);
	
	Ticket findByUserEmail(String email);
	
	List<Ticket> findAllByUserEmail(String userEmail);
}
