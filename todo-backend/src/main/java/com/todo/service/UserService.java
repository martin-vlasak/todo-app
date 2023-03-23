package com.todo.service;

import com.todo.exception.UserNotFoundException;
import com.todo.model.User;
import com.todo.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService{
    @Autowired
    private IUserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUser(String email) {
        User user = userRepository.findById(email).orElseThrow(() -> new UserNotFoundException("User not found!"));
        return user;
    }

    @Override
    public void deleteUser(User user) {
        try {
            userRepository.delete(user);
        }
        catch (Exception e)
        {
            System.out.println("User not found");
        }
    }
}
