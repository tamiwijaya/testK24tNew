package id.or.app.core.entity;

import java.io.Serializable;

/**
 * Created by Tami on 07/06/2016.
 */
public class Role implements Serializable {

    private static final long serialVersionUID = 5706800827065808005L;
    private Long id;
    private RoleLevel roleLevel;

    public enum RoleLevel {
        ADMIN("ADMIN"), USER("USER");

        private String level;

        RoleLevel(String level) {
            this.level = level;
        }

        public String getLevel() {
            return level;
        }
    }

    public Role() {
    }

    public Role(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleLevel getRoleLevel() {
        return roleLevel;
    }

    public void setRoleLevel(RoleLevel roleLevel) {
        this.roleLevel = roleLevel;
    }
}
