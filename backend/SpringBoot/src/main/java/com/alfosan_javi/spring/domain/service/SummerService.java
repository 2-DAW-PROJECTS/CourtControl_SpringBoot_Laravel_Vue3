package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.api.dto.SummerDTO;
import com.alfosan_javi.spring.domain.model.Summer;
import com.alfosan_javi.spring.domain.model.Sport;
import com.alfosan_javi.spring.domain.repository.SummerRepository;
import com.alfosan_javi.spring.domain.repository.SportRepository;
import com.alfosan_javi.spring.api.assembler.SummerAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SummerService {
    @Autowired
    private SummerRepository summerRepository;

    @Autowired
    private SportRepository sportRepository;

    @Autowired
    private SummerAssembler summerAssembler;

    public List<Summer> getAllSummers() {
        return summerRepository.findAll();
    }

    public Optional<Summer> getSummerById(long id) {
        return summerRepository.findById(id);
    }

    public SummerDTO createSummer(SummerDTO summerDTO) {
        Sport sport = sportRepository.findById(summerDTO.getIdSport()).orElse(null);
        if (sport == null) {
            return null;
        }
        Summer summer = summerAssembler.toEntity(summerDTO, sport);
        Summer savedSummer = summerRepository.save(summer);
        return summerAssembler.toModel(savedSummer);
    }

    public Summer updateSummer(long id, SummerDTO summerDTO) {
        Optional<Summer> existingSummer = summerRepository.findById(id);
        if (existingSummer.isPresent()) {
            Summer summer = existingSummer.get();
            summer.setSport(sportRepository.findById(summerDTO.getIdSport()).orElse(null));
            summer.setImg(summerDTO.getImg());
            summer.setNameSummer(summerDTO.getNameSummer());
            summer.setCategoryAge(summerDTO.getCategoryAge());
            summer.setStartDate(summerDTO.getStartDate());
            summer.setEndDate(summerDTO.getEndDate());
            summer.setMaxParticipants(summerDTO.getMaxParticipants());
            summer.setDescription(summerDTO.getDescription());
            summer.setActivities(summerDTO.getActivities());
            summer.setIsActive(summerDTO.getIsActive());
            return summerRepository.save(summer);
        }
        return null;
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
}
