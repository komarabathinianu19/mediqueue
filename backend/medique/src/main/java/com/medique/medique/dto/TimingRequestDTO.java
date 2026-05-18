package com.medique.medique.dto; // Must match the folder!

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimingRequestDTO {
    private String label;
    private String startTime;
    private String endTime;
    private int maxPatients;
    private boolean enabled;
}