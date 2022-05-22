package dao.Custom.impl;

import dao.CurdDAO;
import dao.CurdUtil;
import dao.Custom.ItemDAO;
import entity.Item;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ItemDAOImpl implements ItemDAO{

    @Override
    public boolean ifItemExist(String code) throws SQLException, ClassNotFoundException {
        return CurdUtil.executeQuery("SELECT itemCode FROM Item WHERE itemCode=?", code).next();
    }

    @Override
    public boolean add(Item item) throws SQLException, ClassNotFoundException {
        return CurdUtil.executeUpdate("INSERT INTO Item(itemCode,name,qty,price) VALUES(?,?,?,?)",item.getItemCode(),
                item.getItemName(),item.getItemQty(),item.getPrice());
    }

    @Override
    public boolean delete(String s) throws SQLException, ClassNotFoundException {
        return CurdUtil.executeUpdate("DELETE FROM Item WHERE itemCode=?",s);
    }

    @Override
    public boolean update(Item item) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public Item search(String s) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CurdUtil.executeQuery("SELECT * FROM Item WHERE itemCode=?", s);
        resultSet.next();
        return new Item(resultSet.getString("itemCode"),resultSet.getString("name"),resultSet.getString("qty"),resultSet.getString("price"));
    }

    @Override
    public ArrayList<Item> getAll() throws SQLException, ClassNotFoundException {
        ArrayList<Item> allItems=new ArrayList<>();
        ResultSet resultSet = CurdUtil.executeQuery("SELECT * FROM Item");
        while (resultSet.next()){
            allItems.add(new Item(resultSet.getString("itemCode"),resultSet.getString("name"),resultSet.getString("qty"),resultSet.getString("price")));
        }
        return allItems;
    }
}
