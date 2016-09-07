package id.or.greenlabs.app.core.test.service;

import id.or.greenlabs.app.core.AppCore;
import id.or.greenlabs.app.core.common.Constant;
import id.or.greenlabs.app.core.entity.User;
import id.or.greenlabs.app.core.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.bind.DatatypeConverter;

/**
 * Created by Tami on 20/06/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:core-context.xml"})
@WebAppConfiguration
public class UserServiceTest {

    @Autowired
    private UserService service;
    @Autowired
    private MockHttpSession mockHttpSession;
    private User user;
    private User param;

    @Before
    public void init() {
        user = new User();
        param = new User();
        param.setId(1);
        mockHttpSession.setAttribute(Constant.SESSION_USER, new User(1));
    }

    @Test
    @Transactional
    public void delete() {
        AppCore.getLogger(this).info(service.delete(param).getMessage());
    }

    @Test
    @Transactional
    public void login() {
        param.setUsername("cek");
        param.setPassword("cek");
        AppCore.getLogger(this).info(service.login(param)+ " ");
    }

    @Test
    public void logout() {
        param.setUsername("cek");
        param.setPassword("cek");
        service.logout("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZWsiLCJyb2xlcyI6ImNlayIsImlhdCI6MTQ2OTc5MjIwMywiZXhwIjoxNDY5Nzk5NDAzfQ.te1sxUTLHXITf-kPOBHAXDD2ccnYoqwI6_mlgtwvSUA");
    }

    @Test
    public void validateToken() {
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary("Aa@123"))
                .parseClaimsJws("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZWsiLCJyb2xlcyI6ImNlayIsImlhdCI6MTQ2OTc5MjIwMywiZXhwIjoxNDY5Nzk5NDAzfQ.te1sxUTLHXITf-kPOBHAXDD2ccnYoqwI6_mlgtwvSUA").getBody();
        System.out.println("ID: " + claims.getId());
        System.out.println("Subject: " + claims.getSubject());
        System.out.println("Issuer: " + claims.getIssuer());
        System.out.println("Expiration: " + claims.getExpiration());

        DateTime dateTime = new DateTime(claims.getExpiration());
        System.out.println(dateTime.isAfterNow());
    }
}

