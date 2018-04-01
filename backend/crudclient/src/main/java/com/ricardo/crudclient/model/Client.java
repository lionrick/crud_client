package com.ricardo.crudclient.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;

@Entity
@EqualsAndHashCode(of = "id")
public class Client implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue
  private Long id;

  @NotBlank
  private String name;

  @JsonFormat(pattern = "yyyy-MM-dd")
  @Column
  private LocalDate birthDate;

  @CPF
  @NotBlank
  private String cpf;

  public Long getId() {
    return id;
  }


  public void setId(Long id) {
    this.id = id;
  }


  public String getName() {
    return name;
  }


  public void setName(String name) {
    this.name = name;
  }


  public LocalDate getBirthDate() {
    return birthDate;
  }


  public void setBirthDate(LocalDate birthDate) {
    this.birthDate = birthDate;
  }


  public String getCpf() {
    return cpf;
  }


  public void setCpf(String cpf) {
    this.cpf = cpf;
  }
}
