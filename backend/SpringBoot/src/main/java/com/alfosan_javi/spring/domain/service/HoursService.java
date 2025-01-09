package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.domain.model.Hours;
import com.alfosan_javi.spring.domain.repository.HoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoursService {

    @Autowired
    private HoursRepository hoursRepository;

    public List<Hours> getAllHours() {
        return hoursRepository.findAll();
    }

    public Hours getHourById(long id) {
        return hoursRepository.findById(id).orElse(null);
    }
}
