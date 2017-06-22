package id.or.app.core.entity;


import java.io.Serializable;

/**
 * Created by kris on 14/05/14.
 * base entity class providing standard property to use in persistent media
 */
public class BaseEntity implements Serializable {

    private static final long serialVersionUID = -8528633195887266795L;
    private int id;
    //for custom searching from end user
    private String token;

    public BaseEntity() {
    }

    public BaseEntity(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "BaseEntity{" +
                "id=" + id +
                ", token='" + token + '\'' +
                '}';
    }
}
