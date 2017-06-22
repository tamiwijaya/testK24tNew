/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package id.or.app.core.dao;


import id.or.app.core.entity.User;

/**
 * @author Tami
 */
public interface UserDAO extends BaseDAO<User>{

    User findByUsername(String userName);

    String getPassword(User user);

}
