package id.or.greenlabs.app.core.util;

import java.io.*;
import java.util.zip.DeflaterOutputStream;
import java.util.zip.InflaterInputStream;

/**
 * Created by KENDA on 6/8/2015.
 * http://www.javacodegeeks.com/2015/01/working-with-gzip-and-compressed-data.html
 */

public class EncodeCompreses {

    /**
     * For find string endoce and decode, create using ImageBase64
     *
     * Compress string encode for find minimum byte string encode
     * @param encode
     * @return byteArrayOutputStream.toByteArray()
     */
    public static byte[] compress(String encode) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            OutputStream outputStream = new DeflaterOutputStream(byteArrayOutputStream);
            outputStream.write(encode.getBytes("UTF-8"));
            outputStream.close();
        } catch (IOException e) {
            throw new AssertionError(e);
        }
        return byteArrayOutputStream.toByteArray();
    }

    /**
     * Decompress string encode compress for find string encode real for decode to image
     *
     * @param decode
     * @return
     */

    public static String decompress(byte[] decode) {
        InputStream inputStream = new InflaterInputStream(new ByteArrayInputStream(decode));
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = inputStream.read(buffer)) > 0) {
                byteArrayOutputStream.write(buffer, 0, len);
            }
            return new String(byteArrayOutputStream.toByteArray(), "UTF-8");
        } catch (IOException e) {
            throw new AssertionError(e);
        }
    }
}
