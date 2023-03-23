package com.todo.service;

import com.todo.model.User;

public interface IUserService {

    User saveUser(User user);

    User getUser(String email);
}
