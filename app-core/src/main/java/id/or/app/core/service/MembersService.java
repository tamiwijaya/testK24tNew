package id.or.app.core.service;

import id.or.app.core.common.Result;
import id.or.app.core.dao.MembersDAO;
import id.or.app.core.entity.Members;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Tami on 6/21/2017.
 */
@Service
public class MembersService {

    @Autowired
    private MembersDAO membersDAO;

    @Transactional
    public Result save(Members members) {
        if (members.getId() == 0) {
            membersDAO.save(members);
        } else {
            membersDAO.update(members);
        }

        return null;
    }

    @Transactional
    public Result delete(Members members) {
        members.setId(members.getId());
        membersDAO.delete(members);
        return null;
    }

    public List<Members> findAll() {
        return membersDAO.find(null, 0, Integer.MAX_VALUE);
    }

    public Members findById(int id) {
        return membersDAO.findById(id);
    }
}
