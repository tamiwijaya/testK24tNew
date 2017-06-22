package id.or.app.core.entity;

import java.io.Serializable;

/**
 * Created by Tami on 07/06/2016.
 */
public class RoleUser implements Serializable {

    private static final long serialVersionUID = -4999589004170602638L;
    private Long id;
    private User user;
    private Role role;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "RoleUser{" +
                "id=" + id +
                ", user=" + user +
                ", role=" + role +
                '}';
    }
}
