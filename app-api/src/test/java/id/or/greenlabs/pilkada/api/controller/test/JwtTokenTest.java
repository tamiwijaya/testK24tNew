package id.or.greenlabs.pilkada.api.controller.test;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import id.or.greenlabs.app.core.common.Constant;
import id.or.greenlabs.app.core.entity.User;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by krissadewo on 13/05/16.
 */
public class JwtTokenTest extends BaseControllerTest {

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(applicationContext).build();
        mockHttpSession.setAttribute(Constant.SESSION_USER, new User(1));
    }

    @Test
    public void login() throws Exception {
        User user = new User();
        user.setUsername("admin");
        user.setPassword("joshbatt888");
        mockMvc.perform(MockMvcRequestBuilders.post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .session(mockHttpSession)
                .content(new Gson().toJson(user)))
                .andExpect(MockMvcResultMatchers.status().isOk()).andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void find() throws Exception {
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiYWRtaW4iLCJpYXQiOjE0NjMxMjEyMDgsImV4cCI6MTQ2MzEyMTI0OH0.JBPi6KtEhsEf7mc7loQw85FM8MNI7vrN9_BSlgJ0u7Y";
        String loginUrl = "http://localhost:8080/app-api/systems";
        URL url = new URL(loginUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        connection.setDoInput(true);
        connection.setDoOutput(true);
        connection.setRequestProperty("Authorization", "Bearer " + token);
        connection.setRequestMethod("GET");
        connection.setRequestProperty("User-Agent", "Mozilla");
        connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");

        BufferedReader bufferedReaderLogin = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = bufferedReaderLogin.readLine()) != null) {
            response.append(inputLine);
        }

        bufferedReaderLogin.close();

        Gson gson = new GsonBuilder().create();
        JsonObject jsonData = gson.fromJson(response.toString(), JsonObject.class);
        System.out.println(jsonData);

    }

}
