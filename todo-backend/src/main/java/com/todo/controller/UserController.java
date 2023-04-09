package com.todo.controller;

import com.todo.model.User;
import com.todo.repository.IUserRepository;
import com.todo.service.RegistrationForm;
import com.todo.service.RegistrationService;
import com.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService service;
    private final RegistrationService registrationService;
    private final IUserRepository iUserRepository;

    public UserController(RegistrationService registrationService, IUserRepository iUserRepository) {
        this.registrationService = registrationService;
        this.iUserRepository = iUserRepository;
    }

    /*@PostMapping("/register")
    public User register(@RequestBody User user)
    {
        return service.saveUser(user);
    }*/

    @PostMapping(value = "/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationForm registrationForm) {
        return registrationService.registerUser(registrationForm);
    }

    @PostMapping("/{email}")
    public User getUser(@PathVariable("email") String email)
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

    @PostMapping("/delete/{email}")
    public String delete(@PathVariable("email") String email)
    {
        service.deleteUser(service.getUser(email));
        return "deleted";
    }
}
