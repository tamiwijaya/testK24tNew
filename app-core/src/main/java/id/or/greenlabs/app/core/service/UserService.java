/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package id.or.greenlabs.app.core.service;

import id.or.greenlabs.app.core.AppCore;
import id.or.greenlabs.app.core.common.Result;
import id.or.greenlabs.app.core.dao.UserDAO;
import id.or.greenlabs.app.core.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.jasypt.util.password.StrongPasswordEncryptor;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.bind.DatatypeConverter;
import java.util.Date;
import java.util.List;

/**
 * @author kris
 */
@Service
public class UserService {

    @Autowired
    private UserDAO userDAO;
    private static final String API_KEY = "Aa@123";

    @Transactional
    public User login(User param) {
        User currentUser = userDAO.findByUsername(param.getUsername());
        if (currentUser != null) {
            StrongPasswordEncryptor strongPasswordEncryptor = new StrongPasswordEncryptor();
            if (strongPasswordEncryptor.checkPassword(param.getPassword(), currentUser.getPassword())) {
                currentUser.setToken(Jwts.builder()
                        .setSubject(param.getUsername())
                        .claim("roles", param.getUsername())
                        .setIssuedAt(new Date())
                        .setExpiration(new DateTime().plusHours(2).toDate())
                        .signWith(SignatureAlgorithm.HS256, API_KEY)
                        .compact());

                currentUser.setPassword("");
                return currentUser;
            } else {
                return param;
            }
        } else {
            return param;
        }
    }

    public boolean validateToken(String token) {
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(API_KEY))
                    .parseClaimsJws(token)
                    .getBody();

            return new DateTime(body.getExpiration()).isAfterNow();
        }catch (ExpiredJwtException e){
        }

        return false;
    }

    public void logout(String token) {
        try {
            System.out.println(Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(API_KEY))
                    .parseClaimsJws(token).getBody().setNotBefore(new Date()));
        }catch (ExpiredJwtException e){
        }
    }

    @Transactional
    public Result save(User user) {
        StrongPasswordEncryptor strongPasswordEncryptor = new StrongPasswordEncryptor();
        user.setPassword(strongPasswordEncryptor.encryptPassword(user.getPassword()));
        if (user.getId() == 0) {
            userDAO.save(user);
        } else {
            userDAO.update(user);
        }

        return null;
    }

    @Transactional
    public Result delete(User user) {
        user.setId(user.getId());
        userDAO.delete(user);
        return null;
    }

    public List<User> findAll() {
        return userDAO.find(null, 0, Integer.MAX_VALUE);
    }

    public User findById(int id) {
        return userDAO.findById(id);
    }

    public User findByUsername(String userName) {
        return userDAO.findByUsername(userName);
    }
}
