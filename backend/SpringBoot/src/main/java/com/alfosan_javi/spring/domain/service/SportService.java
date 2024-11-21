package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.domain.model.Sport;
import com.alfosan_javi.spring.domain.repository.SportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SportService {
    @Autowired
    private SportRepository sportRepository;

    public List<Sport> getAllSports() {
        return sportRepository.findAll();
    }

    public Optional<Sport> getSportById(long id) {
        return sportRepository.findById(id);
    }

    public boolean existsById(long id) {
        return sportRepository.existsById(id);
    }

    public Sport saveSport(Sport sport) {
        return sportRepository.save(sport);
    }

    public boolean deleteSport(long id) {
        if (sportRepository.existsById(id)) {
            sportRepository.deleteById(id);
            return true;
        }
        return false;
    }
}