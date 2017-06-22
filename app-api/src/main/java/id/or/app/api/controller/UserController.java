package id.or.app.api.controller;

import id.or.app.core.common.Result;
import id.or.app.core.entity.User;
import id.or.app.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Created by Tami on 10/04/2015.
 */
@RestController
public class UserController extends BaseController {

    @Autowired
    private UserService service;

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ResponseEntity<User> login(@RequestBody final User param) {
        return new ResponseEntity<>(service.login(param), HttpStatus.OK);
    }

    @RequestMapping(value = "validateToken", method = RequestMethod.POST)
    public Map<String, Object> validateToken(@RequestBody final String token) {
        return convertModel(service.validateToken(token), HttpStatus.OK);
    }

    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public Map<String, Object> logout(@RequestParam(name = "token",required = true) final String token) {
        service.logout(token);
        return convertModel(HttpStatus.OK);
    }

    @RequestMapping(value = "setting/users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> findByUser() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "setting/users", method = RequestMethod.POST)
    public Map<String, Object> save(@RequestBody User user) {
        Result result = service.save(user);
        if (result.getMessage().equals(Result.SAVE_SUCCESS)) {
            return convertModel(HttpStatus.OK);
        }

        return convertModel(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "setting/users/delete", method = RequestMethod.DELETE)
    public ResponseEntity<User> delete(@RequestBody User user) {
        Result result = service.delete(user);
        if (result.getMessage().equals(Result.DELETE_SUCCESS)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "setting/users/find", method = RequestMethod.GET)
    public ResponseEntity<User> findById(@RequestParam("id") int id) {
        return new ResponseEntity<>(service.findById(id), HttpStatus.OK);
    }

}