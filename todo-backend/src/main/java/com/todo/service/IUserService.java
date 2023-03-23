package com.todo.service;

import com.todo.model.User;

public interface IUserService {

    void saveUser(User user);

    User getUser(String email);
}
