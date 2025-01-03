package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.domain.model.Summer;
import com.alfosan_javi.spring.domain.repository.SummerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SummerService {

    @Autowired
    private SummerRepository summerRepository;

    private static final int MAX_CAPACITY = 30;

    public List<Summer> getAllSummers() {
        return summerRepository.findAll();
    }

    public Optional<Summer> getSummerById(long id) {
        return summerRepository.findById(id);
    }

    public Summer saveSummer(Summer summer) {
        return summerRepository.save(summer);
    }

    public boolean deleteSummer(long id) {
        if (summerRepository.existsById(id)) {
            summerRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean existsById(long id) {
        return summerRepository.existsById(id);
    }

    public List<Summer> getFilteredSummersBySport(List<Long> sportIds) {
        return summerRepository.findBySportIds(sportIds);
    }

    /**
     * Cierra las inscripciones de un verano al alcanzar el límite máximo de capacidad.
     * 
     * @param summerId El ID del verano.
     */
    public void closeSummerIfCapacityReached(long summerId, int currentCapacity) {
        Summer summer = summerRepository.findById(summerId)
                .orElseThrow(() -> new RuntimeException("Summer not found"));

        if (currentCapacity >= MAX_CAPACITY) {
            summer.setIsActive(false);
            summer.setUpdatedAt(LocalDateTime.now());
            summerRepository.save(summer);
        }
    }
}
