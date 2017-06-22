package id.or.app.core.entity;

import java.util.Date;

/**
 * Created by Tami on 6/21/2017.
 */
public class Members extends BaseEntity{

    private String nama;
    private String alamat;
    private String telepon;
    private String email;
    private Date tanggalLahir;

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public String getTelepon() {
        return telepon;
    }

    public void setTelepon(String telepon) {
        this.telepon = telepon;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getTanggalLahir() {
        return tanggalLahir;
    }

    public void setTanggalLahir(Date tanggalLahir) {
        this.tanggalLahir = tanggalLahir;
    }

    @Override
    public String toString() {
        return "Members{" +
                "nama='" + nama + '\'' +
                ", alamat='" + alamat + '\'' +
                ", telepon='" + telepon + '\'' +
                ", email='" + email + '\'' +
                ", tanggalLahir=" + tanggalLahir +
                '}';
    }
}
