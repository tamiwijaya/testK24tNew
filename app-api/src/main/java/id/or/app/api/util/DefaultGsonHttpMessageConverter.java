package id.or.app.api.util;

import com.google.gson.*;
import org.springframework.http.converter.json.GsonHttpMessageConverter;

import java.lang.reflect.Type;
import java.util.Collection;

/**
 * Created by Tami on 18/02/16.
 */
public class DefaultGsonHttpMessageConverter extends GsonHttpMessageConverter {

    public DefaultGsonHttpMessageConverter() {
        super();
        Gson gson = new GsonBuilder()
                //.registerTypeHierarchyAdapter(CollectionAdapter.class, new CollectionAdapter()).setPrettyPrinting()
                .create();

        setGson(gson);
    }

    class CollectionAdapter implements JsonSerializer<Collection<?>> {
        @Override
        public JsonElement serialize(Collection<?> src, Type typeOfSrc, JsonSerializationContext context) {
            if (src == null || src.isEmpty())
                return null;

            JsonArray array = new JsonArray();
            for (Object child : src) {
                JsonElement element = context.serialize(child);
                array.add(element);
            }

            return array;
        }
    }

}
