package id.or.greenlabs.app.core.service;

import id.or.greenlabs.app.core.dao.SystemParameterDAO;
import id.or.greenlabs.app.core.entity.SystemParameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by krissadewo on 02/02/16.
 */
@Service
public class SystemParameterService {

    @Autowired
    private SystemParameterDAO systemParameterDAO;

    public SystemParameter find() {
        return systemParameterDAO.find();
    }

    public boolean linkCheker(String url) {
        HttpURLConnection httpURLConnection = null;
        try {
            URL param = new URL(url);
            httpURLConnection = (HttpURLConnection) param.openConnection();
            httpURLConnection.setRequestMethod("GET");
            httpURLConnection.connect();
            int code = httpURLConnection.getResponseCode();
            if (code == 200) {
                return true;
            }

            return false;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return false;
    }

}
