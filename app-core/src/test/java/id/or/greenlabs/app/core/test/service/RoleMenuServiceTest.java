package id.or.greenlabs.app.core.test.service;

import id.or.greenlabs.app.core.AppCore;
import id.or.greenlabs.app.core.common.Constant;
import id.or.greenlabs.app.core.entity.Menu;
import id.or.greenlabs.app.core.entity.RoleMenu;
import id.or.greenlabs.app.core.entity.User;
import id.or.greenlabs.app.core.service.RoleMenuService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Tami on 20/06/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:core-context.xml"})
@WebAppConfiguration
public class RoleMenuServiceTest {
    @Autowired
    private RoleMenuService service;
    @Autowired
    private MockHttpSession mockHttpSession;
    private RoleMenu agama;
    private RoleMenu param;

    @Before
    public void init() {
        agama = new RoleMenu();
        param = new RoleMenu();
        mockHttpSession.setAttribute(Constant.SESSION_USER, new User(1));
    }

    @Test
    @Transactional
    public void save() {
        List<RoleMenu> roleMenus = new ArrayList<>();
        for (RoleMenu roleMenu : roleMenus) {
            roleMenu.setId(1l);
            roleMenu.setMenu(new Menu(1l));
            roleMenu.setCanRead(true);
            roleMenu.setCanDelete(true);
            roleMenus.add(roleMenu);
        }
        AppCore.getLogger(this).info(String.valueOf(service.save(roleMenus)));
    }

}

