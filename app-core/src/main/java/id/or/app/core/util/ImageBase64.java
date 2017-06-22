package id.or.app.core.util;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * Created by KENDA on 5/19/2015.
 */
public class ImageBase64 {

    /**
     * Decode string to image
     *
     * @param imageString The string to decode
     * @return decoded image
     */
    public static BufferedImage decodeToImage(String imageString) {

        BufferedImage bufferedImage = null;
        byte[] imageByte;
        try {
            BASE64Decoder decoder = new BASE64Decoder();
            imageByte = decoder.decodeBuffer(imageString);
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(imageByte);
            bufferedImage = ImageIO.read(byteArrayInputStream);
            byteArrayInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bufferedImage;
    }

    /**
     * Encode image to string
     *
     * @param image The image to encode
     * @param type  jpeg, bmp, ...
     * @return encoded string
     */
    public static String encodeToString(BufferedImage image, String type) {
        String imageString = null;
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try {
            ImageIO.write(image, type, byteArrayOutputStream);
            byte[] imageBytes = byteArrayOutputStream.toByteArray();

            BASE64Encoder encoder = new BASE64Encoder();
            imageString = encoder.encode(imageBytes);

            byteArrayOutputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageString;
    }
}
