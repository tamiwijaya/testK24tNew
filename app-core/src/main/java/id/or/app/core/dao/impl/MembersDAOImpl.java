package id.or.app.core.dao.impl;

import id.or.app.core.dao.MembersDAO;
import id.or.app.core.entity.Members;
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
 * Created by Tami on 6/21/2017.
 */
@Repository
public class MembersDAOImpl implements MembersDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Members save(Members entity) {
        String sql = "INSERT INTO " + Table.MEMBERS + " (" +
                "nama," +
                "tanggal_lahir," +
                "alamat," +
                "email," +
                "telepon) " +
                "VALUES(?,?,?,?,?) ";

        jdbcTemplate.update(sql,
                entity.getNama(),
                entity.getTanggalLahir(),
                entity.getAlamat(),
                entity.getEmail(),
                entity.getTelepon());

        return entity;
    }

    @Override
    public Members update(Members entity) {
        String sql = "UPDATE " + Table.MEMBERS + " SET " +
                "nama = ?," +
                "tanggal_lahir = ?," +
                "alamat = ?," +
                "email = ?," +
                "telepon = ? " +
                "WHERE id =  ? ";

        jdbcTemplate.update(sql,
                entity.getNama(),
                entity.getTanggalLahir(),
                entity.getAlamat(),
                entity.getEmail(),
                entity.getTelepon(),
                entity.getId());

        return entity;
    }

    @Override
    public Members delete(Members entity) {
        String sql = "DELETE FROM " + Table.MEMBERS + "WHERE id = ? ";
        jdbcTemplate.update(sql, entity.getId());
        return entity;
    }

    @Override
    public Members findById(int id) {
        String sql = "SELECT * FROM " + Table.MEMBERS + " " +
                "WHERE 1 = 1 " +
                "AND id = ? ";

        try {
            return jdbcTemplate.queryForObject(sql, new MembersRowMapper(), id);
        } catch (EmptyResultDataAccessException ignored) {
        }

        return null;
    }

    @Override
    public List<Members> find(Members param, int offset, int limit) {
        String sql = "SELECT * FROM " + Table.MEMBERS + " " +
                "WHERE 1 = 1 ";

        return jdbcTemplate.query(sql, new MembersRowMapper());
    }

    @Override
    public int count(Members param) {
        return 0;
    }

    class MembersRowMapper implements RowMapper<Members> {

        @Override
        public Members mapRow(ResultSet rs, int rowNum) throws SQLException {
            Members members = new Members();
            members.setId(rs.getInt("id"));
            members.setNama(rs.getString("nama"));
            members.setAlamat(rs.getString("alamat"));
            members.setEmail(rs.getString("email"));
            members.setTelepon(rs.getString("telepon"));
            members.setTanggalLahir(rs.getDate("tanggal_lahir"));
            return members;
        }
    }
}
