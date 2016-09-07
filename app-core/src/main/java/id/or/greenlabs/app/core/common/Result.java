/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package id.or.greenlabs.app.core.common;


import id.or.greenlabs.app.core.entity.LoginResponse;
import id.or.greenlabs.app.core.entity.User;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author krissadewo Used for messages to the end of user
 */
public class Result implements Serializable {

    public static final String DATA_NOT_VALID = "Data tidak valid";
    public static final String FILE_NOT_FOUND = "File tidak ditemukan";
    public static final String CONNECTION_SUCCESS = "Koneksi ke server success";
    public static final String CONNECTION_FAILED = "Koneksi ke server failed";
    public static final String SYSTEM_EXCEPTION = "Kesalahan Sistem";
    public static final String DB_EXCEPTION = "Database Bermasalah";
    public static final String SAVE_FAILED = "Gagal menyimpan data";
    public static final String UPDATE_FAILED = "Gagal update data";
    public static final String UPDATE_SUCCESS = "Data berhasil diupdate";
    public static final String SAVE_TRANSAKSI_NOT_FOUND = "Transaksi Rekanan Tidak Ditemukan";
    public static final String SAVE_SUCCESS = "Data berhasil disimpan";
    public static final String SAVE_DATA_EXIST = "Data sudah ada";
    public static final String SAVE_EMPTY = "Data yang akan disimpan tidak lengkap";
    public static final String DELETE_SUCCESS = "Data berhasil dihapus";
    public static final String DELETE_FAILED = "Gagal menghapus data";
    public static final String BATCH_SAVE_FAILED = "Beberapa data yang dimasukan bermasalah";
    public static final String PASSWORD_OR_USER_NOT_REGISTERED = "User atau password tidak terdaftar";
    public static final String LOGIN_SUCCESS = "Login sukses";
    public static final String LOGIN_FAILED = "Username atau password tidak terdaftar";
    public static final String USER_EXIST = "User sudah terdaftar";
    public static final String USER_NOT_FOUND = "User tidak terdaftar";
    public static final String SESSION_EXPIRED = "Sesi anda telah bearkhir; Silahkan loginAsGroup kembali";
    public static final String DELETE_CHILD_EXIST = "Data telah memiliki hubungan dengan data lain. Hubungi admin anda... ";
    public static final String DATA_NOT_SELECTED = "Pilih data yang akan diproses terlebih dahulu";
    public static final String DATA_NOT_EXIST = "Data tidak ditemukan";
    public static final String SEARCH_NOT_HERE = "Pencariah dapat dilakukan pada grid header; silahkan lihat dokumentasi.. ";
    public static final String EDIT_NOT_AVAILABLE = "Ubah data tidak di ijinkan";
    public static final String UPLOAD_FAILED = "Gagal mengunggah data";
    public static final String UPLOAD_SUCCESS = "Data berhasil diunggah";
    public static final String TRANSAKSI_NOT_FOUND = "Data transaksi tidak ditemukan";
    public static final String BUTTON_NOT_WORKING = "Tombol ini tidak bekerja pada mode yang dijalankan";
    public static final String LOAD_MESSAGE = "Loading ...";
    public static final String PRESS_ENTER_FOR_SEARCH = "Tekan enter untuk pencarian";
    private static final long serialVersionUID = -6811456395579116710L;
    private Integer id;
    private String message;
    private User user;
    private List<String> images = new ArrayList<>();
    private String image;
    private LoginResponse loginResponse;

    public Result() {
    }

    public Result(String message) {
        this.message = message;
    }

    public Result(String message, Integer id) {
        this.message = message;
        this.id = id;
    }

    public Result(String message, List<String> images) {
        this.message = message;
        this.images = images;
    }

    public Result(String message, User user) {
        this.message = message;
        this.user = user;
    }

    public Result(String message, LoginResponse loginResponse) {
        this.message = message;
        this.loginResponse = loginResponse;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public User getUser() {
        return user;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LoginResponse getLoginResponse() {
        return loginResponse;
    }

    public void setLoginResponse(LoginResponse loginResponse) {
        this.loginResponse = loginResponse;
    }

    @Override
    public String toString() {
        return "Result{" +
                "id=" + id +
                ", message='" + message + '\'' +
                '}';
    }
}
