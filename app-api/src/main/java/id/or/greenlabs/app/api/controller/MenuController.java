package id.or.greenlabs.app.api.controller;

import id.or.greenlabs.app.core.AppCore;
import id.or.greenlabs.app.core.entity.Menu;
import id.or.greenlabs.app.core.entity.Role;
import id.or.greenlabs.app.core.entity.RoleUser;
import id.or.greenlabs.app.core.entity.User;
import id.or.greenlabs.app.core.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Created by Tami on 07/06/2016.
 */
@RestController
public class MenuController extends BaseController {

    @Autowired
    private MenuService menuService;

    @RequestMapping(value = "menu/user", method = RequestMethod.GET)
    public ResponseEntity<List<Menu>> findByUser() {
        User user = new User();
        user.setId(1);
        return new ResponseEntity<>(menuService.createTreeMenu(user), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "menu/role")
    public ResponseEntity<List<Menu>> findByRole(Role role) {
        Role newRole = new Role();
        newRole.setId(role.getId());
        return new ResponseEntity<>(menuService.createTreeMenu(role), HttpStatus.OK);
    }
}
