/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package id.or.app.core.dao.impl;

import id.or.app.core.dao.UserDAO;
import id.or.app.core.entity.Role;
import id.or.app.core.entity.User;
import id.or.app.core.util.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * @author Tami
 */
@Repository
public class UserDAOImpl implements UserDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public User save(User entity) {
        String sql = "INSERT INTO " + Table.SYSTEM_USER + " (" +
                "realname," +
                "username," +
                "password," +
                "email," +
                "role_id) " +
                "VALUES(?,?,?,?,?) ";

        jdbcTemplate.update(sql,
                entity.getName(),
                entity.getUsername(),
                entity.getPassword(),
                entity.getEmail(),
                entity.getRole().getId());

        return entity;
    }

    @Override
    public User update(User entity) {
        String sql = "UPDATE " + Table.SYSTEM_USER + " SET " +
                "realname = ?, " +
                "username = ?, " +
                "password = ?, " +
                "email = ?, " +
                "role_id = ? " +
                "WHERE id =  ? ";

        jdbcTemplate.update(sql,
                entity.getName(),
                entity.getUsername(),
                entity.getPassword(),
                entity.getEmail(),
                entity.getRole().getId(),
                entity.getId());

        return entity;
    }

    @Override
    public User delete(User entity) {
        String sql = "DELETE FROM " + Table.SYSTEM_USER + "WHERE id = ? ";
        jdbcTemplate.update(sql, entity.getId());
        return entity;
    }

    @Override
    public User findById(int id) {
        String sql = "SELECT su.*, " +
                "sr.id AS id_role, " +
                "sr.nama AS role_name " +
                "FROM " + Table.SYSTEM_USER + " su " +
                "INNER JOIN " + Table.SYSTEM_ROLE + " sr ON sr.id = su.role_id " +
                "WHERE 1 = 1 " +
                "AND su.id = ? ";

        try {
            return jdbcTemplate.queryForObject(sql, new UsersRowMapper(), id);
        } catch (EmptyResultDataAccessException ignored) {
        }

        return null;
    }

    @Override
    public List<User> find(User param, int offset, int limit) {
        String sql = "SELECT su.*, " +
                "sr.id AS id_role, " +
                "sr.nama AS role_name " +
                "FROM " + Table.SYSTEM_USER + " su " +
                "INNER JOIN " + Table.SYSTEM_ROLE + " sr ON sr.id = su.role_id " +
                "WHERE 1 = 1 ";

        return jdbcTemplate.query(sql, new UsersRowMapper());
    }

    @Override
    public int count(User param) {
        return 0;
    }

    @Override
    public User findByUsername(String userName) {
        String sql = "SELECT su.*, " +
                "sr.id AS id_role, " +
                "sr.nama AS role_name " +
                "FROM " + Table.SYSTEM_USER + " su " +
                "INNER JOIN " + Table.SYSTEM_ROLE + " sr ON sr.id = su.role_id " +
                "WHERE 1 = 1 " +
                "AND su.userName = ? ";

        try {
            return jdbcTemplate.queryForObject(sql, new RowMapper<User>() {
                @Override
                public User mapRow(ResultSet rs, int i) throws SQLException {
                    Role role = new Role();
                    role.setId(rs.getLong("id_role"));
                    role.setRoleLevel(Role.RoleLevel.valueOf(rs.getString("role_name")));

                    User user = new User();
                    user.setId(rs.getInt("id"));
                    user.setName(rs.getString("realname"));
                    user.setUsername(rs.getString("username"));
                    user.setPassword(rs.getString("password"));
                    user.setEmail(rs.getString("email"));
                    user.setRole(role);
                    return user;
                }
            }, userName);
        } catch (EmptyResultDataAccessException ignored) {
        }

        return null;
    }

    @Override
    public String getPassword(User user) {
        String sql = "SELECT password FROM " + Table.SYSTEM_USER
                + "WHERE id =  ? "
                + "AND is_delete = 'N' ";

        return jdbcTemplate.queryForObject(sql, new Object[]{user.getId()}, String.class);
    }

    class UsersRowMapper implements RowMapper<User> {

        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            Role role = new Role();
            role.setId(rs.getLong("id_role"));
            role.setRoleLevel(Role.RoleLevel.valueOf(rs.getString("role_name")));

            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("realname"));
            user.setUsername(rs.getString("username"));
            //user.setPassword(rs.getString("password"));
            user.setEmail(rs.getString("email"));
            user.setRole(role);
            return user;
        }
    }
}
