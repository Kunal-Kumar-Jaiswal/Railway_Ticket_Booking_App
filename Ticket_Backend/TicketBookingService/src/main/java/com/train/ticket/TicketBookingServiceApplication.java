package com.train.ticket;

import javax.servlet.Filter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.train.ticket.filter.TicketFilter;

@SpringBootApplication
public class TicketBookingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketBookingServiceApplication.class, args);
	}
	
	@Bean
	public FilterRegistrationBean<Filter> ticketFilter() {
		FilterRegistrationBean<Filter> filterBean = new FilterRegistrationBean<>();
		filterBean.setFilter(new TicketFilter());
		filterBean.addUrlPatterns("/ticket/kunal/*");
		return filterBean;
	}

}
