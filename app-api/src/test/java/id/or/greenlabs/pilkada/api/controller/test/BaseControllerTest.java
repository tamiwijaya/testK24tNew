package id.or.greenlabs.pilkada.api.controller.test;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

/**
 * Created by kris on 18/12/2014.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:application-context.xml","classpath:dispatcher-servlet.xml"})
@WebAppConfiguration
public class BaseControllerTest {

    @Autowired
    protected MockHttpSession mockHttpSession;
    @Autowired
    protected WebApplicationContext applicationContext;
    @Autowired
    protected MockHttpServletRequest servletRequest;

    protected MockMvc mockMvc;
}
