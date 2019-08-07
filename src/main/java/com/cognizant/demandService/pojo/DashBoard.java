package com.cognizant.demandService.pojo;

public class DashBoard {
       
       private String principle_name;
       private String portfolio;
       private String skill;
       private String month;
       private int countData;
       
       public DashBoard() {
              super();
       }

       

       public DashBoard(String principle_name, String portfolio, String skill, String month, int countData) {
              super();
              this.principle_name = principle_name;
              this.portfolio = portfolio;
              this.skill = skill;
              this.month = month;
              this.countData = countData;
       }



       public String getPrinciple_name() {
              return principle_name;
       }

       public void setPrinciple_name(String principle_name) {
              this.principle_name = principle_name;
       }

       public String getPortfolio() {
              return portfolio;
       }

       public void setPortfolio(String portfolio) {
              this.portfolio = portfolio;
       }

       public String getSkill() {
              return skill;
       }

       public void setSkill(String skill) {
              this.skill = skill;
       }

       public String getMonth() {
              return month;
       }

       public void setMonth(String month) {
              this.month = month;
       }



       public int getCountData() {
              return countData;
       }



       public void setCountData(int countData) {
              this.countData = countData;
       }

       
       
       
       
       
       
       
       

}


