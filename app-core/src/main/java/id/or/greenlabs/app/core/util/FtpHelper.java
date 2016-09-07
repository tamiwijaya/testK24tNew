package id.or.greenlabs.app.core.util;

import id.or.greenlabs.app.core.AppCore;
import id.or.greenlabs.app.core.Profile;
import id.or.greenlabs.app.core.common.Result;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.net.ftp.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;

/**
 * Created by krissadewo on 3/24/2016.
 */
public class FtpHelper {

    private Profile profile;

   /* public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Result writeFile(List<String> images, Artikel artikel) throws IOException {
        synchronized (this) {
            AppCore.getLogger(this).info(images + "");
            FTPClient ftpClient = doLogin();
            boolean doneKecil = true;
            boolean doneSedang = true;
            if (ftpClient != null) {
                ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
                AppCore.getLogger(this).info("FTP OK");
                int i = 0;
                for (String image : images) {
                    if (!image.isEmpty()) {
                        String fileName = AppCore.generateUUIDName() + ".jpg";
                        Path filePath = Paths.get(profile.getImagePath().concat(fileName));
                        ByteBuffer writeBuffer = ByteBuffer.wrap(Base64.decodeBase64(image));

                        FileChannel writeChannel = FileChannel.open(filePath, StandardOpenOption.CREATE_NEW, StandardOpenOption.WRITE);
                        writeChannel.write(writeBuffer); //write to system

                        FileInputStream fileInputStream1 = new FileInputStream(profile.getImagePath().concat(fileName));
                        FileInputStream fileInputStream2 = new FileInputStream(profile.getImagePath().concat(fileName));

                        doneKecil = ftpClient.storeFile("artikel/kecil_" + fileName, fileInputStream1);
                        doneSedang = ftpClient.storeFile("artikel/sedang_" + fileName, fileInputStream2);

                        fileInputStream1.close();
                        fileInputStream2.close();
                        if (i == 0) {
                            artikel.setGambar(fileName);
                        } else if (i == 1) {
                            artikel.setGambar1(fileName);
                        } else if (i == 2) {
                            artikel.setGambar2(fileName);
                        } else if (i == 3) {
                            artikel.setGambar3(fileName);
                        }

                        AppCore.getLogger(this).debug("SAVING FILE " + fileName);
                    }

                    i++;
                }
            }

            if (doneKecil && doneSedang) {
                doLogout(ftpClient);
                AppCore.getLogger(this).debug("SAVING FILE SUCCESS");
                return new Result(Result.SAVE_SUCCESS, artikel);
            }

            doLogout(ftpClient);
            return new Result(Result.SAVE_FAILED);
        }
    }

    public Result writeFile(String file, String fileName, Artikel artikel) throws IOException {
        synchronized (this) {
            FTPClient ftpClient = doLogin();
            if (ftpClient != null) {
                if ((file != null && !file.isEmpty()) && (fileName != null && !fileName.isEmpty())) {
                    Path filePath = Paths.get(profile.getImagePath().concat(fileName));
                    ByteBuffer writeBuffer = ByteBuffer.wrap(Base64.decodeBase64(file));

                    FileChannel writeChannel = FileChannel.open(filePath, StandardOpenOption.CREATE_NEW, StandardOpenOption.WRITE);
                    writeChannel.write(writeBuffer); //write to system

                    FileInputStream fileInputStream = new FileInputStream(profile.getImagePath().concat(fileName));
                    ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
                    boolean done = ftpClient.storeFile("dokumen/" + fileName, fileInputStream);
                    fileInputStream.close();
                    doLogout(ftpClient);
                    if (done) {
                        artikel.setDokumen(fileName);
                        AppCore.getLogger(this).debug("SAVING FILE " + fileName + " SUCCESS");
                        return new Result(Result.SAVE_SUCCESS);
                    } else {
                        AppCore.getLogger(this).debug("SAVING FILE " + fileName + " FAILED");
                        return new Result(Result.SAVE_FAILED);
                    }
                } else {
                    //No file to upload
                    return new Result(Result.SAVE_SUCCESS);
                }
            }

            return new Result(Result.SAVE_SUCCESS);
        }
    }*/

    public void readDir() {
        try {
            FTPClient ftp = doLogin();
            if (ftp != null) {
                FTPListParseEngine engine = ftp.initiateListParsing("artikel");
                while (engine.hasNext()) {
                    FTPFile[] files = engine.getNext(10);
                    for (FTPFile file : files) {
                        System.out.println(file.getName());
                    }
                }

                doLogout(ftp);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private FTPClient doLogin() throws IOException {
        FTPClient ftp = new FTPClient();
        ftp.setControlKeepAliveTimeout(300); // set timeout to 5 minutes
        ftp.enterLocalPassiveMode();
        int reply;
        String server = "demo-sid.srikrishna.web.id";
        ftp.connect(server);
        ftp.login("ftp@srikrishna", "oraono");
        AppCore.getLogger(this).debug("Connected to " + server + ".");
        AppCore.getLogger(this).debug(ftp.getReplyString());

        // After connection attempt, you should check the reply code to verify success.
        reply = ftp.getReplyCode();
        if (!FTPReply.isPositiveCompletion(reply)) {
            ftp.disconnect();
            AppCore.getLogger(this).debug("FTP server refused connection.");
            return null;
        }

        return ftp;
    }

    private void doLogout(FTPClient ftpClient) {
        if (ftpClient.isConnected()) {
            try {
                ftpClient.disconnect();
                AppCore.getLogger(this).debug("logout ok");
            } catch (IOException ioe) {
            }
        }
    }
}
