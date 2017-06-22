/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package id.or.app.core.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Tami <dailycode.org>
 * @date Jul 18, 2013
 */
public class User extends BaseEntity implements Serializable {

    private static final long serialVersionUID = -9045973522255445037L;
    private String username;
    private String password;
    private String name;
    private String email;
    private String status;
    private boolean active;
    private Role role;
    private List<RoleUser> roleUsers = new ArrayList<RoleUser>();

    public User() {
    }

    public User(int id) {
        super(id);
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<RoleUser> getRoleUsers() {
        return roleUsers;
    }

    public void setRoleUsers(List<RoleUser> roleUsers) {
        this.roleUsers = roleUsers;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", status='" + status + '\'' +
                ", active=" + active +
                ", role=" + role +
                ", roleUsers=" + roleUsers +
                '}';
    }
}
