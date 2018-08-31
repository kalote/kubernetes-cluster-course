package com.kalote.companyapi.repositories;

import com.kalote.companyapi.models.Company;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompanyRepository extends MongoRepository<Company, String> {
  Company findBy_id(ObjectId _id);
}