package bo;

import dao.Custom.OrderDAO;
import dao.DAOFactory;
import entity.Order;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;


@WebServlet(urlPatterns = "/order")
public class OrderServletBO extends HttpServlet {

    OrderDAO orderDAO = (OrderDAO) DAOFactory.getDAOFactory().getDAO(DAOFactory.DAOType.ORDER);
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonReader reader = Json.createReader(req.getReader());

        JsonObject jsonObject = reader.readObject();

        String orderId=jsonObject.getString("orderId");
        String custId=jsonObject.getString("custId");
        String date=jsonObject.getString("date");

        JsonObjectBuilder response =Json.createObjectBuilder();;
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {

            boolean add = orderDAO.add(new Order(orderId, custId, date));

            System.out.println(add);

            if (add){
                resp.setStatus(HttpServletResponse.SC_CREATED);//201
                response.add("status", 200);
                response.add("message", "Order Purchase Complete");
                response.add("data", "");
                writer.print(response.build());


            }else {

                response.add("status",400);
                response.add("message" , "Order  Purchase Fail.");
                writer.print(response.build());
            }


        } catch (SQLException e) {

            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());

            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {

            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());

            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200


            throw new RuntimeException(e);
        }

    }
}
