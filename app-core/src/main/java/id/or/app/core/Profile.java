/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package id.or.app.core;

/**
 * @author Tami
 */
public class Profile {

    private String uploadLocation;
    private String name;
    private String appTitle;
    private String host;
    private String sshDirectory;
    private String username;
    private String password;
    private String port;
    private String imagePath; //for temporary folder to write file
    private String keyStorePath;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getSshDirectory() {
        return sshDirectory;
    }

    public void setSshDirectory(String sshDirectory) {
        this.sshDirectory = sshDirectory;
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

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getUploadLocation() {
        return uploadLocation;
    }

    public void setUploadLocation(String uploadLocation) {
        this.uploadLocation = uploadLocation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAppTitle() {
        return appTitle;
    }

    public void setAppTitle(String appTitle) {
        this.appTitle = appTitle;
    }

    public String getImagePath() {
        return imagePath;
    }

    public String getKeyStorePath() {
        return keyStorePath;
    }

    public void setKeyStorePath(String keyStorePath) {
        this.keyStorePath = keyStorePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    //TODO  rename this value with encripted string as possibble, this is to be easy for someone to hack via application context
    public enum STATUS {
        PRODUCTION, DEVELOPMENT

    }
}
