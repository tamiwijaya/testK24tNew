package id.or.greenlabs.app.core.dao;

import id.or.greenlabs.app.core.entity.Menu;
import id.or.greenlabs.app.core.entity.Role;
import id.or.greenlabs.app.core.entity.User;
import org.springframework.cache.annotation.Cacheable;

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
