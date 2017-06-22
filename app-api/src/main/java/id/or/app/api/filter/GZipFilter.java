package id.or.app.api.filter;

import org.springframework.http.HttpHeaders;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.zip.GZIPOutputStream;

/**
 * Created by Tami on 25/11/15.
 */
public class GZipFilter implements Filter {

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String acceptEncoding = request.getHeader(HttpHeaders.ACCEPT_ENCODING);
        if (acceptEncoding != null) {
            if (acceptEncoding.contains("gzip")) {
                GZIPResponseWrapper gzipResponse = new GZIPResponseWrapper(response);
                chain.doFilter(request, gzipResponse);
                gzipResponse.finish();
                return;
            }
        }

        chain.doFilter(request, response);
    }

    public void init(FilterConfig filterConfig) {
    }

    public void destroy() {
    }

}

class GZIPResponseWrapper extends HttpServletResponseWrapper {

    private GZIPResponseStream gzipStream;
    private ServletOutputStream outputStream;
    private PrintWriter printWriter;

    public GZIPResponseWrapper(HttpServletResponse response) throws IOException {
        super(response);
        response.addHeader(HttpHeaders.CONTENT_ENCODING, "gzip");
    }

    public void finish() throws IOException {
        if (printWriter != null) {
            printWriter.close();
        }

        if (outputStream != null) {
            outputStream.close();
        }

        if (gzipStream != null) {
            gzipStream.close();
        }
    }

    @Override
    public void flushBuffer() throws IOException {
        if (printWriter != null) {
            printWriter.flush();
        }

        if (outputStream != null) {
            outputStream.flush();
        }

        super.flushBuffer();
    }

    @Override
    public ServletOutputStream getOutputStream() throws IOException {
        if (printWriter != null) {
            throw new IllegalStateException("printWriter already defined");
        }

        if (outputStream == null) {
            initGzip();
            outputStream = gzipStream;
        }

        return outputStream;
    }

    @Override
    public PrintWriter getWriter() throws IOException {
        if (outputStream != null) {
            throw new IllegalStateException("printWriter already defined");
        }

        if (printWriter == null) {
            initGzip();
            printWriter = new PrintWriter(new OutputStreamWriter(gzipStream, getResponse().getCharacterEncoding()));
        }

        return printWriter;
    }

    /* Creates a new output stream for writing compressed data in
    * the GZIP file format. */
    private void initGzip() throws IOException {
        gzipStream = new GZIPResponseStream(getResponse().getOutputStream());
    }
}

class GZIPResponseStream extends ServletOutputStream {

    private GZIPOutputStream gzipStream;
    private final AtomicBoolean open = new AtomicBoolean(true);
    private OutputStream output;

    public GZIPResponseStream(OutputStream output) throws IOException {
        this.output = output;
        gzipStream = new GZIPOutputStream(output);
    }

    @Override
    public void close() throws IOException {
        if (open.compareAndSet(true, false)) {
            gzipStream.close();
        }
    }

    @Override
    public void flush() throws IOException {
        gzipStream.flush();
    }

    @Override
    public void write(byte b[]) throws IOException {
        write(b, 0, b.length);
    }

    @Override
    public void write(byte b[], int off, int len) throws IOException {
        if (!open.get()) {
            throw new IOException("Stream closed!");
        }

        gzipStream.write(b, off, len);
    }

    @Override
    public void write(int b) throws IOException {
        if (!open.get()) {
            throw new IOException("Stream closed!");
        }

        gzipStream.write(b);
    }

    @Override
    public boolean isReady() {
        return false;
    }

    @Override
    public void setWriteListener(WriteListener writeListener) {
    }
}

