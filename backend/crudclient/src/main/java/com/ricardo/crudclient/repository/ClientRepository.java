package com.ricardo.crudclient.repository;

import com.ricardo.crudclient.model.Client;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<Client,Long>{

  Client findByCpf(String cpf);
  List<Client> findAllByOrderByName();

}
