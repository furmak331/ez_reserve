import java.time.*;
class Client{
    int clidentID;
    int contact;
    string emailAddress;

    public int book(int RestaurantID , int peopleCount){

    }


}
class Restaurant{
    int restaurantID;
    int contact;
    int tablesAvailable;
    int personsPerTable;
    int totalTables;
    int costPerHr;
    int opening_hr;
    int closing_hr;
    boolean availability;
    public boolean checkavailability(int totalTables , int peopleCount , int hrs){
        int tablesRequired= peopleCount+personsPerTable-1/personsPerTable;
        if(tablesRequired<tablesAvailable && opening_hr<current){
            return True;
        }
    }
        }
class
//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
        System.out.printf("Hello and welcome!");

        for (int i = 1; i <= 5; i++) {
            //TIP Press <shortcut actionId="Debug"/> to start debugging your code. We have set one <icon src="AllIcons.Debugger.Db_set_breakpoint"/> breakpoint
            // for you, but you can always add more by pressing <shortcut actionId="ToggleLineBreakpoint"/>.
            System.out.println("i = " + i);
        }
    }
}