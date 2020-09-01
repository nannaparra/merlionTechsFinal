package merliontechs.domain;

public class Pair {
    private String Nombre;
    private float Cantidad;

    public Pair(String name,float cantidad){
        this.Nombre = name;
        this.Cantidad = cantidad;
    }

    public Pair(String name) {
        this.Nombre = name;
        Cantidad = 1;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String name) {
        this.Nombre = name;
    }

    public float getCantidad() {
        return Cantidad;
    }

    public void setCantidad(float cantidad) {
        this.Cantidad = cantidad;
    }
}