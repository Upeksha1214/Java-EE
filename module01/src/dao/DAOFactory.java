package dao;

import dao.Custom.impl.CustomerDAOImpl;

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
        CUSTOMER
    }

    public SuperDAO getDAO(DAOType daoType){
        switch (daoType){

            case CUSTOMER:return new CustomerDAOImpl();
            default:return null;
        }
    }
}
