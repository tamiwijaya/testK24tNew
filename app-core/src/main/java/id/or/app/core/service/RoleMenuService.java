package id.or.app.core.service;

import id.or.app.core.common.Result;
import id.or.app.core.dao.RoleMenuDAO;
import id.or.app.core.entity.RoleMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
