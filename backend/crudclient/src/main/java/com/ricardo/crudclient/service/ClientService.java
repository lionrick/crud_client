package com.ricardo.crudclient.service;

import com.ricardo.crudclient.model.Client;
import com.ricardo.crudclient.repository.ClientRepository;
import java.util.List;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ClientService {

  @Autowired
  ClientRepository repository;

  @Autowired
  Validator validator;


  public void create(Client client) throws Exception {

    Client hasClient = repository.findByCpf(client.getCpf());

    Set<ConstraintViolation<Client>> errors = validator.validate(client);

    if (!errors.isEmpty()) {
      String message = mountErrorString(errors);
      throw new Exception(message);
    }

    if (hasClient != null) {
      throw new ClientDuplicatedException();
    }

    repository.save(client);
  }


  public List<Client> listAll() {
    return repository.findAllByOrderByName();
  }


  public Client findById(Long id) {
    return repository.findOne(id);
  }


  public void delete(Client client) {
    repository.delete(client);
  }


  private String mountErrorString(Set<ConstraintViolation<Client>> errors) {
    StringBuilder stringBuilder = new StringBuilder();

    for (ConstraintViolation<Client> violation : errors) {
      stringBuilder.append(violation.getMessage())
                   .append("\n");

    }
    return stringBuilder.toString();
  }


  public void update(Client client) {
    repository.save(client);
  }
}
