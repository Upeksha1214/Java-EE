package dao.Custom.impl;

import com.sun.xml.internal.bind.v2.model.core.ID;
import dao.CurdUtil;
import dao.Custom.CustomerDAO;
import entity.Customer;

import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerDAOImpl implements CustomerDAO {
    @Override
    public boolean add(Customer customer) throws SQLException, ClassNotFoundException {
        return CurdUtil.executeUpdate("INSERT INTO Customer (id,name,tp,address) VALUES (?,?,?,?)",
                customer.getId(),customer.getName(),customer.getAddress(),customer.getSalary());
    }

    @Override
    public boolean delete(ID id) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public boolean update(Customer customer) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public Customer search(ID id) throws SQLException, ClassNotFoundException {
        return null;
    }

    @Override
    public ArrayList<Customer> getAll() throws SQLException, ClassNotFoundException {
        return null;
    }
}