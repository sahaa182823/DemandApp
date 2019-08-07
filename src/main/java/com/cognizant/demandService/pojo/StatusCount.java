package com.cognizant.demandService.pojo;


public class StatusCount {
	
	private String status;
	
	

	private int total;

	public StatusCount() {
		super();
		System.out.println("call");
		// TODO Auto-generated constructor stub
	}

	public StatusCount(String status, int total) {
		super();
		this.status = status;
		this.total = total;
	}
	
	public String getStatus() {
		return status;
	}

	public int getTotal() {
		return total;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	
	/*public String getStatus() {
		return status;
	}

	public int getCount() {
		return total;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setTotal(int total) {
		this.total = total;
	}
	*/
	

}
