package id.or.app.core.common;

/**
 * Created by Mudzakkir on 6/19/2014.
 */
public enum Hari {

    SENIN(1),
    SELASA(2),
    RABU(3),
    KAMIS(4),
    JUMAT(5),
    SABTU(6),
    MINGGU(0);

    private int value;

    Hari(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

}
