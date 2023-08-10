package com.adso.crudapp.model;

import com.adso.crudapp.enums.CardIdType;
import com.adso.crudapp.enums.Session;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @OneToOne(mappedBy = "student")
    private ComputerAssignment computerAssignment;

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

	public ComputerAssignment getComputerAssignment() {
		return computerAssignment;
	}

	public void setComputerAssignment(ComputerAssignment computerAssignment) {
		this.computerAssignment = computerAssignment;
	}

	public CardIdType getCardIdType() {
		return cardIdType;
	}

	public void setCardIdType(CardIdType cardIdType) {
		this.cardIdType = cardIdType;
	}

    
}
