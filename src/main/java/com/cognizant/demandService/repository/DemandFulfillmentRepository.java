package com.cognizant.demandService.repository;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cognizant.demandService.pojo.ResourceFulfillment;

@Repository
public interface DemandFulfillmentRepository  extends JpaRepository<ResourceFulfillment,Integer>{

	
	
	@Modifying
	@Query(value="UPDATE ResourceFulfillment set demand_id = :demndId WHERE demand_number= :demandNumber")
	public void fixDemandIdInDemandFulfillment(@Param(value = "demndId") int demandID, @Param(value = "demandNumber") String demandNumber);

	
	@Query(value = "SELECT  distinct(capability) FROM demand_schema.demand_fulfillment where demand_schema.demand_fulfillment.status=?1 ", nativeQuery = true)
	List<Object> getDistinctCapability(String status);


	@Query(value = "SELECT  distinct(location) FROM demand_schema.demand_fulfillment where demand_schema.demand_fulfillment.status=?1 ", nativeQuery = true)
	List<Object> getDistinctLocation(String status);
	
	@Query(value = "SELECT count(status) from demand_schema.demand_fulfillment group by status", nativeQuery = true) 
	List<Object> getPositions();
	
	
	/*@Modifying
    @Query("UPDATE Company c SET c.address = :address WHERE c.id = :companyId")
    int updateAddress(@Param("companyId") int companyId, @Param("address") String address);*/
	
	
	//Shivam's Code DemandFulfillmentRepository
	
//  @Query(value="select distinct location from demand_fulfillment ",nativeQuery = true)
//  List<String> getListOfLocation();
//  @Query(value="select count(location) from demand_schema.demand_fulfillment  where location=? ",nativeQuery = true)
//  int getLocCount(String location);
      
        @Query(value="select s.location,count(*) from demand_fulfillment s GROUP BY s.location",nativeQuery = true)
           public List<Object> getCountData();
        
//    @Query(value = "select asset_record.description,asset_record.quantity,"
//                                                 + "sum(case when registered_asset.is_assigned = 0 then 1 else 0 end) Assigned,"
//                                                 + "sum(case when registered_asset.is_assigned = 1 then 1 else 0 end) "
//                                                 + "UnAssigned from asset_record left join registered_asset on asset_record.asset_type=registered_asset.asset_type "
//                                                 + "group by asset_record.asset_type order by asset_record.asset_type ASC;",nativeQuery = true)
//                  public List<Object> findAllAssets(); 
//    Select sub_status,count(sub_status),capability from demand_schema.demand_fulfillment group by sub_status,capability;
        
        @Query(value="select s.sub_Status,count(sub_Status),capability from demand_fulfillment s GROUP BY s.sub_Status,s.capability",nativeQuery = true)
        public List<Object> getPractceCountData(); 
        
        @Query(value="SELECT COUNT(*) as total, status FROM demand_fulfillment GROUP BY status",nativeQuery=true)
                      List<Object[]> getStatusCountData();
                      
                      
//                  SELECT demand_schema.demand_table.portfolio,
//                  sum(case when demand_schema.demand_fulfillment.status = "Open" then 1 else 0 end) Open,
//                  sum(case when demand_schema.demand_fulfillment.status = "InProgress" then 1 else 0 end) InProgress,
//                  (sum(case when demand_schema.demand_fulfillment.status = "Open" then 1 else 0 end)+sum(case when demand_schema.demand_fulfillment.status = "InProgress" then 1 else 0 end)) GrandTotal
//                  from
//                  demand_schema.demand_table,demand_schema.demand_fulfillment 
//                  where  demand_schema.demand_table.demand_id = demand_schema.demand_fulfillment.demand_id
//                  group by demand_schema.demand_fulfillment.status;
                      
                      @Query(value = "select demand_table.portfolio,"
       +"sum(case when demand_fulfillment.status = +'Open'+ then 1 else 0 end) Open, "
       +"sum(case when demand_fulfillment.status = +'InProgress'+ then 1 else 0 end) InProgress, "
      + "(sum(case when demand_fulfillment.status = +'Open'+ then 1 else 0 end)+sum(case when demand_schema.demand_fulfillment.status = +'InProgress'+ then 1 else 0 end))"
      + "GrandTotal from demand_table Inner join demand_fulfillment on demand_table.demand_id = demand_fulfillment.demand_id"
      + "group by demand_fulfillment.status;",nativeQuery = true)
     public List<Object> getPortfolioCountData();


					
                      
                      



	

}
