package id.or.app.core.dao;


import id.or.app.core.entity.SystemParameter;

/**
 * Created with IntelliJ IDEA.
 * User: Tami
 * Date: 11/26/13
 * Time: 3:33 PM
 * To change this template use File | Settings | File Templates.
 */
public interface SystemParameterDAO extends BaseDAO<SystemParameter> {

    SystemParameter find();
}
