package id.or.app.core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.support.TransactionTemplate;

/**
 * Created by Tami on 07/06/2016.
 */
public class BasedService {

    @Autowired
    protected TransactionTemplate transactionTemplate;
}
