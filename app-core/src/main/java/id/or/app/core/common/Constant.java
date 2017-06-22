package id.or.app.core.common;

import java.util.Date;

/**
 * @author Tami
 *         Constant will used on the backend service for message or constant value helper
 */
public class Constant {

    public static final String SESSION_USER = "user";
    public static final String DEFAULT_USER = "USERNAME";
    public static final String DEFAULT_PASSWORD = "PASSWORD";
    public static final String FLAG_DELETE = "[DELETED] ".concat(new Date().getTime() + "");
    public static final Long NULL_ENTITY = null;
    public static final Long DEFAULT_ENTITY = 0l;
}
