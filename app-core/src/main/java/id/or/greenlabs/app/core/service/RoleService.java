package id.or.greenlabs.app.core.service;

import id.or.greenlabs.app.core.dao.RoleDAO;
import id.or.greenlabs.app.core.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
@Service
public class RoleService {

    @Autowired
    private RoleDAO roleDAO;

    public List<Role> findAll() {
        return roleDAO.find(null, 0, Integer.MAX_VALUE);
    }
}
