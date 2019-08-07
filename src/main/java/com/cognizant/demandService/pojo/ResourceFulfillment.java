package com.cognizant.demandService.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "DEMAND_FULFILLMENT")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = { "createdAt", "updatedAt" }, allowGetters = true)
public class ResourceFulfillment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "s_no")
	@GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
	private int sNo;

	@Column(name = "resource_level")
	private String resource_level;

	@Column(name = "skill")
	private String skill;

	@Column(name = "location")
	private String location;

	@Column(name = "capability")
	private String capability;

	@Column(name = "demand_number")
	private String demandNumber;

	@Column(name = "description")
	private String description;

	@Column(name = "SOW")
	private String SOW;
	
	@Column(name = "rejections")
	private String rejections;
	
	@Column(name = "no_of_interviews")
	private String noOfInterviews;

	@Column(name = "sub_status")
	private String subStatus;
	
	@Column(name = "status")
	private String status;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	@Column(name = "CTS_Joining_Date")
	private Date ctsJoiningDate;

	@Column(name = "profile_Sent")
	private String profileSent;
	
	@Column(name = "resource_type")
	private String resourceType;
	
	@Column(name = "resource_grade")
	private String resourceGrade;
	
	@Column(name = "requirement_type")
	private String requirementType;

	@Column(name = "final_Comments")
	private String addComments;
	
	@Transient
	private Integer count;

	@ManyToOne(cascade = CascadeType.ALL)
	@JsonIgnore
	@JoinColumn(name = "demand_id")
	private Demand demand;

	public ResourceFulfillment() {
		super();
		// TODO Auto-generated constructor stub
	}

	// public void ResourceFulfillment()
	// {
	//// this.sNo = 0;
	//// this.resource_level = "default";
	//// this.skill = "default";
	//// this.location = "default";
	//// this.capability = "default";
	//// this.demandNumber = "default";
	//// this.description = "default";
	//// this.SOW = "default";
	//// this.ctsJoiningDate = null;
	////// this.rate = 0;
	//// this.profileSent = "default";
	//// this.addComments = "default";
	//// this.demand = null;
	// }

	public ResourceFulfillment(int sNo, String resource_level, String skill, String location, String capability,
			String demandNumber, String description, String sOW, String rejections, String noOfInterviews,
			String subStatus, String status, Date ctsJoiningDate, String profileSent, String resourceType,
			String resourceGrade, String requirementType, String addComments, Integer count, Demand demand) {
		super();
		this.sNo = sNo;
		this.resource_level = resource_level;
		this.skill = skill;
		this.location = location;
		this.capability = capability;
		this.demandNumber = demandNumber;
		this.description = description;
		SOW = sOW;
		this.rejections = rejections;
		this.noOfInterviews = noOfInterviews;
		this.subStatus = subStatus;
		this.status = status;
		this.ctsJoiningDate = ctsJoiningDate;
		this.profileSent = profileSent;
		this.resourceType = resourceType;
		this.resourceGrade = resourceGrade;
		this.requirementType = requirementType;
		this.addComments = addComments;
		this.count = count;
		this.demand = demand;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getsNo() {
		return sNo;
	}

	public String getResource_level() {
		return resource_level;
	}

	public String getSkill() {
		return skill;
	}

	public String getLocation() {
		return location;
	}

	public String getCapability() {
		return capability;
	}

	public String getDemandNumber() {
		return demandNumber;
	}

	public String getDescription() {
		return description;
	}

	public String getSOW() {
		return SOW;
	}

	public Date getCtsJoiningDate() {
		return ctsJoiningDate;
	}

	public String getProfileSent() {
		return profileSent;
	}

	public String getAddComments() {
		return addComments;
	}

	public Demand getDemand() {
		return demand;
	}

	public void setsNo(int sNo) {
		this.sNo = sNo;
	}

	public void setResource_level(String resource_level) {
		this.resource_level = resource_level;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setCapability(String capability) {
		this.capability = capability;
	}

	public void setDemandNumber(String demandNumber) {
		this.demandNumber = demandNumber;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setSOW(String sOW) {
		SOW = sOW;
	}

	public void setCtsJoiningDate(Date ctsJoiningDate) {
		this.ctsJoiningDate = ctsJoiningDate;
	}

	public void setProfileSent(String profileSent) {
		this.profileSent = profileSent;
	}

	public void setAddComments(String addComments) {
		this.addComments = addComments;
	}

	public void setDemand(Demand demand) {
		this.demand = demand;
	}

	public String getSubStatus() {
		return subStatus;
	}

	public void setSubStatus(String subStatus) {
		this.subStatus = subStatus;
	}

	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	public String getRequirementType() {
		return requirementType;
	}

	public void setRequirementType(String requirementType) {
		this.requirementType = requirementType;
	}

	public String getRejections() {
		return rejections;
	}

	public void setRejections(String rejections) {
		this.rejections = rejections;
	}

	public String getNoOfInterviews() {
		return noOfInterviews;
	}

	public void setNoOfInterviews(String noOfInterviews) {
		this.noOfInterviews = noOfInterviews;
	}

	public String getResourceGrade() {
		return resourceGrade;
	}

	public void setResourceGrade(String resourceGrade) {
		this.resourceGrade = resourceGrade;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "ResourceFulfillment [sNo=" + sNo + ", resource_level=" + resource_level + ", skill=" + skill
				+ ", location=" + location + ", capability=" + capability + ", demandNumber=" + demandNumber
				+ ", description=" + description + ", SOW=" + SOW + ", rejections=" + rejections + ", noOfInterviews="
				+ noOfInterviews + ", subStatus=" + subStatus + ", status=" + status + ", ctsJoiningDate="
				+ ctsJoiningDate + ", profileSent=" + profileSent + ", resourceType=" + resourceType
				+ ", resourceGrade=" + resourceGrade + ", requirementType=" + requirementType + ", addComments="
				+ addComments + ", count=" + count + ", demand=" + demand + "]";
	}
	
	
	
	
	

}
