package id.or.app.core.service;

import id.or.app.core.dao.MenuDAO;
import id.or.app.core.entity.Menu;
import id.or.app.core.entity.Role;
import id.or.app.core.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Tami on 07/06/2016.
 */
@Service
public class MenuService {

    @Autowired
    private MenuDAO menuDAO;

    public List<Menu> find(User user) {
        if (user != null) {
            return menuDAO.find(user);
        }
        return new ArrayList<>();
    }

    private List<Menu> find(Role role) {
        List<Menu> userMenus = new ArrayList<>();
        for (Menu menu : menuDAO.find(null, 0, Integer.MAX_VALUE)) {
            userMenus.add(menu);
            for (Menu userMenu : menuDAO.find(role)) {
                if (userMenu.getId().equals(menu.getId())) {
                    userMenus.remove(menu);
                    userMenus.add(userMenu);
                    break;
                }
            }
        }

        return userMenus;
    }

    /**
     * @param role role
     * @return list of menu by role
     */
    public List<Menu> createTreeMenu(Role role) {
        List<Menu> menus = new ArrayList<>();
        List<Menu> currentMenus = find(role);
        for (Menu menu : currentMenus) {
            if (menu.getIdParent() == 0) {
                menus.add(menu);
                menus.addAll(hasChild(menu, currentMenus, new ArrayList<Menu>()));
            }
        }
        return menus;
    }

    /**
     * Create menu for user who is login
     * The user will validate by role to get the user menu
     * The user can have more than one role on the system that is
     * will be saveTemp at role_users table
     *
     * @param user user
     * @return list of menu by user
     */
    public List<Menu> createTreeMenu(User user) {
        List<Menu> menus = new ArrayList<>();
        List<Menu> currentMenus = find(user);
        for (Menu menu : currentMenus) {
            if (menu.getIdParent() == 0) {
                menus.add(menu);
                menus.addAll(hasChild(menu, currentMenus, new ArrayList<Menu>()));
            }
        }

        return menus;
    }

    private List<Menu> hasChild(Menu akun, List<Menu> menus, List<Menu> callback) {
        for (Menu menu : menus) {
            if (menu.getIdParent().equals(akun.getId())) {
                callback.add(menu);
                hasChild(menu, menus, callback);
            }
        }
        return callback;
    }
}
