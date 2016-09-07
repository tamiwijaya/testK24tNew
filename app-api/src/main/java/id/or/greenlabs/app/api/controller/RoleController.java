package id.or.greenlabs.app.api.controller;

import id.or.greenlabs.app.core.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Created by Tami on 07/06/2016.
 */
@RestController
public class RoleController extends BaseController{

    @Autowired
    private RoleService service;

    @RequestMapping(value = "roles", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> find() {
        return convertModel(service.findAll(), HttpStatus.OK);
    }
}
