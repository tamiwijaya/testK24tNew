package id.or.app.core.dao;

import id.or.app.core.entity.RoleUser;
import id.or.app.core.entity.User;

import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
public interface RoleUserDAO extends BaseDAO<RoleUser> {

    List<RoleUser> save(List<RoleUser> roleUsers);

    List<RoleUser> find(User user);

    /**
     * Delete role user by id users
     *
     * @param roleUsers list of role user
     */
    void delete(List<RoleUser> roleUsers);
}
