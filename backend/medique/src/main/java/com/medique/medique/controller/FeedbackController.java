// package com.medique.medique.controller;

// import com.medique.medique.entity.Feedback;
// import com.medique.medique.repository.FeedbackRepository;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/feedback")
// @CrossOrigin(origins = "*")
// public class FeedbackController {

//     private final FeedbackRepository feedbackRepository;

//     public FeedbackController(FeedbackRepository feedbackRepository) {
//         this.feedbackRepository = feedbackRepository;
//     }

//     // This endpoint powers the "Hospital Insights" / StaffReportsScreen
//     @GetMapping("/hospital/{hospitalId}")
//     public ResponseEntity<List<Feedback>> getHospitalFeedback(@PathVariable String hospitalId) {
//         List<Feedback> feedbacks = feedbackRepository.findByHospitalIdOrderByCreatedAtDesc(hospitalId);
//         return ResponseEntity.ok(feedbacks);
//     }

//     // This endpoint allows patients to submit feedback after visit completion
//     @PostMapping("/submit")
//     public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
//         try {
//             Feedback saved = feedbackRepository.save(feedback);
//             return ResponseEntity.ok(Map.of("message", "Feedback submitted successfully", "id", saved.getId()));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", "Error saving feedback"));
//         }
//     }
// }  























// package com.medique.medique.controller;

// import com.medique.medique.entity.Feedback;
// import com.medique.medique.entity.Patient;
// import com.medique.medique.repository.FeedbackRepository;
// import com.medique.medique.security.JwtUtil;
// import com.medique.medique.service.PatientService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/feedback")
// @CrossOrigin(origins = "*")
// public class FeedbackController {

//     private final FeedbackRepository feedbackRepository;
//     private final JwtUtil jwtUtil;
//     private final PatientService patientService;

//     public FeedbackController(FeedbackRepository feedbackRepository,
//                                JwtUtil jwtUtil,
//                                PatientService patientService) {
//         this.feedbackRepository = feedbackRepository;
//         this.jwtUtil = jwtUtil;
//         this.patientService = patientService;
//     }

//     // Powers the "Hospital Insights" / StaffReportsScreen
//     @GetMapping("/hospital/{hospitalId}")
//     public ResponseEntity<List<Feedback>> getHospitalFeedback(@PathVariable String hospitalId) {
//         List<Feedback> feedbacks = feedbackRepository.findByHospitalIdOrderByCreatedAtDesc(hospitalId);
//         return ResponseEntity.ok(feedbacks);
//     }

//     // Patient submits feedback
//     @PostMapping("/submit")
//     public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
//         try {
//             Feedback saved = feedbackRepository.save(feedback);
//             return ResponseEntity.ok(Map.of("message", "Feedback submitted successfully", "id", saved.getId()));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", "Error saving feedback"));
//         }
//     }

//     // Returns list of tokenIds for which this patient has already submitted feedback.
//     // Used by VisitsScreen to permanently filter out feedback-given visits even after refresh.
//     @GetMapping("/my-submitted-token-ids")
//     public ResponseEntity<?> getMySubmittedTokenIds(
//             @RequestHeader("Authorization") String authHeader) {
//         try {
//             String token = authHeader.substring(7);
//             Long userId = jwtUtil.extractUserId(token);
//             Patient patient = patientService.getByUserId(userId);
//             List<Long> tokenIds = feedbackRepository.findSubmittedTokenIdsByPhone(patient.getPhone());
//             return ResponseEntity.ok(tokenIds);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }
// }  























// package com.medique.medique.controller;

// import com.medique.medique.entity.Feedback;
// import com.medique.medique.repository.FeedbackRepository;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/feedback")
// @CrossOrigin(origins = "*")
// public class FeedbackController {

//     private final FeedbackRepository feedbackRepository;

//     public FeedbackController(FeedbackRepository feedbackRepository) {
//         this.feedbackRepository = feedbackRepository;
//     }

//     // This endpoint powers the "Hospital Insights" / StaffReportsScreen
//     @GetMapping("/hospital/{hospitalId}")
//     public ResponseEntity<List<Feedback>> getHospitalFeedback(@PathVariable String hospitalId) {
//         List<Feedback> feedbacks = feedbackRepository.findByHospitalIdOrderByCreatedAtDesc(hospitalId);
//         return ResponseEntity.ok(feedbacks);
//     }

//     // This endpoint allows patients to submit feedback after visit completion
//     @PostMapping("/submit")
//     public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
//         try {
//             Feedback saved = feedbackRepository.save(feedback);
//             return ResponseEntity.ok(Map.of("message", "Feedback submitted successfully", "id", saved.getId()));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", "Error saving feedback"));
//         }
//     }
// }  























package com.medique.medique.controller;

import com.medique.medique.entity.Feedback;
import com.medique.medique.entity.Token;
import com.medique.medique.repository.FeedbackRepository;
import com.medique.medique.repository.TokenRepository;
import com.medique.medique.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;
    private final TokenRepository tokenRepository;
    private final JwtUtil jwtUtil;

    public FeedbackController(FeedbackRepository feedbackRepository,
                               TokenRepository tokenRepository,
                               JwtUtil jwtUtil) {
        this.feedbackRepository = feedbackRepository;
        this.tokenRepository = tokenRepository;
        this.jwtUtil = jwtUtil;
    }

    // Powers the "Hospital Insights" / StaffReportsScreen
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<List<Feedback>> getHospitalFeedback(@PathVariable String hospitalId) {
        List<Feedback> feedbacks = feedbackRepository.findByHospitalIdOrderByCreatedAtDesc(hospitalId);
        return ResponseEntity.ok(feedbacks);
    }

    // Patient submits feedback
    @PostMapping("/submit")
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
        try {
            Feedback saved = feedbackRepository.save(feedback);
            return ResponseEntity.ok(Map.of("message", "Feedback submitted successfully", "id", saved.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error saving feedback"));
        }
    }

    // Returns list of tokenIds for which this patient has already submitted feedback.
    // Used by VisitsScreen to permanently filter out feedback-given visits even after refresh.
    // Uses bookedByUserId from Token table — reliable, independent of phone number matching.
    @GetMapping("/my-submitted-token-ids")
    public ResponseEntity<?> getMySubmittedTokenIds(
            @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            Long userId = jwtUtil.extractUserId(token);

            // Step 1: Get all tokenIds booked by this user
            List<Token> myTokens = tokenRepository.findByBookedByUserIdOrderByCreatedAtDesc(userId);
            Set<Long> myTokenIds = myTokens.stream()
                    .map(Token::getId)
                    .collect(Collectors.toSet());

            if (myTokenIds.isEmpty()) {
                return ResponseEntity.ok(List.of());
            }

            // Step 2: From those, find which ones already have feedback submitted
            List<Long> submittedIds = feedbackRepository.findSubmittedTokenIdsByTokenIds(myTokenIds);
            return ResponseEntity.ok(submittedIds);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}