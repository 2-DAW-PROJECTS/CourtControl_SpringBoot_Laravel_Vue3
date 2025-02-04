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

    public List<String> getMaterialsBySport(Integer sportId) {
        // System.out.println("Getting materials for sportId: " + sportId);
        List<String> materials = courtRepository.findAll((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("sport").get("id"), sportId))
                .stream()
                .map(Court::getMaterial)
                .distinct()
                .collect(Collectors.toList());
        // System.out.println("Materials for sportId " + sportId + ": " + materials);
        return materials;
    }


    public List<String> getAllMaterials() {
        // System.out.println("Getting all materials");
        List<String> materials = courtRepository.findAll()
                .stream()
                .map(Court::getMaterial)
                .distinct()
                .collect(Collectors.toList());
        // System.out.println("All materials: " + materials);
        return materials;
    }

    public Optional<Court> getCourtById(long id) {
        return courtRepository.findById(id);
    }

    // public Court createCourt(CourtDTO courtDTO) {
    //     Sport sport = sportRepository.findById(courtDTO.getSportId()).orElse(null);
    //     if (sport == null) {
    //         return null;
    //     }
    //     Court court = new Court();
    //     court.setNamePista(courtDTO.getNamePista());
    //     court.setMaterial(courtDTO.getMaterial());
    //     court.setSport(sport);
    //     return courtRepository.save(court);
    // }
    public Court createCourt(CourtDTO courtDTO) {
        Sport sport = sportRepository.findById(courtDTO.getSportId()).orElse(null);
        if (sport == null) {
            return null;
        }
        Court court = new Court();
        court.setSport(sport);
        court.setTypePista(courtDTO.getTypePista());
        court.setNamePista(courtDTO.getNamePista());
        court.setAncho(courtDTO.getAncho());
        court.setMaterial(courtDTO.getMaterial());
        court.setDescription(courtDTO.getDescription());
        court.setImg(courtDTO.getImg());
        court.setTagCourt(courtDTO.getTagCourt());
        court.setIsActive(courtDTO.getIsActive());
        return courtRepository.save(court);
    }


    public Court updateCourt(long id, CourtDTO courtDTO) {
        Optional<Court> existingCourt = courtRepository.findById(id);
        if (existingCourt.isPresent()) {
            Court court = existingCourt.get();
            // Actualizar los campos de court con los valores de courtDTO
            court.setSport(sportRepository.findById(courtDTO.getSportId()).orElse(null));
            court.setTypePista(courtDTO.getTypePista());
            court.setNamePista(courtDTO.getNamePista());
            court.setAncho(courtDTO.getAncho());
            court.setMaterial(courtDTO.getMaterial());
            court.setDescription(courtDTO.getDescription());
            court.setImg(courtDTO.getImg());
            court.setTagCourt(courtDTO.getTagCourt());
            court.setIsActive(courtDTO.getIsActive());
            return courtRepository.save(court);
        }
        return null;
    }
    // public Court updateCourt(long id, CourtDTO courtDTO) {
    //     Optional<Court> existingCourt = courtRepository.findById(id);
    //     if (existingCourt.isPresent()) {
    //         Court court = existingCourt.get();
    //         // Actualizar los campos de court con los valores de courtDTO
    //         court.setSportId(courtDTO.getSportId());
    //         court.setTypePista(courtDTO.getTypePista());
    //         court.setNamePista(courtDTO.getNamePista());
    //         court.setAncho(courtDTO.getAncho());
    //         court.setMaterial(courtDTO.getMaterial());
    //         court.setDescription(courtDTO.getDescription());
    //         court.setImg(courtDTO.getImg());
    //         court.setTagCourt(courtDTO.getTagCourt());
    //         court.setIsActive(courtDTO.getIsActive());
    //         return courtRepository.save(court);
    //     }
    //     return null;
    // }

    public boolean deleteCourt(long id) {
        if (courtRepository.existsById(id)) {
            courtRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
