package com.ricardo.crudclient.controller;

import com.ricardo.crudclient.model.Client;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;

/**
 * this is a DTO class
 */
public class ClientRequest implements Serializable {

  private static final long serialVersionUID = 1L;

  @NotBlank
  private String birthDate;
  @NotBlank
  private String name;

  @CPF
  @NotBlank
  private String cpf;


  public String getBirthDate() {
    return birthDate;
  }


  public void setBirthDate(String birthDate) {
    this.birthDate = birthDate;
  }


  public String getName() {
    return name;
  }


  public void setName(String name) {
    this.name = name;
  }


  public String getCpf() {
    return cpf;
  }


  public void setCpf(String cpf) {
    this.cpf = cpf;
  }


  public Client getAsClientObject() {
    Client client = new Client();
    client.setCpf(this.getCpf());
    client.setName(this.getName());

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");

    LocalDate dateTime = LocalDate.parse(this.getBirthDate(),
                                         formatter); //date in iso format
    client.setBirthDate(dateTime);


    return client;

  }
}
