package id.or.greenlabs.app.core.test.dao;

import org.junit.runner.RunWith;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by krissadewo on 22/02/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:core-context.xml"})
@ActiveProfiles({"dev"})
public class BaseDAOTest {
}
