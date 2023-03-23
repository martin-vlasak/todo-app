package com.todo.controller;

import com.todo.model.LoginContext;
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
    public String add(@RequestBody User userToRegister)
    {
        User user = service.getUser(userToRegister.getEmail());
        if (user == null)
        {
            service.saveUser(userToRegister);
            return "Successfully registered!";
        }
        else
        {
            return "User already exists!";
        }
    }

    @PostMapping("/login")
    public String getUser(@RequestBody LoginContext context)
    {
        User user = service.getUser(context.email);
        if (user != null && user.getPassword().equals(context.password))
        {
            return "Successfully logged in!";
        }
        else
        {
            return "Incorrect login!";
        }
    }
}
