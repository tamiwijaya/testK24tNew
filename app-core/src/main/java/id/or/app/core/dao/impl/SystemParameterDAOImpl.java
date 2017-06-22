package id.or.app.core.dao.impl;

import id.or.app.core.entity.SystemParameter;
import id.or.app.core.dao.SystemParameterDAO;
import id.or.app.core.util.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Tami
 * Date: 11/26/13
 * Time: 3:33 PM
 * To change this template use File | Settings | File Templates.
 */
@Repository
public class SystemParameterDAOImpl implements SystemParameterDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public SystemParameter save(SystemParameter entity) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public SystemParameter update(SystemParameter entity) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public SystemParameter delete(SystemParameter entity) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public SystemParameter findById(int id) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<SystemParameter> find(SystemParameter param, int offset, int limit) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public int count(SystemParameter paramWrapper) {
        return 0;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public SystemParameter find() {
        String sql = "SELECT *FROM " + Table.SYSTEM_PARAMETER;
        return jdbcTemplate.queryForObject(sql, new SystemParameterRowMapper());
    }

    class SystemParameterRowMapper implements RowMapper<SystemParameter> {

        @Override
        public SystemParameter mapRow(ResultSet rs, int rowNum) throws SQLException {
            SystemParameter systemParameter = new SystemParameter();
            systemParameter.setImageUrl(rs.getString("image_url"));
            return systemParameter;
        }
    }
}
