package com.adso.crudapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adso.crudapp.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

}
