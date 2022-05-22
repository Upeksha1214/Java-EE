package dao.Custom;

import dao.SuperDAO;
import entity.Order;

import java.sql.SQLException;

public interface OrderDAO extends SuperDAO {
    public boolean add(Order dto) throws SQLException, ClassNotFoundException;
}
