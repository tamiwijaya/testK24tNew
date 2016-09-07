package id.or.greenlabs.pilkada.api.controller.test;

import id.or.greenlabs.app.core.common.Constant;
import id.or.greenlabs.app.core.entity.User;
import id.or.greenlabs.app.core.service.SystemParameterService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


/**
 * Created by KENDA on 5/15/2015.
 */
public class SystemParameterControllerTest extends BaseControllerTest {

    @Mock
    private SystemParameterService mockService;
    @Autowired
    private SystemParameterService service;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(applicationContext).build();
        mockHttpSession.setAttribute(Constant.SESSION_USER, new User(1));
    }

    @Test
    public void find() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/systems")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void checkLink() {
        service.linkCheker("greenlabs.or");
    }

}
