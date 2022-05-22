package dao.Custom.impl;

import dao.CurdUtil;
import dao.Custom.OrderDAO;
import entity.Order;

import java.sql.SQLException;

public class OrderDAOImpl implements OrderDAO {
    @Override
    public boolean add(Order dto) throws SQLException, ClassNotFoundException {
        return CurdUtil.executeUpdate("INSERT INTO `order` (orderId, custId, date) VALUES (?,?,?)", dto.getOrderId(),dto.getCustId(),dto.getDate());
    }
}
