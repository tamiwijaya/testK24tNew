package id.or.greenlabs.app.core.dao.impl;

import id.or.greenlabs.app.core.dao.RoleUserDAO;
import id.or.greenlabs.app.core.entity.Role;
import id.or.greenlabs.app.core.entity.RoleUser;
import id.or.greenlabs.app.core.entity.User;
import id.or.greenlabs.app.core.util.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
@Repository
public class RoleUserDAOImpl implements RoleUserDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<RoleUser> save(List<RoleUser> roleUsers) {
        String sql = "INSERT INTO " + Table.SYSTEM_ROLE_USER + "(" +
                "user_id," +
                "role_id) " +
                "VALUES(?,?)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                RoleUser roleUser = roleUsers.get(i);
                ps.setLong(1, roleUser.getUser().getId());
                ps.setLong(2, roleUser.getRole().getId());
            }

            @Override
            public int getBatchSize() {
                return roleUsers.size();
            }
        });

        return roleUsers;
    }

    @Override
    public List<RoleUser> find(User user) {
        String sql = "SELECT *FROM " + Table.SYSTEM_ROLE_USER + " ru " +
                "INNER JOIN " + Table.SYSTEM_ROLE + " r ON r.id = ru.role_id " +
                "WHERE ru.user_id = ? ";

        return jdbcTemplate.query(sql, new Object[]{user.getId()}, new RoleUserRowMapper());
    }

    @Override
    public void delete(List<RoleUser> roleUsers) {
        String sql = "DELETE FROM " + Table.SYSTEM_ROLE_USER + " WHERE user_id = ?";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                RoleUser roleUser = roleUsers.get(i);
                ps.setLong(1, roleUser.getUser().getId());
            }

            @Override
            public int getBatchSize() {
                return roleUsers.size();
            }
        });
    }

    @Override
    public RoleUser save(RoleUser entity) {
        return null;
    }

    @Override
    public RoleUser update(RoleUser entity) {
        return null;
    }

    @Override
    public RoleUser delete(RoleUser entity) {
        return null;
    }

    @Override
    public RoleUser findById(int id) {
        return null;
    }

    @Override
    public List<RoleUser> find(RoleUser param, int offset, int limit) {
        return null;
    }

    @Override
    public int count(RoleUser param) {
        return 0;
    }

    class RoleUserRowMapper implements RowMapper<RoleUser> {

        @Override
        public RoleUser mapRow(ResultSet rs, int rowNum) throws SQLException {
            Role role = new Role();
            role.setId(rs.getLong("role_id"));

            User user = new User();
            user.setId((int) rs.getLong("user_id"));

            RoleUser roleUser = new RoleUser();
            roleUser.setId(rs.getLong("id"));
            roleUser.setRole(role);
            roleUser.setUser(user);
            return roleUser;
        }
    }
}
