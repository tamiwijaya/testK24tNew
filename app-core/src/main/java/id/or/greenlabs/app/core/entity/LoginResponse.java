package id.or.greenlabs.app.core.entity;

/**
 * Created by krissadewo on 13/05/16.
 */
public class LoginResponse {

    public String token;
    public User user;

    public LoginResponse(final String token) {
        this.token = token;
    }

    public LoginResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public LoginResponse(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "token='" + token + '\'' +
                ", user=" + user +
                '}';
    }
}
