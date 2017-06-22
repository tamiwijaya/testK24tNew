package id.or.app.core.common;

/**
 * Wrapper class for month
 */
public enum Month {

    Januari("01"),
    Februari("02"),
    Maret("03"),
    April("04"),
    Mei("05"),
    Juni("06"),
    Juli("07"),
    Agustus("08"),
    September("09"),
    Oktober("10"),
    November("11"),
    Desember("12");
    private String monthValue;

    Month(String monthValue) {
        this.monthValue = monthValue;
    }

    public String getMonthValue() {
        return monthValue;
    }
}
