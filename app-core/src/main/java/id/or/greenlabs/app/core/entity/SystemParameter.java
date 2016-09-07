package id.or.greenlabs.app.core.entity;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: krissadewo
 * Date: 11/26/13
 * Time: 3:32 PM
 * To change this template use File | Settings | File Templates.
 */
public class SystemParameter implements Serializable {

    private static final long serialVersionUID = -5810894004862398878L;
    private String imageUrl;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "SystemParameter{" +
                "imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
