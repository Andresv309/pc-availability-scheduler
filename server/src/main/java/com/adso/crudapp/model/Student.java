package com.adso.crudapp.model;

import com.adso.crudapp.enums.CardIdType;
import com.adso.crudapp.enums.Session;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Student {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@Enumerated(EnumType.STRING)
	private CardIdType cardIdType;
	
	private String cardIdNumber;
	
	@Enumerated(EnumType.STRING)
	private Session session;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private ComputerStock computerStock;

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

	public String getCardIdNumber() {
		return cardIdNumber;
	}

	public void setCardIdNumber(String cardIdNumber) {
		this.cardIdNumber = cardIdNumber;
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}

	public CardIdType getCardIdType() {
		return cardIdType;
	}

	public ComputerStock getComputerStock() {
		return computerStock;
	}

	public void setComputerStock(ComputerStock computerStock) {
		this.computerStock = computerStock;
	}

	public void setCardIdType(CardIdType cardIdType) {
		this.cardIdType = cardIdType;
	}

    
}
