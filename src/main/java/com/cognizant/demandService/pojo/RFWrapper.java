package com.cognizant.demandService.pojo;

import java.util.List;

public class RFWrapper {
	
	private List<ResourceFulfillment> persons;

    /**
     * @return the persons
     */
    public List<ResourceFulfillment> getPersons() {
        return persons;
    }

    /**
     * @param persons the persons to set
     */
    public void setPersons(List<ResourceFulfillment> persons) {
        this.persons = persons;
    }

}
