package id.or.greenlabs.app.api.controller;

import id.or.greenlabs.app.core.service.SystemParameterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Created by krissadewo on 05/03/16.
 */
@RestController
public class SystemParameterController extends BaseController {

    @Autowired
    private SystemParameterService service;

    @RequestMapping(value = "systems", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> find() {
        return convertModel(service.find(), HttpStatus.OK);
    }

    @RequestMapping(value = "systems/checkUrl", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> checkUrl(@RequestParam(value = "url", required = true) String url) {
        return convertModel(service.linkCheker(url), HttpStatus.OK);
    }
}
