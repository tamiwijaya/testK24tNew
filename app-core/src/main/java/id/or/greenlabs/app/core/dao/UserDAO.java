/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package id.or.greenlabs.app.core.dao;


import id.or.greenlabs.app.core.entity.User;

/**
 * @author krissadewo
 */
public interface UserDAO extends BaseDAO<User>{

    User findByUsername(String userName);

}
