/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package id.or.greenlabs.app.api.controller;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/**
 * Base class of controller to provide general method and behaviour to other
 * controller, all controller on this project should extend this class
 *
 * @author krissadewo <dailycode.org>
 * @date Jun 25, 2013
 */
public class BaseController {

    protected Locale ID = new Locale("id");

    /**
     * Converting entity object to json value with specific format
     *
     * @param data
     * @param status
     * @return
     */
    public Map<String, Object> convertModel(Object data, Object status) {
        Map<String, Object> model = new HashMap<>();
        model.put("data", data);
        model.put("status", status);
        return model;
    }

    public Map<String, Object> convertModel(Object data, Object rows, Object status) {
        Map<String, Object> model = new HashMap<>();
        model.put("data", data);
        model.put("rows", rows);
        model.put("status", status);
        return model;
    }

    /**
     * @param data
     * @return
     */
    public Map<String, Object> convertModel(Object data) {
        Map<String, Object> model = new HashMap<>();
        model.put("data", data);
        return model;
    }

    /**
     * Converting entity object to json value with specific format
     *
     * @param status
     * @return
     */
    public Map<String, Object> convertModel(String status) {
        Map<String, Object> model = new HashMap();
        model.put("status", status);
        return model;
    }

}
