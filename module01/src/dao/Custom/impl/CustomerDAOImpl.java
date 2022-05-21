package dao.Custom.impl;

import com.sun.xml.internal.bind.v2.model.core.ID;
import dao.CurdUtil;
import dao.Custom.CustomerDAO;
import entity.Customer;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerDAOImpl implements CustomerDAO {
    @Override
    public boolean add(Customer customer) throws SQLException, ClassNotFoundException {
        return CurdUtil.executeUpdate("INSERT INTO Customer (custId,custName,custAddress,salary) VALUES (?,?,?,?)",
                customer.getId(),customer.getName(),customer.getAddress(),customer.getSalary());
    }

    @Override
    public boolean delete(String s) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public boolean update(Customer customer) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public Customer search(String id) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CurdUtil.executeQuery("SELECT * FROM customer WHERE custId=?", id);
        resultSet.next();
        return new Customer(resultSet.getString("custId"),resultSet.getString("custName"),
                resultSet.getString("custAddress"),resultSet.getString("salary"));
    }

    @Override
    public ArrayList<Customer> getAll() throws SQLException, ClassNotFoundException {
        ArrayList<Customer> allCustomers=new ArrayList<>();
        ResultSet resultSet = CurdUtil.executeQuery("SELECT * FROM customer");
        while (resultSet.next()){
            allCustomers.add(new Customer(resultSet.getString("custId"),resultSet.getString("custName"),resultSet.getString("custAddress"),resultSet.getString("salary")));
        }
        return allCustomers;
    }

    @Override
    public boolean ifCustomerExist(String id) throws SQLException, ClassNotFoundException {
        return CurdUtil.executeQuery("SELECT custId FROM customer WHERE custId=?", id).next();
    }
}
