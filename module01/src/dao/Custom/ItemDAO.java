package dao.Custom;

import dao.CurdDAO;
import entity.Item;

import java.sql.SQLException;

public interface ItemDAO extends CurdDAO <Item,String>{
    boolean ifItemExist(String code) throws SQLException, ClassNotFoundException;
}
