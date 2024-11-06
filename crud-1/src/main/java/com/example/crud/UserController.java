package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students/add")
public class UserController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAllUsers() {
        return studentRepository.findAll();
    }

    @PostMapping
    public Student createUser(@RequestBody Student stu) {
        return studentRepository.save(stu);
    }
}


