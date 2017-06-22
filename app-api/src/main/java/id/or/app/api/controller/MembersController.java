package id.or.app.api.controller;

import id.or.app.core.common.Result;
import id.or.app.core.entity.Members;
import id.or.app.core.service.MembersService;
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
 * Created by Tami on 6/21/2017.
 */
@RestController
public class MembersController extends BaseController {

    @Autowired
    private MembersService service;

    @RequestMapping(value = "members", method = RequestMethod.GET)
    public ResponseEntity<List<Members>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "members", method = RequestMethod.POST)
    public Map<String, Object> save(@RequestBody Members members) {
        Result result = service.save(members);
        if (result.getMessage().equals(Result.SAVE_SUCCESS)) {
            return convertModel(HttpStatus.OK);
        }

        return convertModel(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "members/delete", method = RequestMethod.DELETE)
    public Map<String, Object> delete(@RequestBody Members members) {
        Result result = service.delete(members);
        if (result.getMessage().equals(Result.DELETE_SUCCESS)) {
            return convertModel(HttpStatus.OK);
        }
        return convertModel(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(value = "members/find", method = RequestMethod.GET)
    public Map<String, Object> findById(int id) {
        return convertModel(service.findById(id), HttpStatus.OK);
    }
}
