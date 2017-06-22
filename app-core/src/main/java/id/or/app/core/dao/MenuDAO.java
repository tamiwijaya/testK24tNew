package id.or.app.core.dao;

import id.or.app.core.entity.Role;
import id.or.app.core.entity.Menu;
import id.or.app.core.entity.User;

import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
public interface MenuDAO extends BaseDAO<Menu>{

    /**
     * get menu by user
     *
     * @param user
     * @return
     */
    List<Menu> find(User user);

    List<Menu> find(Role role);
}
