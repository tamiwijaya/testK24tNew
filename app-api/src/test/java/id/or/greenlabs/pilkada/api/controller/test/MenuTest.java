package id.or.greenlabs.pilkada.api.controller.test;

import id.or.greenlabs.app.api.controller.MenuController;
import id.or.greenlabs.app.core.common.Constant;
import id.or.greenlabs.app.core.entity.User;
import id.or.greenlabs.app.core.service.MenuService;
import org.junit.Before;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

/**
 * Created by Tami on 07/06/2016.
 */
public class MenuTest extends BaseControllerTest {

    @InjectMocks
    private MenuController sampleController;
    @Mock
    private MenuService mockService;
    @Autowired
    private MenuService menuService;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        this.mockMvc = standaloneSetup(sampleController)
                .setMessageConverters(new MappingJackson2HttpMessageConverter()).build();

        mockHttpSession.setAttribute(Constant.SESSION_USER, new User((int) 1l));
    }

//    @Test
//    public void getAll() throws Exception {
//        Mockito.when(mockService.createTreeMenu(new Agama(), 0, 10)).thenReturn(menuService.find(new Agama(), 0, 10));
//
//        MvcResult result = this.mockMvc.perform(get("/agamas/").accept(MediaType.APPLICATION_JSON))
//                .andDo(print()).andExpect(status().isOk()).andReturn();
//    }

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

