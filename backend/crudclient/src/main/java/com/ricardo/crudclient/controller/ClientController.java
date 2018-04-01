package com.ricardo.crudclient.controller;

import com.ricardo.crudclient.model.Client;
import com.ricardo.crudclient.service.ClientService;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
public class ClientController {


  @Autowired
  ClientService service;


  @PostMapping("/")
  public ResponseEntity<?> create(@Valid @RequestBody ClientRequest clientRequest,
                                  Errors errors) {

    GenericResult result = new GenericResult();
    if (errors.hasErrors()) {

      result.setMessage(errors.getAllErrors()
                              .stream()
                              .map(DefaultMessageSourceResolvable::getDefaultMessage)
                              .collect(Collectors.joining(",")));

      return ResponseEntity.badRequest()
                           .body(result);

    }

    try {

      service.create(clientRequest.getAsClientObject());


    } catch (Exception e) {

      return ResponseEntity.badRequest()
                           .body(e.getMessage());
    }


    return ResponseEntity.ok("Client added");


  }


  @GetMapping("/")
  public ResponseEntity<?> read() {
    List<Client> listResponse = service.listAll();
    return ResponseEntity.ok(listResponse);
  }


  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable("id") Long id) {
    Client client = service.findById(id);
    if (client == null) {
      return ResponseEntity.notFound()
                           .build();
    }

    service.delete(client);
    return ResponseEntity.ok("client deleted");

  }


  @PutMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable("id") Long id,
                                  @Valid @RequestBody ClientRequest clientRequest, Errors errors) {


    GenericResult result = new GenericResult();
    if (errors.hasErrors()) {

      result.setMessage(errors.getAllErrors()
                              .stream()
                              .map(DefaultMessageSourceResolvable::getDefaultMessage)
                              .collect(Collectors.joining(",")));

      return ResponseEntity.badRequest()
                           .body(result);

    }

    Client currentClient = service.findById(id);
    if (currentClient == null) {
      return ResponseEntity.notFound()
                           .build();
    }
    Client updatedClient;
    try {
      updatedClient = clientRequest.getAsClientObject();
    } catch (Exception ex) {
      return ResponseEntity.badRequest()
                           .build();
    }

    currentClient.setBirthDate(updatedClient.getBirthDate());
    currentClient.setName(updatedClient.getName());
    currentClient.setCpf(updatedClient.getCpf());

    service.update(currentClient);

    return ResponseEntity.ok("client updated");

  }


  @ExceptionHandler(Exception.class)
  public ResponseEntity<Exception> handleException(Exception e) {

    return new ResponseEntity<>(e,
                                HttpStatus.INTERNAL_SERVER_ERROR);
  }


}
