package dao.Custom;

import dao.CurdDAO;
import entity.Customer;

import java.sql.SQLException;

public interface CustomerDAO extends CurdDAO<Customer,String> {
    boolean ifCustomerExist(String id) throws SQLException, ClassNotFoundException;
}
