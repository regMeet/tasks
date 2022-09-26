package com.hungryBears.tasks.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import lombok.NoArgsConstructor;

@Data
public class Task {
    private final Long id;
    private final String title;

}
