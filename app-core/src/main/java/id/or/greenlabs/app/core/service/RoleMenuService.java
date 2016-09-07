package id.or.greenlabs.app.core.service;

import id.or.greenlabs.app.core.common.Result;
import id.or.greenlabs.app.core.dao.RoleMenuDAO;
import id.or.greenlabs.app.core.entity.Menu;
import id.or.greenlabs.app.core.entity.Role;
import id.or.greenlabs.app.core.entity.RoleMenu;
import id.or.greenlabs.app.core.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallback;

import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
@Service
public class RoleMenuService extends BasedService {

    @Autowired
    private RoleMenuDAO roleMenuDAO;

    @Transactional
    public Result save(final List<RoleMenu> roleMenus) {
        for (RoleMenu roleMenu : roleMenus) {
            if (roleMenu.getId() == null || roleMenu.getId() == 0 || roleMenu.getUrutan() == 0) {
                roleMenuDAO.save(roleMenu);
            } else {
                roleMenu.setId(roleMenu.getUrutan());
                roleMenuDAO.update(roleMenu);
            }
        }

        return null;
    }
}
