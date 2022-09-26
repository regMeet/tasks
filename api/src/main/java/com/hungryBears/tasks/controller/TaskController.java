package com.hungryBears.tasks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hungryBears.tasks.common.Task;
import com.hungryBears.tasks.service.TaskService;

@CrossOrigin
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/ping/{message}")
    public static String ping(@PathVariable("message") String message) {
        return message;
    }

    @GetMapping()
    public List<Task> getTasks(@RequestParam(value = "count", defaultValue = "1") Integer count) {
        return taskService.getTasks(count);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable("id") Long id) {
        return taskService.updateTask(id);
    }

}
