package id.or.greenlabs.app.core.entity;

import java.io.Serializable;

/**
 * Created by Tami on 07/06/2016.
 */
public class RoleMenu implements Serializable {

    private static final long serialVersionUID = 8849714398894142332L;
    private Long id;
    private Long urutan;
    private Menu menu;
    private Role role;
    private boolean canEdit;
    private boolean canRead;
    private boolean canSave;
    private boolean canDelete;
    private boolean canPrint;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isCanEdit() {
        return canEdit;
    }

    public void setCanEdit(boolean canEdit) {
        this.canEdit = canEdit;
    }

    public boolean isCanRead() {
        return canRead;
    }

    public void setCanRead(boolean canRead) {
        this.canRead = canRead;
    }

    public boolean isCanSave() {
        return canSave;
    }

    public void setCanSave(boolean canSave) {
        this.canSave = canSave;
    }

    public boolean isCanDelete() {
        return canDelete;
    }

    public void setCanDelete(boolean canDelete) {
        this.canDelete = canDelete;
    }

    public Long getUrutan() {
        return urutan;
    }

    public void setUrutan(Long urutan) {
        this.urutan = urutan;
    }

    public boolean isCanPrint() {
        return canPrint;
    }

    public void setCanPrint(boolean canPrint) {
        this.canPrint = canPrint;
    }
}
