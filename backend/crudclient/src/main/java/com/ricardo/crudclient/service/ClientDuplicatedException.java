package com.ricardo.crudclient.service;

public class ClientDuplicatedException extends Exception {

  public ClientDuplicatedException() {
    super("Client already include in database");
  }
}
