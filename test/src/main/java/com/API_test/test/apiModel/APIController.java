package com.API_test.test.apiModel;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class APIController {

    @GetMapping("/greet")
    public String greeting() {
        return "Hello World";
    }
}
