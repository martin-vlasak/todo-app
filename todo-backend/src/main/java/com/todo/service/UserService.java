package com.todo.service;

import com.todo.model.User;
import com.todo.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService{
    @Autowired
    private IUserRepository userRepository;

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public User getUser(String email) {
        User toReturn = null;
        if (userRepository.findById(email) != null)
        {
            toReturn = userRepository.findById(email).get();
        }

        return toReturn;
    }
}
