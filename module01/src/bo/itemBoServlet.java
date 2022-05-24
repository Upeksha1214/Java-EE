package bo;

import dao.Custom.ItemDAO;
import dao.DAOFactory;
import entity.Item;

import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(urlPatterns = "/item")
public class itemBoServlet extends HttpServlet {

    ItemDAO itemDAO =(ItemDAO) DAOFactory.getDAOFactory().getDAO(DAOFactory.DAOType.ITEM);
    JsonObjectBuilder response = Json.createObjectBuilder();
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setStatus(HttpServletResponse.SC_CREATED); //200
        resp.setContentType("application/json");
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject item = reader.readObject();

        String code=item.getString("code");
        String name=item.getString("name");
        String qty=item.getString("qty");
        String price=item.getString("price");
        PrintWriter writer = resp.getWriter();




        try {
            boolean add = itemDAO.add(new Item(code,name ,qty,price));

            if (add){

                resp.setStatus(HttpServletResponse.SC_CREATED);//201
                response.add("status", 200);
                response.add("message", "Successfully Added");
                response.add("data", "");
                writer.print(response.build());

            }


        }  catch (SQLException throwables) {
            resp.setStatus(HttpServletResponse.SC_CREATED);//201
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data",throwables.getLocalizedMessage());
            writer.print(response.build());




            throwables.printStackTrace();
        } catch (ClassNotFoundException e) {
            resp.setStatus(HttpServletResponse.SC_CREATED);//201
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());



            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setStatus(HttpServletResponse.SC_CREATED);//201
        PrintWriter writer = resp.getWriter();
        String option=req.getParameter("option");
        resp.setContentType("application/json");
        switch (option){


            case "GETONE" :

                try {


                    if(itemDAO.ifItemExist(req.getParameter("id"))){

                        resp.setStatus(HttpServletResponse.SC_CREATED);//201
                        Item item = itemDAO.search(req.getParameter("id"));

                        System.out.println(item.getItemCode()+" "+item.getItemName()+" "+item.getItemQty()+" "+item.getPrice());

                        JsonObjectBuilder jsonOb = Json.createObjectBuilder();
                        jsonOb.add("itemCode",item.getItemCode());
                        jsonOb.add("name",item.getItemName());
                        jsonOb.add("qty",item.getItemQty());
                        jsonOb.add("price",item.getPrice());

                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status",200);
                        response.add("data",jsonOb.build());

                        writer.print(response.build());


                    }else {
                        resp.setStatus(HttpServletResponse.SC_CREATED);//201
                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status",400);
                        response.add("message" , "Customer Not Found");

                        writer.print(response.build());


                    }


                } catch (SQLException throwables) {
                    resp.setStatus(HttpServletResponse.SC_CREATED);//201
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data",throwables.getLocalizedMessage());
                    writer.print(response.build());


                    throwables.printStackTrace();
                } catch (ClassNotFoundException e) {
                    resp.setStatus(HttpServletResponse.SC_CREATED);//201
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());
                    e.printStackTrace();
                }
                break;


            case "GETALL" :

                try {
                    ArrayList<Item> allItem = itemDAO.getAll();

                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();


                    for (Item item : allItem) {
                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        objectBuilder.add("itemCode", item.getItemCode());
                        objectBuilder.add("name" , item.getItemName());
                        objectBuilder.add("qty",item.getItemQty());
                        objectBuilder.add("price", item.getPrice());

                        arrayBuilder.add(objectBuilder.build());

                    }
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status" , 200);
                    response.add("message" , "Done");
                    response.add("data" , arrayBuilder.build());


                    writer.print(response.build());


                } catch (SQLException throwables) {
                    resp.setStatus(HttpServletResponse.SC_CREATED);//201
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data",throwables.getLocalizedMessage());
                    writer.print(response.build());


                    throwables.printStackTrace();
                } catch (ClassNotFoundException e) {
                    resp.setStatus(HttpServletResponse.SC_CREATED);//201
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());
                    e.printStackTrace();
                }
                break;

        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        System.out.println(id);

        try {

            if(itemDAO.delete(id)){

                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("data", "");
                objectBuilder.add("message", "Successfully Deleted Item");
                writer.print(objectBuilder.build());

            }else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("data", "");
                objectBuilder.add("message", "Item Delete Fail");
                writer.print(objectBuilder.build());
            }


        } catch (SQLException throwables) {
            resp.setStatus(HttpServletResponse.SC_CREATED);//201
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data",throwables.getLocalizedMessage());
            writer.print(response.build());


            throwables.printStackTrace();
        } catch (ClassNotFoundException e) {
            resp.setStatus(HttpServletResponse.SC_CREATED);//201
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());
            e.printStackTrace();
        }


    }
}
