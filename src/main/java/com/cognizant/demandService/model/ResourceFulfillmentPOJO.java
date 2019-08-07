//package com.cognizant.demandService.model;
//
//import java.io.Serializable;
//import java.util.Date;
//
//import javax.persistence.CascadeType;
//import javax.persistence.Column;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.Temporal;
//import javax.persistence.TemporalType;
//
//import org.springframework.format.annotation.DateTimeFormat;
//
//import com.cognizant.demandService.pojo.Demand;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//public class ResourceFulfillmentPOJO {
//	
//
////	@Id
////    @Column(name = "s_no")
////	@GeneratedValue(strategy=javax.persistence.GenerationType.IDENTITY)
//    private int sNo;
//    
////    @Column(name="resource_level")
//    private String resource_level;
//    
////    @Column(name="skill")
//    private String skill;
//    
////    @Column(name="location")
//    private String location;
//    
////    @Column(name="capability")
//    private String capability;
//    
////    @Column(name = "demand_number")
//	private String demandNumber;
//    
////    @Column(name = "description")
//   	private String description;
//    
////    @Column(name = "SOW")
//   	private String sow;
//    
////    @DateTimeFormat(pattern="yyyy-MM-dd") 
////    @Temporal(TemporalType.DATE)
////    @Column(name = "CTS_Joining_Date")
////   	private Date ctsJoiningDate;
//    
////    @Column(name = "Rate")
//   	private int rate;
//    
////    @Column(name = "profile_Sent")
//   	private String profileSent;
//    
////    @Column(name = "add_Comments")
//   	private String addComments;
//    
//
//    
//    
////    @ManyToOne(cascade= CascadeType.ALL)
////    @JsonIgnore
////    @JoinColumn(name = "DEMAND_ID")
////    private Demand demand;
//
//
//
//
//	public int getsNo() {
//		return sNo;
//	}
//
//
//
//
//	public String getResource_level() {
//		return resource_level;
//	}
//
//
//
//
//	public String getSkill() {
//		return skill;
//	}
//
//
//
//
//	public String getLocation() {
//		return location;
//	}
//
//
//
//
//	public String getCapability() {
//		return capability;
//	}
//
//
//
//
//	public String getDemandNumber() {
//		return demandNumber;
//	}
//
//
//
//
//	public String getDescription() {
//		return description;
//	}
//
//
//
//
//	public String getSOW() {
//		return sow;
//	}
//
//
//
//
//
//
//
//	public int getRate() {
//		return rate;
//	}
//
//
//
//
//	public String getProfileSent() {
//		return profileSent;
//	}
//
//
//
//
//	public String getAddComments() {
//		return addComments;
//	}
//
//
//
//
//
//
//
//
//	public void setsNo(int sNo) {
//		this.sNo = sNo;
//	}
//
//
//
//
//	public void setResource_level(String resource_level) {
//		this.resource_level = resource_level;
//	}
//
//
//
//
//	public void setSkill(String skill) {
//		this.skill = skill;
//	}
//
//
//
//
//	public void setLocation(String location) {
//		this.location = location;
//	}
//
//
//
//
//	public void setCapability(String capability) {
//		this.capability = capability;
//	}
//
//
//
//
//	public void setDemandNumber(String demandNumber) {
//		this.demandNumber = demandNumber;
//	}
//
//
//
//
//	public void setDescription(String description) {
//		this.description = description;
//	}
//
//
//
//
//	public void setSOW(String sOW) {
//		sow = sOW;
//	}
//
//
//
//
//
//
//
//
//	public void setRate(int rate) {
//		this.rate = rate;
//	}
//
//
//
//
//	public void setProfileSent(String profileSent) {
//		this.profileSent = profileSent;
//	}
//
//
//
//
//	public void setAddComments(String addComments) {
//		this.addComments = addComments;
//	}
//
//
//
//
//
//
//
//	public ResourceFulfillmentPOJO(int sNo, String resource_level, String skill, String location, String capability,
//			String demandNumber, String description, String sOW, int rate, String profileSent,
//			String addComments) {
//		super();
//		this.sNo = sNo;
//		this.resource_level = resource_level;
//		this.skill = skill;
//		this.location = location;
//		this.capability = capability;
//		this.demandNumber = demandNumber;
//		this.description = description;
//		this.sow = sOW;
//		
//		this.rate = rate;
//		this.profileSent = profileSent;
//		this.addComments = addComments;
//	
//	}
//
//
//
//
//	public ResourceFulfillmentPOJO() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//    
//    
//    
//    
//    
//
//}
