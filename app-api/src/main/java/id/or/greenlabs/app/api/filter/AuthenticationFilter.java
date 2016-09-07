package id.or.greenlabs.app.api.filter;


import id.or.greenlabs.app.core.dao.UserDAO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.joda.time.DateTime;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.util.Date;
import java.util.UUID;

/**
 * Created by krissadewo on 13/05/16.
 */
public class AuthenticationFilter extends GenericFilterBean implements Filter {

    private UserDAO userDAO;

    @Override
    public void doFilter(final ServletRequest req,
                         final ServletResponse res,
                         final FilterChain chain) throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest) req;
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null) {
            throw new ServletException("Missing or invalid Authorization header.");
        }

        final String token;
        if (request.getRequestURI().equals("/app-api/login")) {
            /*
            * untuk generate token ketika login
            * token expired setelah 15 detik setelah user sukser login
            */
            token = Jwts.builder()
                    .setSubject(String.valueOf(UUID.randomUUID()))
                    .claim("roles", UUID.randomUUID())
                    .setIssuedAt(new Date())
                    .setExpiration(new DateTime().plusSeconds(15).toDate())
                    .signWith(SignatureAlgorithm.HS256, "Aa@123")
                    .compact();
        } else {
            /*
            * token digenerate ketika user sukses login lalu disimpan di sessionstorage
            * token dikirm dari sessionstorage ketika requestHeader
            */
            token = authHeader;
        }

        try {
            final Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary("Aa@123"))
                    .parseClaimsJws(token)
                    .getBody();
            request.setAttribute("claims", claims);
        } catch (final SignatureException e) {
            throw new ServletException("Invalid token." + token);
        }

        chain.doFilter(req, res);
    }
}
