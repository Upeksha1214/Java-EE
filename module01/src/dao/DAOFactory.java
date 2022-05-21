package dao;

import dao.Custom.impl.CustomerDAOImpl;
import dao.Custom.impl.ItemDAOImpl;

public class DAOFactory {

    private static DAOFactory daoFactory;

    private DAOFactory(){

    }
    public static DAOFactory getDAOFactory(){
        if (daoFactory==null){
            daoFactory=new DAOFactory();
        }
        return daoFactory;
    }

    public enum DAOType{
        CUSTOMER,ITEM
    }

    public SuperDAO getDAO(DAOType daoType){
        switch (daoType){

            case CUSTOMER:return new CustomerDAOImpl();
            case ITEM:return new ItemDAOImpl();
            default:return null;
        }
    }
}
