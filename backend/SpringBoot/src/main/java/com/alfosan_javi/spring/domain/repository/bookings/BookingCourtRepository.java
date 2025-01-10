package com.alfosan_javi.spring.domain.repository.bookings;

import com.alfosan_javi.spring.domain.model.bookings.BookingCourt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BookingCourtRepository extends JpaRepository<BookingCourt, Long> {

    @Query(value = "SELECT * FROM bookings_courts b WHERE b.id_court = :idCourt AND b.id_day = :idDay AND b.id_month = :idMonth", nativeQuery = true)
    List<BookingCourt> findByIdCourtAndIdDayAndIdMonth(@Param("idCourt") Long idCourt, @Param("idDay") int idDay, @Param("idMonth") int idMonth);


}
