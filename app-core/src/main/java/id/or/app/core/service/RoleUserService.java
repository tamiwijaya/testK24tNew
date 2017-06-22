package id.or.app.core.service;

import id.or.app.core.common.Result;
import id.or.app.core.dao.RoleUserDAO;
import id.or.app.core.entity.RoleUser;
import id.or.app.core.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
@Service
public class RoleUserService {

    @Autowired
    private RoleUserDAO roleUserDAO;

    public List<RoleUser> find(User user) {
        return roleUserDAO.find(user);
    }

    public Result deleteByUser(List<RoleUser> roleUsers) {
        roleUserDAO.delete(roleUsers);
        return null;
    }
}
