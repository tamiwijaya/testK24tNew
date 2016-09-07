package id.or.greenlabs.app.core.aspect;

import id.or.greenlabs.app.core.AppCore;
import id.or.greenlabs.app.core.common.Result;
import id.or.greenlabs.app.core.entity.User;
import id.or.greenlabs.app.core.exception.UploadFailedException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

/**
 * @author krissadewo
 *         This class is responsible for handle every request addressed to the transactional method
 */
@Aspect
@Component
public class AspectService {

    /**
     * Catch all transactional for sendMessages from repository method in application
     * and shared all exception if occurs in the method
     *
     * @param joinPoint joinPoint
     * @return Result
     * @throws Throwable
     */
    @Around("execution(* id.or.greenlabs.app.core.service.*.save*(..)) || execution(* id.or.greenlabs.app.core.service.*.send*(..))")
    //@Around("@annotation(org.springframework.transaction.annotation.Transactional)")
    public Result processSaveTransactional(ProceedingJoinPoint joinPoint) throws Throwable {
        AppCore.getLogger(this).info("***AspectJ*** save is catch !! intercepted : " + joinPoint.getSignature());
        if (joinPoint.getArgs()[0] instanceof User) {
            User object = (User) joinPoint.getArgs()[0];
            return new Result(validateSaveMethod(joinPoint), object);
        }

        return new Result(validateSaveMethod(joinPoint));  //some method have no register yet or some method no need register with specific treatment just around here
    }

    public String validateSaveMethod(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            joinPoint.proceed();
            return Result.SAVE_SUCCESS;
        } catch (DuplicateKeyException e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            AppCore.getLogger(this).error(e.getMessage());
            return Result.SAVE_DATA_EXIST;
        } catch (DataIntegrityViolationException e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            AppCore.getLogger(this).error(e.getMessage());
            return Result.DB_EXCEPTION;
        } catch (DataAccessException e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            AppCore.getLogger(this).error(e.getMessage());
            return Result.DB_EXCEPTION;
        } catch (UploadFailedException e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            AppCore.getLogger(this).error(e.getMessage());
            return Result.UPLOAD_FAILED;
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            e.printStackTrace();
            AppCore.getLogger(this).error(e.getMessage());
            return Result.SYSTEM_EXCEPTION;
        }
    }

    @Around("execution(* id.or.greenlabs.app.core.service.*.delete(..))")
    public Result processDeleteTransactional(ProceedingJoinPoint joinPoint) throws Throwable {
        AppCore.getLogger(this).info("***AspectJ*** delete is catch !! intercepted : " + joinPoint.getSignature());
        return new Result(validateDeleteMethod(joinPoint));  //some method have no register yet or some method no need register with specific treatment just around here
    }

    /**
     * Catch all transactional for delete from repository method in application
     * and shared all exception if occurs in the method
     *
     * @param joinPoint jointPoint
     * @return Result
     * @throws Throwable
     */
    public String validateDeleteMethod(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            joinPoint.proceed();
            return Result.DELETE_SUCCESS;
        } catch (DataIntegrityViolationException e) {
            AppCore.getLogger(this).error(e.getMessage());
            return Result.DB_EXCEPTION;
        } catch (DataAccessException e) {
            AppCore.getLogger(this).error(e.getMessage());
            return Result.DB_EXCEPTION;
        } catch (Exception e) {
            AppCore.getLogger(this).error(e.getMessage());
            return Result.SYSTEM_EXCEPTION;
        }
    }

}
