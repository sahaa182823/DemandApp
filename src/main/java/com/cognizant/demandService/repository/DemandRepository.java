package com.cognizant.demandService.repository;

import java.lang.annotation.Repeatable;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.persistence.Tuple;
import javax.validation.Valid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cognizant.demandService.pojo.Demand;
import com.cognizant.demandService.pojo.ResourceFulfillment;
import com.cognizant.demandService.pojo.StatusCount;

@Repository
public interface DemandRepository extends JpaRepository<Demand, Integer>, DemandRepositoryCustom {

	// @Query(value="Select * from DEMAND_TABLE where
	// status=?1",nativeQuery=true)
	// List<Demand> findByStatusName(String status);

	@Query(value = "Select * from DEMAND_TABLE  where demand_number=?1", nativeQuery = true)
	List<Demand> findByDemand_no(String dno);

	@Query(value = "Select * from DEMAND_FULFILLMENT", nativeQuery = true)
	List<ResourceFulfillment> getFulfillmentData();

	@Query(value = "SELECT COUNT(*) as total, status FROM DEMAND_TABLE GROUP BY status", nativeQuery = true)
	List<Object[]> getStatusCount();

	@Modifying
	@Query(value = "UPDATE DEMAND_TABLE SET status = 'Completed' WHERE demand_number= ?1", nativeQuery = true)
	public int changeStatusToCompleted(String demandNumber);

	@Modifying
	@Query(value = "DELETE demand_table, demand_fulfillment FROM demand_table INNER JOIN demand_fulfillment WHERE demand_table.demand_number=demand_fulfillment.demand_number and demand_table.demand_number= ?1", nativeQuery = true)
//--------------------------------------------------------------
	public int deleteDemand(@Valid String demandNumber);

	@Modifying
	@Query(value = "UPDATE DEMAND_TABLE SET status = 'Overdue' WHERE demand_number= ?1", nativeQuery = true)
	public int changeStatusToOverdue(String demandNumber);

	@Query(value = "SELECT  MONTHNAME(request_received_date) as requestReceviedDate, COUNT(status),status FROM DEMAND_TABLE where status=?1 GROUP BY requestReceviedDate;", nativeQuery = true)
	List<Object[]> getOpenStatusCountByMonth(String status);

	@Query(value = "SELECT  distinct(status),demand_id FROM demand_schema.demand_table group by status;", nativeQuery = true)
	List<Object[]> getDistinctCountStatus();

	@Modifying
	@Query(value = "UPDATE DEMAND_TABLE SET status = 'Cancelled' WHERE demand_number= ?1", nativeQuery = true)
	int changeStatusToCancelled(String demandNumber);

	@Query(value = "SELECT demand_table.principle_name, demand_table.tm_name, demand_table.cts_sales_contact, "
			+ "demand_table.portfolio, demand_table.billable, demand_table.request_received_date,demand_table.start_date, "
			+ "demand_table.demand_lead_time, demand_table.demand_number, demand_fulfillment.sub_status,demand_fulfillment.skill, "
			+ "demand_fulfillment.description, demand_fulfillment.capability, demand_fulfillment.status, "			+ "demand_fulfillment.location, demand_fulfillment.resource_level, "
			+ "demand_fulfillment.cts_joining_date,demand_fulfillment.sow, demand_fulfillment.resource_grade, "
			+ "demand_fulfillment.profile_sent, demand_fulfillment.no_of_interviews, demand_fulfillment.rejections,"
			+ "demand_fulfillment.final_comments,demand_table.demand_id,demand_fulfillment.demand_id as demand_fulfillment_id, demand_fulfillment.requirement_type FROM demand_table INNER JOIN demand_fulfillment "
			+ "ON demand_table.demand_id=demand_fulfillment.demand_id AND demand_table.status IN ('Open','In-Progress')", nativeQuery = true)
	List<Object> getOpenPositions();
	
		@Query(value = "SELECT demand_table.principle_name, demand_table.tm_name, demand_table.cts_sales_contact, "
		+ "demand_table.portfolio, demand_table.billable, demand_table.request_received_date,demand_table.start_date, "
		+ "demand_table.demand_lead_time, demand_table.demand_number, demand_fulfillment.sub_status,demand_fulfillment.skill, "
		+ "demand_fulfillment.description, demand_fulfillment.capability, demand_fulfillment.status, "
		+ "demand_fulfillment.location, demand_fulfillment.resource_level, "
			+ "demand_fulfillment.cts_joining_date,demand_fulfillment.sow, demand_fulfillment.resource_grade, "
			+ "demand_fulfillment.profile_sent, demand_fulfillment.no_of_interviews, demand_fulfillment.rejections,"
			+ "demand_fulfillment.final_comments,demand_table.demand_id,demand_fulfillment.demand_id as demand_fulfillment_id, demand_fulfillment.requirement_type FROM demand_table INNER JOIN demand_fulfillment "
			+ "ON demand_table.demand_id=demand_fulfillment.demand_id AND demand_table.status IN ('Completed')", nativeQuery = true)
	
	List<Object> getFulfilledPositions();
	

	@Query(value ="select demand_table.portfolio, sum(case when demand_fulfillment.location IN ('Chennai', 'Bangalore')  then 1 else 0 end) as India,sum(case when demand_fulfillment.location IN ('Sydney','Melbourne') then 1 else 0 end) as Australia,(sum(case when demand_fulfillment.location IN ('Bangalore','Chennai') then 1 else 0 end)+sum(case when demand_schema.demand_fulfillment.location IN ('Sydney','Melbourne') then 1 else 0 end))GrandTotal from demand_table Inner join demand_fulfillment on demand_table.demand_id = demand_fulfillment.demand_id group by demand_table.portfolio;", nativeQuery = true)
	List<Object> getBarGraphData();

	@Query(value = "SELECT  distinct(portfolio) FROM demand_schema.demand_table where demand_schema.demand_table.status=?1", nativeQuery = true)
	List<Object> getDistinctPortfolio(String status);

	@Query(value = "SELECT  distinct(billable) FROM demand_schema.demand_table;", nativeQuery = true)
	List<Object> getDistinctBillable();
	
	
	//------------------------------------------
    @Query(value = "select demand_table.portfolio,"
+"sum(case when demand_fulfillment.status = 'Open' then 1 else 0 end) Open, "
+"sum(case when demand_fulfillment.status = 'InProgress' then 1 else 0 end) InProgress, "
+ "(sum(case when demand_fulfillment.status = 'Open' then 1 else 0 end)+sum(case when demand_schema.demand_fulfillment.status = 'InProgress' then 1 else 0 end))"
+ "GrandTotal from demand_table Inner join demand_fulfillment on demand_table.demand_id = demand_fulfillment.demand_id"
+ " group by demand_fulfillment.status;",nativeQuery = true)
public List<Object> getPortfolioCountData();
    
//SELECT demand_schema.demand_table.portfolio,
//sum(case when month(demand_schema.demand_table.start_date) = 01 then 1 else 0 end) January,
//sum(case when month(demand_schema.demand_table.start_date) = 02 then 1 else 0 end) Feburary,
//sum(case when month(demand_schema.demand_table.start_date) = 03 then 1 else 0 end) March,
//sum(case when month(demand_schema.demand_table.start_date) = 04 then 1 else 0 end) April,
//sum(case when month(demand_schema.demand_table.start_date) = 05 then 1 else 0 end) May,
//sum(case when month(demand_schema.demand_table.start_date) = 06 then 1 else 0 end) June,
//sum(case when month(demand_schema.demand_table.start_date) = 07 then 1 else 0 end) July,
//sum(case when month(demand_schema.demand_table.start_date) = 08 then 1 else 0 end) August,
//sum(case when month(demand_schema.demand_table.start_date) = 09 then 1 else 0 end) September,
//sum(case when month(demand_schema.demand_table.start_date) = 10 then 1 else 0 end) October,
//sum(case when month(demand_schema.demand_table.start_date) = 11 then 1 else 0 end) November,
//sum(case when month(demand_schema.demand_table.start_date) = 12 then 1 else 0 end) December
//from
//demand_schema.demand_table 
//group by demand_schema.demand_table.portfolio;
    
//demand_schema.demand_table left join demand_schema.demand_fulfillment 
//on  demand_schema.demand_table.demand_id = demand_schema.demand_fulfillment.demand_id
//group by demand_schema.demand_table.principle_name,demand_schema.demand_table.portfolio;
//
//"(sum(case when demand_fulfillment.status = +'Open'+ then 1 else 0 end)+sum(case when demand_schema.demand_fulfillment.status = +'InProgress'+ then 1 else 0 end))"
//+ "GrandTotal from demand_table Inner join demand_fulfillment on demand_table.demand_id = demand_fulfillment.demand_id"
//+ "group by demand_fulfillment.status;",nativeQuery = true)
    
//@Query(value = "select demand_table.principle_name,demand_table.portfolio,demand_fulfillment.skill,"
//+"sum(case when month(demand_table.start_date) = 01 then 1 else 0 end) January, "
//+"sum(case when month(demand_table.start_date) = 02 then 1 else 0 end) Feburary, "
//+"sum(case when month(demand_table.start_date) = 03 then 1 else 0 end) March, "
//+"sum(case when month(demand_table.start_date) = 04 then 1 else 0 end) April, "
//+"sum(case when month(demand_table.start_date) = 05 then 1 else 0 end) May, "
//+"sum(case when month(demand_table.start_date) = 06 then 1 else 0 end) June, "
//+"sum(case when month(demand_table.start_date) = 07 then 1 else 0 end) July, "
//+"sum(case when month(demand_table.start_date) = 08 then 1 else 0 end) August, "
//+"sum(case when month(demand_table.start_date) = 09 then 1 else 0 end) September, "
//+"sum(case when month(demand_table.start_date) = 10 then 1 else 0 end) October, "
//+"sum(case when month(demand_table.start_date) = 11 then 1 else 0 end) November, "
//+"sum(case when month(demand_table.start_date) = 12 then 1 else 0 end) December, "
//+"(sum(case when month(demand_table.start_date) = 01 then 1 else 0 end)+sum(case when month(demand_table.start_date) = 02 then 1 else 0 end)+sum(case when month(demand_table.start_date) = 03 then 1 else 0 end)+sum(case when month(demand_table.start_date) = 04 then 1 else 0 end)+sum(case when month(demand_table.start_date) = 05 then 1 else 0 end)+sum(case when month(demand_table.start_date) = 06 then 1 else 0 end)+sum(case when month(demand_table.start_date) = 07 then 1 else 0 end)+sum(case when month(demand_table.start_date) = 08 then 1 else 0 end)+sum(case when month(demand_table.start_date) = 09 then 1 else 0 end)+sum(case when month(demand_table.start_date) = 10 then 1 else 0 end)+sum(case when month(demand_table.start_date) = 11 then 1 else 0 end)+sum(case when month(demand_table.start_date) = 12 then 1 else 0 end))"
//+ "GrandTotal from demand_table left join demand_schema.demand_fulfillment on  demand_schema.demand_table.demand_id = demand_schema.demand_fulfillment.demand_id "
//+ " group by demand_table.principle_name,demand_table.portfolio;",nativeQuery = true)
//public List<Object[]> getPortfolioCountDatawithMonth();
    
    
//SELECT demand_table.principle_name,demand_table.portfolio,demand_fulfillment.skill,
//
//
//MONTHNAME(start_date) as month,
//COUNT(*) as countData
//FROM demand_schema.demand_table left join demand_schema.demand_fulfillment on demand_schema.demand_table.demand_id=demand_schema.demand_fulfillment.demand_id
//GROUP BY demand_table.principle_name,demand_table.portfolio

@Query(value = "select demand_table.principle_name,demand_table.portfolio,demand_fulfillment.skill,"
+"MONTHNAME(request_received_date) as month, "
+" COUNT(DISTINCT request_received_date) as countData "
+  "from demand_table left join demand_schema.demand_fulfillment on  demand_schema.demand_table.demand_id = demand_schema.demand_fulfillment.demand_id "
+ " group by demand_table.principle_name,demand_table.portfolio;",nativeQuery = true)
    
public List<Object[]> getPortfolioCountDatawithMonth();
@Modifying
@Query(value = "UPDATE DEMAND_TABLE SET status = 'Cancelled' WHERE demand_number= ?1", nativeQuery = true)
boolean updateDemand(Demand demand);




@Query(value = "SELECT  distinct(principle_name) FROM demand_schema.demand_table where demand_schema.demand_table.status=?1", nativeQuery = true)
public List<Object> getDistinctPrincipalName(String status);



	

}
