package merliontechs.domain;

public class Pair {
    private String date;
    private float cont;

    public Pair(String date,float cont){
        this.date=date;
        this.cont=cont;
    }

    public Pair(String date){
        this.date=date;
        cont=1;
    }

    public String getDate(){
        return date;
    }

    public void setDate(String date){
        this.date=date;
    }

    public float getCont(){
        return cont;
    }

    public void setCont(float cont){
        this.cont=cont;
    }
}