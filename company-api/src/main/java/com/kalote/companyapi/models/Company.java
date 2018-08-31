package com.kalote.companyapi.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Company {
  @Id
  public ObjectId _id;

  public String name;
  public String type;
  public String sector;
  public Integer employeeNumber = 0;

  // Constructors
  public Company() {
  }

  public Company(ObjectId _id, String name, String type, String sector, Integer employeeNumber) {
    this._id = _id;
    this.name = name;
    this.type = type;
    this.sector = sector;
    this.employeeNumber = employeeNumber;
  }

  // ObjectId needs to be converted to string
  public String get_id() {
    return _id.toHexString();
  }

  public void set_id(ObjectId _id) {
    this._id = _id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getSector() {
    return sector;
  }

  public void setSector(String sector) {
    this.sector = sector;
  }

  public Integer getEmployeeNumber() {
    return employeeNumber;
  }

  public void setEmployeeNumber(Integer employeeNumber) {
    this.employeeNumber = employeeNumber;
  }
}