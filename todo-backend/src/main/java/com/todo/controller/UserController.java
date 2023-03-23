package com.todo.controller;

import com.todo.model.User;
import com.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public User register(@RequestBody User user)
    {
        return service.saveUser(user);
    }

    @PostMapping("/login/{email}_{password}")
    public User login(@PathVariable("email") String email, @PathVariable("password") String password)
    {
        User user = service.getUser(email);
        if (user != null && user.getPassword().equals(password))
        {
            return user;
        }
        else
        {
            return null;
        }
    }
}
