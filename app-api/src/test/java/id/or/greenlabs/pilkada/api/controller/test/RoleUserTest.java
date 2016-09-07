package id.or.greenlabs.pilkada.api.controller.test;

import com.fasterxml.jackson.databind.ObjectMapper;
import id.or.greenlabs.app.api.controller.RoleUserController;
import id.or.greenlabs.app.core.common.Constant;
import id.or.greenlabs.app.core.entity.*;
import id.or.greenlabs.app.core.service.RoleUserService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

/**
 * Created by Tami on 07/06/2016.
 */
public class RoleUserTest extends BaseControllerTest {

    @InjectMocks
    private RoleUserController sampleController;
    @Mock
    private RoleUserService mockService;
    @Autowired
    private RoleUserService menuService;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        this.mockMvc = standaloneSetup(sampleController)
                .setMessageConverters(new MappingJackson2HttpMessageConverter()).build();

        mockHttpSession.setAttribute(Constant.SESSION_USER, new User((int) 1l));
    }

    @Test
    public void getAll() throws Exception {
        User user = new User();
        user.setId(1);
        Mockito.when(mockService.find(user)).thenReturn(menuService.find(user));
//        mockMvc.perform(MockMvcRequestBuilders.get("/role/user")
//                .accept(MediaType.APPLICATION_JSON))
//                .andDo(MockMvcResultHandlers.print())
//                .andExpect(MockMvcResultMatchers.status().isOk());


//        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders.get("/role/user").accept(MediaType.APPLICATION_JSON))
//                .andDo(MockMvcResultHandlers.print()).andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
    }

    @Test
    @Transactional
    public void delete() throws Exception {
        List<RoleUser> roleMenus = new ArrayList<>();
        for (RoleUser roleMenu : roleMenus) {
            roleMenu.setId(1l);
            roleMenus.add(roleMenu);
        }

        Mockito.when(menuService.deleteByUser(roleMenus)).thenReturn(mockService.deleteByUser(roleMenus));

        mockMvc.perform(MockMvcRequestBuilders.delete("/role/deleteByUser")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(roleMenus)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

//    @Test
//    @Transactional
//    public void saveObject() throws Exception {
//        ObjectMapper mapper = new ObjectMapper();
//
//        Agama agama = new Agama();
//        agama.setName("KONGUAN");
//
//        Mockito.when(mockService.save(agama)).thenReturn(menuService.save(agama));
//
//        mockMvc.perform(
//                post("/agamas/")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(mapper.writeValueAsString(agama).getBytes()))
//                .andExpect(status().isOk()).andDo(print());
//    }

//    @Test
//    @Transactional
//    public void updateObject() throws Exception {
//        ObjectMapper mapper = new ObjectMapper();
//
//        Agama agama = new Agama();
//        agama.setId(28l);
//        agama.setName("KONGUAN");
//
//        Mockito.when(mockService.save(agama)).thenReturn(menuService.save(agama));
//
//        mockMvc.perform(
//                put("/agamas/")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(mapper.writeValueAsString(agama)))
//                .andExpect(status().isOk()).andDo(print());
//    }
//
//    @Test
//    //@Transactional
//    public void deleteObject() throws Exception {
//        ObjectMapper mapper = new ObjectMapper();
//
//        Agama agama = new Agama();
//        agama.setId(28l);
//        agama.setName("KONGUAN");
//
//        Mockito.when(mockService.save(agama)).thenReturn(menuService.save(agama));
//
//        mockMvc.perform(
//                delete("/agamas/")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(mapper.writeValueAsString(agama)))
//                .andExpect(status().isOk()).andDo(print());
//    }
}
