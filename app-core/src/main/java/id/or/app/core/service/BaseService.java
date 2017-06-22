package id.or.app.core.service;

import id.or.app.core.common.Result;

import java.util.List;

/**
 * Created by Tami on 4/18/14.
 */
public interface BaseService<T> {

    Result save(final T entity);

    Result delete(final T entity);

    T findById(final int id);

    /**
     * Get all data with and without any parameter
     */
    List<T> find(T param, int offset, int limit);


    /**
     * Count all data with and without any parameter
     * <p>You can include the parameter using ${@link T} class
     *
     * @return
     */
    int count(T param);

}
