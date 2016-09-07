package id.or.greenlabs.app.core.dao.impl;

import id.or.greenlabs.app.core.dao.MenuDAO;
import id.or.greenlabs.app.core.entity.Menu;
import id.or.greenlabs.app.core.entity.Role;
import id.or.greenlabs.app.core.entity.RoleMenu;
import id.or.greenlabs.app.core.entity.User;
import id.or.greenlabs.app.core.util.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
@Repository
public class MenuDAOImpl implements MenuDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    @Cacheable("menu")
    public List<Menu> find(User user) {
        String sql = "SELECT " +
                "m.*," +
                "rm.*," +
                "rm.id AS id_role_menu " +
                "FROM " + Table.SYSTEM_MENU + " m " +
                "INNER JOIN " + Table.SYSTEM_ROLE_MENU + " rm ON rm.menu_id = m.id " +
                "INNER JOIN " + Table.SYSTEM_ROLE_USER + " ru ON ru.role_id = rm.role_id " +
                "WHERE ru.user_id = ? " +
                "AND rm.can_read = 1 " +
                "GROUP BY m.id " +
                "ORDER BY order_number, parent_id ";

        return jdbcTemplate.query(sql, new Object[]{user.getId()}, new MenuUserRoleRowMapper());
    }

    @Override
    @Cacheable("menu")
    public List<Menu> find(Role role) {
        String sql = "SELECT " +
                "m.*," +
                "rm.*, " +
                "rm.id AS id_role_menu " +
                "FROM " + Table.SYSTEM_MENU + " m " +
                "LEFT JOIN " + Table.SYSTEM_ROLE_MENU + " rm ON rm.menu_id = m.id " +
                "WHERE rm.role_id = ? " +
                "ORDER BY order_number, parent_id";

        return jdbcTemplate.query(sql, new Object[]{role.getId()}, new MenuUserRoleRowMapper());
    }

    @Override
    public Menu save(Menu entity) {
        return null;
    }

    @Override
    public Menu update(Menu entity) {
        return null;
    }

    @Override
    public Menu delete(Menu entity) {
        return null;
    }

    @Override
    public Menu findById(int id) {
        return null;
    }

    @Override
    @Cacheable("menu")
    public List<Menu> find(Menu param, int offset, int limit) {
        String sql = "SELECT * FROM " + Table.SYSTEM_MENU + " "
                + "ORDER BY order_number, parent_id ";

        return jdbcTemplate.query(sql, new MenuRowMapper());
    }

    @Override
    public int count(Menu param) {
        return 0;
    }

    class MenuRowMapper implements RowMapper<Menu> {

        @Override
        public Menu mapRow(ResultSet rs, int i) throws SQLException {
            Menu menu = new Menu();
            menu.setId(rs.getLong("id"));
            menu.setHref(rs.getString("href"));
            menu.setKode(rs.getString("code"));
            menu.setIdParent(rs.getLong("parent_id"));
            menu.setName(rs.getString("name"));
            menu.setOrderNumber(rs.getInt("order_number"));
            return menu;
        }
    }

    class MenuUserRoleRowMapper implements RowMapper<Menu> {

        @Override
        public Menu mapRow(ResultSet rs, int rowNum) throws SQLException {
            Menu menu = new Menu();
            menu.setId(rs.getLong("id"));
            menu.setKode(rs.getString("code"));
            menu.setHref(rs.getString("href"));
            menu.setUrl(rs.getString("url"));
            menu.setIdParent(rs.getLong("parent_id"));
            menu.setName(rs.getString("name"));
            menu.setOrderNumber(rs.getInt("order_number"));

            RoleMenu roleMenu = new RoleMenu();
            roleMenu.setId(rs.getLong("id_role_menu"));
            roleMenu.setCanRead(rs.getBoolean("can_read"));
            roleMenu.setCanSave(rs.getBoolean("can_save"));
            roleMenu.setCanEdit(rs.getBoolean("can_edit"));
            roleMenu.setCanEdit(rs.getBoolean("can_edit"));
            roleMenu.setCanDelete(rs.getBoolean("can_delete"));
            roleMenu.setCanPrint(rs.getBoolean("can_print"));

            menu.setRoleMenu(roleMenu);
            return menu;
        }
    }
}
