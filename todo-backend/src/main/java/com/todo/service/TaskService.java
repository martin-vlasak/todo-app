package com.todo.service;

import com.todo.model.Task;
import com.todo.repository.ITaskRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class TaskService implements ITaskService{
    @Autowired
    private ITaskRepository taskRepository;

    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }
}
