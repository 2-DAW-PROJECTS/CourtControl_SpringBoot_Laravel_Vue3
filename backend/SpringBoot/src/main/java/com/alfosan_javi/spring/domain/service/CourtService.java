package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.domain.model.Court;
import com.alfosan_javi.spring.domain.repository.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourtService {

    @Autowired
    private CourtRepository courtRepository;

    public List<Court> getAllCourts() {
        System.out.println("Fetching all courts...");
        return courtRepository.findAll();
    }

    public Optional<Court> getCourtById(long id) {
        return courtRepository.findById(id);
    }

    public boolean existsById(long id) {
        return courtRepository.existsById(id);
    }

    public Court saveCourt(Court court) {
        return courtRepository.save(court);
    }

    public boolean deleteCourt(long id) {
        if (courtRepository.existsById(id)) {
            courtRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Court> getFilteredCourtsBySport(List<Long> sportIds) {
        return courtRepository.findBySportIds(sportIds);
    }


}
