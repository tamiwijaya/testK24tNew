package id.or.greenlabs.pilkada.api.controller.test;

import com.google.gson.Gson;
import id.or.greenlabs.app.api.controller.MenuController;
import id.or.greenlabs.app.core.common.Constant;
import id.or.greenlabs.app.core.entity.Menu;
import id.or.greenlabs.app.core.entity.RoleMenu;
import id.or.greenlabs.app.core.entity.User;
import id.or.greenlabs.app.core.service.RoleMenuService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
public class RoleMenuTest extends BaseControllerTest {

    @InjectMocks
    private MenuController sampleController;
    @Mock
    private RoleMenuService mockService;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(applicationContext).build();
        mockHttpSession.setAttribute(Constant.SESSION_USER, new User((int) 1l));
    }

    @Test
    @Transactional
    public void saveObject() throws Exception {
        List<RoleMenu> roleMenus = new ArrayList<>();
        for (RoleMenu roleMenu : roleMenus) {
            roleMenu.setId(1l);
            roleMenu.setMenu(new Menu(1l));
            roleMenu.setCanRead(true);
            roleMenu.setCanDelete(true);
            roleMenus.add(roleMenu);
        }

        mockMvc.perform(
                MockMvcRequestBuilders.post("/role/menu")
                        .session(mockHttpSession)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new Gson().toJson(roleMenus)))
                .andExpect(MockMvcResultMatchers.status().isOk()).andDo(MockMvcResultHandlers.print());
    }
}

