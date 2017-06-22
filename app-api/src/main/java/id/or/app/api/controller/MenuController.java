package id.or.app.api.controller;

import id.or.app.core.entity.Menu;
import id.or.app.core.entity.Role;
import id.or.app.core.entity.User;
import id.or.app.core.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
@RestController
public class MenuController extends BaseController {

    @Autowired
    private MenuService menuService;

    @RequestMapping(value = "menu/user", method = RequestMethod.GET)
    public ResponseEntity<List<Menu>> findByUser(@RequestParam("id") int id) {
        User user = new User();
        user.setId(id);
        return new ResponseEntity<>(menuService.createTreeMenu(user), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "menu/role")
    public ResponseEntity<List<Menu>> findByRole(@RequestParam("id") Long id) {
        Role role = new Role();
        role.setId(id);
        return new ResponseEntity<>(menuService.createTreeMenu(role), HttpStatus.OK);
    }
}
