package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.api.dto.CourtDTO;
import com.alfosan_javi.spring.domain.model.Court;
import com.alfosan_javi.spring.domain.model.Sport;
import com.alfosan_javi.spring.domain.repository.CourtRepository;
import com.alfosan_javi.spring.domain.repository.SportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.criteria.Predicate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CourtService {

    @Autowired
    private CourtRepository courtRepository;

    @Autowired
    private SportRepository sportRepository;

    public List<Court> getFilteredCourts(List<Long> sportIds, String material) {
        return courtRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filtro por sportIds
            if (sportIds != null && !sportIds.isEmpty()) {
                predicates.add(root.get("sport").get("id").in(sportIds));
            }

            // Filtro por material
            if (material != null && !material.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("material"), material));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public List<String> getMaterialsBySport(Long sportId) {
        return courtRepository.findAll((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("sport").get("id"), sportId))
                .stream()
                .map(Court::getMaterial)
                .distinct()
                .collect(Collectors.toList());
    }


    public List<String> getAllMaterials() {
        return courtRepository.findAll()
                .stream()
                .map(Court::getMaterial)
                .distinct()
                .collect(Collectors.toList());
    }

    public Optional<Court> getCourtById(long id) {
        return courtRepository.findById(id);
    }

    public Court createCourt(CourtDTO courtDTO) {
        Sport sport = sportRepository.findById(courtDTO.getSportId()).orElse(null);
        if (sport == null) {
            return null;
        }
        Court court = new Court();
        court.setNamePista(courtDTO.getNamePista());
        court.setMaterial(courtDTO.getMaterial());
        court.setSport(sport);
        return courtRepository.save(court);
    }

    public Court updateCourt(long id, CourtDTO courtDTO) {
        Optional<Court> existingCourt = courtRepository.findById(id);
        if (!existingCourt.isPresent()) {
            return null;
        }
        Court court = existingCourt.get();
        Sport sport = sportRepository.findById(courtDTO.getSportId()).orElse(null);
        if (sport == null) {
            return null;
        }
        court.setNamePista(courtDTO.getNamePista());
        court.setMaterial(courtDTO.getMaterial());
        court.setSport(sport);
        return courtRepository.save(court);
    }

    public boolean deleteCourt(long id) {
        if (courtRepository.existsById(id)) {
            courtRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
