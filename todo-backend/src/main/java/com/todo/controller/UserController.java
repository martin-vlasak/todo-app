package com.todo.controller;

import com.todo.model.User;
import com.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public User register(@RequestBody User user)
    {
        return service.saveUser(user);
    }

    @PostMapping("/login/{email}")
    public User login(@PathVariable("email") String email)
    {
        User user = service.getUser(email);
        if (user != null)
        {
            return user;
        }
        else
        {
            return null;
        }
    }

    @PostMapping("/getUser/{email}")
    public User getAllUsers()
    {
        return null;
    }

    @PostMapping("/delete/{email}")
    public String delete(@PathVariable("email") String email)
    {
        service.deleteUser(service.getUser(email));
        return "deleted";
    }
}
