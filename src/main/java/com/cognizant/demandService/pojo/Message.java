package com.cognizant.demandService.pojo;

public class Message {
	
	private String status;
	public Message(String status, String errorMessage) {
		super();
		this.status = status;
		this.errorMessage = errorMessage;
	}
	private String errorMessage;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
