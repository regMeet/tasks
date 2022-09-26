package com.hungryBears.tasks.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.hungryBears.tasks.common.Task;

@Service
public class TaskService {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private static final String URL = "https://lorem-faker.vercel.app/api?quantity=";

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Cacheable(value = "getTasks")
    public List<Task> getTasks(int count) {
        List<Task> list = new ArrayList<>();

        String[] block = webClientBuilder.build().get()
                .uri(URL + count)
                .retrieve()
                .bodyToMono(String[].class)
                .block();

        for (int i = 0; i < block.length; i++) {
            list.add(new Task(Long.valueOf(i + 1), block[i]));
        }

        return list;
    }

    public Task updateTask(Long id) {
        log.info("Task id: {} has been updated", id);
        return null;
    }

}
