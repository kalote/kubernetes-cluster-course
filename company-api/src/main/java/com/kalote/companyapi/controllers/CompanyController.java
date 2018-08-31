package com.kalote.companyapi.controllers;

import com.kalote.companyapi.models.Company;
import com.kalote.companyapi.repositories.CompanyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Api;

import org.bson.types.ObjectId;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/company")
@CrossOrigin(origins = "*")
@Api(value = "company", description = "Operations related to company API")
public class CompanyController {
  @Autowired
  private CompanyRepository repository;

  @ApiOperation(value = "View a list of companies", response = List.class)
  @RequestMapping(value = "/", method = RequestMethod.GET, produces = "application/json")
  public List<Company> getAllCompany() {
    return repository.findAll();
  }

  @ApiOperation(value = "Search a company by id", response = Company.class)
  @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
  public Company getCompanyById(@PathVariable("id") ObjectId id) {
    return repository.findBy_id(id);
  }

  @ApiOperation(value = "Update a company")
  @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = "application/json")
  public Company modifyCompanyById(@PathVariable("id") ObjectId id, @Valid @RequestBody Company company) {
    company.set_id(id);
    repository.save(company);
    return company;
  }

  @ApiOperation(value = "Add a company")
  @RequestMapping(value = "/", method = RequestMethod.POST, produces = "application/json")
  public Company createCompany(@Valid @RequestBody Company company) {
    company.set_id(ObjectId.get());
    repository.save(company);
    return company;
  }

  @ApiOperation(value = "Increase employee count for a specific company")
  @RequestMapping(value = "/increaseEmployeeCount/{id}", method = RequestMethod.GET, produces = "application/json")
  public Company increaseEmployeeCount(@PathVariable("id") ObjectId id) {
    Company company = repository.findBy_id(id);
    company.set_id(id);
    company.setEmployeeNumber(company.employeeNumber + 1);
    repository.save(company);
    return company;
  }

  @ApiOperation(value = "Decrease employee count for a specific company")
  @RequestMapping(value = "/decreaseEmployeeCount/{id}", method = RequestMethod.GET, produces = "application/json")
  public Company decreaseEmployeeCount(@PathVariable("id") ObjectId id) {
    Company company = repository.findBy_id(id);
    company.set_id(id);
    if (company.employeeNumber > 0) {
      company.setEmployeeNumber(company.employeeNumber - 1);
      repository.save(company);
    }
    return company;
  }
}