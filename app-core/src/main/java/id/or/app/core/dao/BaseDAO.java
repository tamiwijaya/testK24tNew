package id.or.app.core.dao;

import java.util.List;

/**
 * @author Tami
 */
public interface BaseDAO<T> {

    T save(final T entity);

    T update(final T entity);

    T delete(final T entity);

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
