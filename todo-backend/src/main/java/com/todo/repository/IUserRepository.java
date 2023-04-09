package com.todo.repository;

import com.todo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, String> {
    boolean existsByEmailIgnoreCase(String email);
    User findUserByEmailIgnoreCase(String email);
}
