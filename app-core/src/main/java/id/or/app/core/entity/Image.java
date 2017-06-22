package id.or.app.core.entity;


import java.io.Serializable;

/**
 * Created by KENDA on 5/28/2015.
 */
public class Image extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 5972915999378111461L;
    private String imageUrl;
    private String base64; //for temporary image decode
    private long userId;
    private long venueId;
    private long placeId;

    public Image() {
    }

    public Image(long venueId) {
        this.venueId = venueId;
    }

    public Image(String base64) {
        this.base64 = base64;
    } //manndatory

    public Image(int id, String imageUrl) {
        super(id);
        this.imageUrl = imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getVenueId() {
        return venueId;
    }

    public void setVenueId(long venueId) {
        this.venueId = venueId;
    }

    public long getPlaceId() {
        return placeId;
    }

    public void setPlaceId(long placeId) {
        this.placeId = placeId;
    }

    @Override
    public String toString() {
        return "Image{" +
                "imageUrl='" + imageUrl + '\'' +
                ", base64='" + base64 + '\'' +
                ", userId=" + userId +
                ", venueId=" + venueId +
                '}';
    }
}
