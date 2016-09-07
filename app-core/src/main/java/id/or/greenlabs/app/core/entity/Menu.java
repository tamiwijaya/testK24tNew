package id.or.greenlabs.app.core.entity;

import java.io.Serializable;

/**
 * Created by Tami on 07/06/2016.
 */
public class Menu implements Serializable {

    private static final long serialVersionUID = -4176398666394762234L;
    private Long id;
    private String name;
    private String href;
    private String url;
    private Long idParent;
    private Integer orderNumber;
    private String kode;
    //Hanya untuk penanda saja yang digunakan pada saat edit user menu
    private Role role;
    private RoleMenu roleMenu = new RoleMenu();

    public Menu() {
    }

    public Menu(Long id) {
        this.id = id;
    }

    public Menu(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getIdParent() {
        return idParent;
    }

    public void setIdParent(Long idParent) {
        this.idParent = idParent;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getKode() {
        return kode;
    }

    public void setKode(String kode) {
        this.kode = kode;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public RoleMenu getRoleMenu() {
        return roleMenu;
    }

    public void setRoleMenu(RoleMenu roleMenu) {
        this.roleMenu = roleMenu;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", href='" + href + '\'' +
                ", url='" + url + '\'' +
                ", idParent=" + idParent +
                ", orderNumber=" + orderNumber +
                ", kode='" + kode + '\'' +
                ", role=" + role +
                ", roleMenu=" + roleMenu +
                '}';
    }
}
