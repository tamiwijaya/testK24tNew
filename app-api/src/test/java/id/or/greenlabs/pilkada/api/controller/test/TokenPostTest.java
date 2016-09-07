package id.or.greenlabs.pilkada.api.controller.test;

import com.fasterxml.jackson.databind.ObjectMapper;
import id.or.greenlabs.app.core.common.Constant;
import id.or.greenlabs.app.core.entity.User;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


/**
 * Created by KENDA on 5/15/2015.
 */
public class TokenPostTest extends BaseControllerTest {

    @Mock
    private ObjectMapper tripJsonView;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(applicationContext).build();
        mockHttpSession.setAttribute(Constant.SESSION_USER, new User(1));
    }

    @Test
    public void saveOrUpdateUser() throws Exception {
        User user = new User();
        user.setUsername("Kenda Sukenda");
        user.setName("1566600323584505");
        user.setPassword("1566600323584505");

       /* user.setUsername("Sukenda");
        user.setName("1566600323584506");
        user.setPassword("1566600323584506");
        user.setUserGroup(new UserGroup(2L));
        user.setImage(new Image("http://192.168.0.9:8080/gtrip-api/users"));
        user.setClientDetail(new ClientDetail());*/

        mockMvc.perform(MockMvcRequestBuilders.post("/users/")
                .contentType(MediaType.APPLICATION_JSON)
                .session(mockHttpSession)
                .content(new ObjectMapper().writeValueAsString(user)))
                .andExpect(MockMvcResultMatchers.status().isOk()).andDo(MockMvcResultHandlers.print());

    }

    @Test
    public void getToken() throws Exception {
        User user = new User();
        user.setUsername("Kenda Sukenda");
        user.setName("1566600323584505");
        user.setPassword("1566600323584505");

        mockMvc.perform(MockMvcRequestBuilders.post("http://192.168.0.9:8080/gtrip-api/oauth/token?username=Kenda Sukenda&password=1566600323584505&client_id=1566600323584505&client_secret=1566600323584505&grant_type=password")
                .contentType(MediaType.APPLICATION_JSON)
                .session(mockHttpSession)
                .content(new ObjectMapper().writeValueAsString(user)))
                .andExpect(MockMvcResultMatchers.status().isOk()).andDo(MockMvcResultHandlers.print());

    }


}
