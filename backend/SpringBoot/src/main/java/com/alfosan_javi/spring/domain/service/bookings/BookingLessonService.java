// package com.alfosan_javi.spring.domain.service.bookings;

// import com.alfosan_javi.spring.domain.model.bookings.BookingLesson;
// import com.alfosan_javi.spring.domain.repository.bookings.BookingLessonRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class BookingLessonService {

//     @Autowired
//     private BookingLessonRepository bookingLessonRepository;

//     public List<BookingLesson> getAllBookings() {
//         return bookingLessonRepository.findAll();
//     }

//     public Optional<BookingLesson> getBookingById(long id) {
//         return bookingLessonRepository.findById(id);
//     }

//     public BookingLesson createBooking(BookingLesson bookingLesson) {
//         return bookingLessonRepository.save(bookingLesson);
//     }

//     public boolean deleteBooking(long id) {
//         if (bookingLessonRepository.existsById(id)) {
//             bookingLessonRepository.deleteById(id);
//             return true;
//         }
//         return false;
//     }
// }
