package entity;

public class Item {
    private String itemCode;
    private String itemName;
    private String itemQty;
    private String price;

    public Item() {
    }

    public Item(String itemCode, String itemName, String itemQty, String price) {
        this.setItemCode(itemCode);
        this.setItemName(itemName);
        this.setItemQty(itemQty);
        this.setPrice(price);
    }


    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemQty() {
        return itemQty;
    }

    public void setItemQty(String itemQty) {
        this.itemQty = itemQty;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
