package com.cognizant.demandService.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "DEMAND_TABLE")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = { "createdAt", "updatedAt" }, allowGetters = true)
public class Demand implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
	@Column(name = "demand_id")
	private int demandID;

	@Column(name = "principle_name")
	private String principleName;

	@Column(name = "demand_number")
	private String demandNumber;

	@Column(name = "tm_name")
	private String tName;

	@Column(name = "cts_sales_contact")
	private String ctsSalesContact;

	@Column(name = "portfolio")
	private String portfolio;

//	@Column(name = "number_of_roles")
//	private int numberOfRoles;

	@Column(name = "status")
	private String status;

	@Column(name = "billable")
	private String billable;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	@Column(name = "request_received_date")
	private Date requestReceivedDate;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	@Column(name = "start_date")
	private Date startDate;

	@Column(name = "demand_lead_time")
	private int demandLeadTime;

//	@Column(name = "sow_number")
//	private String sowNumber;
	

	@Column(name = "additional_comments")
	private String additionalComments;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "demand", cascade = CascadeType.ALL)
	private Set<ResourceFulfillment> demandFulfillment;

	public Demand() {
		super();
	}

	public Demand(int demandID, String principleName, String demandNumber, String tName, String ctsSalesContact,
			String portfolio,  String status, String billable, Date requestReceivedDate,
			Date startDate, int demandLeadTime, String requirmentType, String additionalComments,
			Set<ResourceFulfillment> demandFulfillment) {
		super();
		this.demandID = demandID;
		this.principleName = principleName;
		this.demandNumber = demandNumber;
		this.tName = tName;
		this.ctsSalesContact = ctsSalesContact;
		this.portfolio = portfolio;
//		this.numberOfRoles = numberOfRoles;
		this.status = status;
		this.billable = billable;
		this.requestReceivedDate = requestReceivedDate;
		this.startDate = startDate;
		this.demandLeadTime = demandLeadTime;

//		this.sowNumber = sowNumber;
		this.additionalComments = additionalComments;

		this.demandFulfillment = demandFulfillment;
	}

	public int getDemandID() {
		return demandID;
	}

	public String getPrincipleName() {
		return principleName;
	}

	public String getDemandNumber() {
		return demandNumber;
	}

	public String gettName() {
		return tName;
	}

	public String getCtsSalesContact() {
		return ctsSalesContact;
	}

	public String getPortfolio() {
		return portfolio;
	}



	public String getStatus() {
		return status;
	}

	public String getBillable() {
		return billable;
	}

	public Date getRequestReceivedDate() {
		return requestReceivedDate;
	}

	public Date getStartDate() {
		return startDate;
	}

	public int getDemandLeadTime() {
		return demandLeadTime;
	}


	public Set<ResourceFulfillment> getDemandFulfillment() {
		return demandFulfillment;
	}

	public void setDemandID(int demandID) {
		this.demandID = demandID;
	}

	public void setPrincipleName(String principleName) {
		this.principleName = principleName;
	}

	public void setDemandNumber(String demandNumber) {
		this.demandNumber = demandNumber;
	}

	public void settName(String tName) {
		this.tName = tName;
	}

	public void setCtsSalesContact(String ctsSalesContact) {
		this.ctsSalesContact = ctsSalesContact;
	}

	public void setPortfolio(String portfolio) {
		this.portfolio = portfolio;
	}


	public void setStatus(String status) {
		this.status = status;
	}

	public void setBillable(String billable) {
		this.billable = billable;
	}

	public void setRequestReceivedDate(Date requestReceivedDate) {
		this.requestReceivedDate = requestReceivedDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public void setDemandLeadTime(int demandLeadTime) {
		this.demandLeadTime = demandLeadTime;
	}

	

	public void setDemandFulfillment(Set<ResourceFulfillment> demandFulfillment) {
		this.demandFulfillment = demandFulfillment;
	}
	
	

	public String getAdditionalComments() {
		return additionalComments;
	}

	public void setAdditionalComments(String additionalComments) {
		this.additionalComments = additionalComments;
	}

	@Override
	public String toString() {
		return "Demand [empId=" + demandID + ", empName=" + principleName + "]";
	}

}
