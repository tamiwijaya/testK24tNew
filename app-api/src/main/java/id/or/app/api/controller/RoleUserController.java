package id.or.app.api.controller;

import id.or.app.core.common.Result;
import id.or.app.core.entity.RoleUser;
import id.or.app.core.entity.User;
import id.or.app.core.service.RoleUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
@RestController
public class RoleUserController extends BaseController {

    @Autowired
    private RoleUserService roleUserService;

    @RequestMapping(value = "/role/user", method = RequestMethod.GET)
    public ResponseEntity<List<RoleUser>>findByUser() {
        User user = new User();
        user.setId(1);
        return new ResponseEntity<>(roleUserService.find(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/role/deleteByUser", method = RequestMethod.DELETE)
    public ResponseEntity<Result> delete(@RequestBody List<RoleUser> roleUser, HttpServletRequest request, HttpServletResponse response) {
        Result result = roleUserService.deleteByUser(roleUser);
        if (result.getMessage().equals(Result.DELETE_SUCCESS)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
