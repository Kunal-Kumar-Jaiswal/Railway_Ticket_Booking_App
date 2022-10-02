package com.train.ticket.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.GenericFilter;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.train.ticket.exception.NotAVaildUserException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class TicketFilter extends GenericFilter{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		String header = req.getHeader("authorization");
		System.out.println("In filter");
		if(header != null) {
			String token = header.substring(7);
			System.out.println(token);
			Claims claims = Jwts.parser()
								.setSigningKey("wipro123")
								.parseClaimsJws(token)
								.getBody();
			System.out.println(claims);
			request.setAttribute("claims", claims);
		}else {
			System.out.println("Not a vaild user");
		}
		chain.doFilter(request, response);
	}

}
