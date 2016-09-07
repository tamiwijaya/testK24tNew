package id.or.greenlabs.app.core.dao.impl;

import id.or.greenlabs.app.core.dao.RoleDAO;
import id.or.greenlabs.app.core.entity.Role;
import id.or.greenlabs.app.core.util.Table;
import org.springframework.beans.factory.annotation.Autowired;
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
public class RoleDAOImpl implements RoleDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Role save(Role entity) {
        String sql = "INSERT INTO " + Table.SYSTEM_ROLE + "(nama) VALUES(?)";
        jdbcTemplate.update(sql, entity.getRoleLevel().toString());
        return entity;
    }

    @Override
    public Role update(Role entity) {
        return null;
    }

    @Override
    public Role delete(Role entity) {
        return null;
    }

    @Override
    public Role findById(int id) {
        return null;
    }

    @Override
    public List<Role> find(Role param, int offset, int limit) {
        String sql = "SELECT * FROM " + Table.SYSTEM_ROLE;
        return jdbcTemplate.query(sql, new RoleRowMapper());
    }

    @Override
    public int count(Role param) {
        return 0;
    }

    class RoleRowMapper implements RowMapper<Role>{

        @Override
        public Role mapRow(ResultSet rs, int i) throws SQLException {
            Role role = new Role();
            role.setId(rs.getLong("id"));
            role.setRoleLevel(Role.RoleLevel.valueOf(rs.getString("nama")));
            return role;
        }
    }
}
