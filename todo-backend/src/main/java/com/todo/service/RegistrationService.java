package com.todo.service;

import com.todo.model.User;
import com.todo.repository.IUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service

public class RegistrationService {
    private final IUserRepository iUserRepository;

    public RegistrationService(IUserRepository iUserRepository) {
        this.iUserRepository = iUserRepository;
    }

    public ResponseEntity<String> registerUser(RegistrationForm registrationForm) {
        // Ověření, jestli existuje username
        if (iUserRepository.existsByEmailIgnoreCase(registrationForm.getEmail())) {
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        } else {
            User user = new User();
            user.setEmail(registrationForm.getEmail());
            user.setName(registrationForm.getName());
            user.setLastName(registrationForm.getLastname());
            user.setPassword(registrationForm.getPassword());
            iUserRepository.save(user);
            return new ResponseEntity<>("User registered!", HttpStatus.OK);
        }
    }
}
