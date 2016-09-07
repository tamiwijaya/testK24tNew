package id.or.greenlabs.app.core.exception;


/**
 * Created by KENDA on 6/9/2015.
 */
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }
}
