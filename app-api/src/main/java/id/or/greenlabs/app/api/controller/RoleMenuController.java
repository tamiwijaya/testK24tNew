package id.or.greenlabs.app.api.controller;

import id.or.greenlabs.app.core.common.Result;
import id.or.greenlabs.app.core.entity.RoleMenu;
import id.or.greenlabs.app.core.service.RoleMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Created by Tami on 07/06/2016.
 */
@RestController
public class RoleMenuController extends BaseController {

    @Autowired
    private RoleMenuService service;

    @RequestMapping(value = "role/menu", method = RequestMethod.POST)
    public Map<String, Object> save(@RequestBody List<RoleMenu> roleMenus) {
        Result result = service.save(roleMenus);
        if (result.getMessage().equals(Result.SAVE_SUCCESS)) {
            return convertModel(HttpStatus.OK);
        }

        return convertModel(HttpStatus.NOT_FOUND);
    }
}
