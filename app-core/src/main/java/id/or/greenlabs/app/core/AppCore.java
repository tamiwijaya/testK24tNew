/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package id.or.greenlabs.app.core;

import id.or.greenlabs.app.core.entity.User;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

/**
 * @author kris
 */
public class AppCore {

    private static class AppCoreHolder {

        private static final AppCore INSTANCE = new AppCore();
    }

    public static AppCore getInstance() {
        return AppCoreHolder.INSTANCE;
    }

    public static final String STANDARD_DATE_FORMAT = "dd-MM-yyyy";

    /**
     * request session from servlet via Spring request context holder
     *
     * @return HttpSession
     */
    public HttpSession getHttpSession() {
        return getHttpServletRequest().getSession();
    }

    public HttpServletRequest getHttpServletRequest() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attributes.getRequest();
    }

    public User getUserFromSession() {
        User user = (User) getHttpSession().getAttribute("user");
        if (user != null) {
            return user;
        }
        return null;
    }

    public enum ReportType {
        XLS, PDF
    }

    /**
     * Converting String object to Date with specific formatter
     *
     * @param value
     * @param pattern
     * @return
     */
    public static Date convertStringToDate(String value, String pattern) {
        try {
            return new SimpleDateFormat(pattern).parse(value);
        } catch (ParseException ex) {
            getLogger(AppCore.class).error(ex.getMessage());
        }
        return null;
    }

    public static String getCurrentMonth() {
        if (new DateTime().getMonthOfYear() < 10) {
            return 0 + new DateTime().monthOfYear().getAsString();
        }
        return new DateTime().monthOfYear().getAsString();
    }

    public static String getCurrentYear() {
        return new DateTime().year().getAsString();
    }

    public static String getCurrentDate() {
        return new DateTime().dayOfMonth().getAsString();
    }

    public static String getCurrentShortYear() {
        return new DateTime().year().getAsString().substring(2, 4);
    }

    public static Logger getLogger(Object o) {
        //return Logger.getLogger(o.getClass());
        return LoggerFactory.getLogger(o.getClass());
    }

    /**
     * Converting String object to Date with specific formatter
     *
     * @param value yyyy-MM-dd hh:mm:ss
     * @return
     */
    public static Date convertStringToDateTime(String value) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").parse(value);
        } catch (ParseException ex) {
            getLogger(AppCore.class).error(ex.getMessage());
        }
        return null;
    }

    /**
     * Converting String object to Date with specific formatter
     *
     * @param value dd/MM/yyyy
     * @return
     */
    public static Date convertStringToDate(String value) {
        try {
            return new SimpleDateFormat("dd-MM-yyyy").parse(value);
        } catch (ParseException ex) {
            getLogger(AppCore.class).error(ex.getMessage());
        }
        return null;
    }

    /**
     * Converting Date object to String with specific formatter
     *
     * @param value
     * @param format
     * @return
     */
    public static String convertDateToString(Date value, String format) {
        if (value != null) {
            try {
                return new SimpleDateFormat(format).format(value);
            } catch (Exception ex) {
                getLogger(AppCore.class).error(ex.getMessage());
            }
        }
        return "-";
    }

    /**
     * Converting String object to Date with specific formatter
     *
     * @param value
     * @return yyyy-MM-dd hh:mm:ss
     */
    public Date convertStandartDateTimeToString(String value) {
        try {
            return new SimpleDateFormat("dd/MM/yyyy").parse(value);
        } catch (ParseException ex) {
            AppCore.getLogger(this).error(ex.getMessage());
        }
        return null;
    }

    public static String convertDateToString(Date value) {
        if (value != null) {
            try {
                return new SimpleDateFormat("dd-MM-yyyy").format(value);
            } catch (Exception ex) {
                getLogger(AppCore.class).error(ex.getMessage());
            }
        }
        return "-";
    }

    /**
     * time will start at  00:00 am
     *
     * @param date
     * @return
     */
    public static Date startOfDay(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }

    /**
     * time will end at  23:59 pm
     *
     * @param date
     * @return
     */
    public static Date endOfDay(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        return cal.getTime();
    }

    /**
     * This method can be used for generating name such image or id that need to unique in string
     *
     * @return
     */
    public static String generateUUIDName() {
        return UUID.randomUUID().toString();
    }

    public static float round(float d, int decimalPlace) {
        return BigDecimal.valueOf(d).setScale(decimalPlace, BigDecimal.ROUND_HALF_UP).floatValue();
    }
}
