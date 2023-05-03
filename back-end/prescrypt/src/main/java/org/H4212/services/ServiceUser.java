package org.H4212.services;

import org.H4212.entities.*;

import javax.inject.Inject;
import org.hibernate.Session;
import org.hibernate.query.Query;
import java.util.List;

public class ServiceUser {

    @Inject Session session;

    public Person authenticate(String username, String password)
    {
        String stringQuery =
                """
                    SELECT u from user where u.username = :username AND u.password = :password;
                """;
        Query query = session.createNativeQuery(stringQuery);
        query.setParameter("username",username);
        query.setParameter("password", password);
        List resultSet = query.getResultList();

        return (Person) resultSet.get(0);
    }
}
