package id.or.app.core.dao.impl;

import id.or.app.core.dao.RoleMenuDAO;
import id.or.app.core.entity.RoleMenu;
import id.or.app.core.util.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
@Repository
public class RoleMenuDAOImpl implements RoleMenuDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    @CacheEvict(value = "menu")
    public RoleMenu save(RoleMenu entity) {
        String sql = "INSERT INTO " + Table.SYSTEM_ROLE_MENU + "("
                + "menu_id,"
                + "role_id,"
                + "can_read,"
                + "can_save,"
                + "can_edit,"
                + "can_delete, "
                + "can_print)"
                + "VALUES(?,?,?,?,?,?,?)";

        jdbcTemplate.update(sql,
                entity.getMenu().getId(),
                entity.getRole().getId(),
                entity.isCanRead(),
                entity.isCanSave(),
                entity.isCanEdit(),
                entity.isCanDelete(),
                entity.isCanPrint());

        return entity;
    }

    @Override
    @CacheEvict(value = "menu")
    public RoleMenu update(RoleMenu entity) {
        String sql = "UPDATE " + Table.SYSTEM_ROLE_MENU + " SET "
                + "menu_id = ?,"
                + "role_id = ?,"
                + "can_read = ?,"
                + "can_save = ?, "
                + "can_edit = ?,"
                + "can_delete = ?, "
                + "can_print = ? "
                + "WHERE id = ? ";

        jdbcTemplate.update(sql,
                entity.getMenu().getId(),
                entity.getRole().getId(),
                entity.isCanRead(),
                entity.isCanSave(),
                entity.isCanEdit(),
                entity.isCanDelete(),
                entity.isCanPrint(),
                entity.getId());

        return entity;
    }

    @Override
    public RoleMenu delete(RoleMenu entity) {
        return null;
    }

    @Override
    public RoleMenu findById(int id) {
        return null;
    }

    @Override
    public List<RoleMenu> find(RoleMenu param, int offset, int limit) {
        return null;
    }

    @Override
    public int count(RoleMenu param) {
        return 0;
    }
}
