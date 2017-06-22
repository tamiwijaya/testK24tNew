package id.or.app.core.util;

import org.springframework.cache.interceptor.KeyGenerator;

import java.lang.reflect.Method;
import java.util.HashSet;

/**
 * Created by kris on 5/26/2014.
 */
public class EnhancedDefaultKeyGenerator implements KeyGenerator {

    public static final int NO_PARAM_KEY = 0;
    public static final int NULL_PARAM_KEY = 53;

    private static final HashSet<Class<?>> WRAPPER_TYPES = getWrapperTypes();

    public Object generate(Object target, Method method, Object... params) {
        if (params.length == 1 && isWrapperType(params[0].getClass())) {
            return (params[0] == null ? NULL_PARAM_KEY : params[0]);
        }

        if (params.length == 0) {
            return NO_PARAM_KEY;
        }

        int hashCode = 17;
        for (Object object : params) {
            hashCode = 31 * hashCode + (object == null ? NULL_PARAM_KEY : object.hashCode());
        }

        return hashCode;
    }

    public static boolean isWrapperType(Class<?> clazz) {
        return WRAPPER_TYPES.contains(clazz);
    }

    private static HashSet<Class<?>> getWrapperTypes() {
        HashSet<Class<?>> ret = new HashSet<>();
        ret.add(Boolean.class);
        ret.add(Character.class);
        ret.add(Byte.class);
        ret.add(Short.class);
        ret.add(Integer.class);
        ret.add(Long.class);
        ret.add(Float.class);
        ret.add(Double.class);
        ret.add(Void.class);
        return ret;
    }
}
