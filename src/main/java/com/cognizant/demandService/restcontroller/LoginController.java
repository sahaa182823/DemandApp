package com.cognizant.demandService.restcontroller;

import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.demandService.pojo.UserProfile;
import com.cognizant.demandService.service.LoginService;

@RestController
@RequestMapping("/login")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@RequestMapping(value = "/validateUser", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> validateUser(@RequestBody UserProfile userProfile) {
		
		ResponseEntity<?> response = loginService.validateUser(userProfile);
		
		return response ;

		
	}
	

}
