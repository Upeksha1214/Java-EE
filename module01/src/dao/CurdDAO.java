package dao;

import com.sun.xml.internal.bind.v2.model.core.ID;

import java.sql.SQLException;
import java.util.ArrayList;

public interface CurdDAO <T, id> extends SuperDAO {
    boolean add(T t) throws SQLException, ClassNotFoundException;

    boolean delete(ID id) throws SQLException, ClassNotFoundException;

    boolean update(T t) throws SQLException, ClassNotFoundException;

    T search(ID id) throws SQLException, ClassNotFoundException;

    ArrayList<T> getAll() throws SQLException, ClassNotFoundException;
}
