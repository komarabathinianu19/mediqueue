



package com.medique.medique.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    @Column(nullable = false)
    private String password;

    private String role = "PATIENT"; // PATIENT | ADMIN

    // ── Getters & Setters ────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    // ── Builder (replaces Lombok @Builder) ───────────────────────────────────

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final User user = new User();

        public Builder id(Long id) { user.id = id; return this; }
        public Builder name(String name) { user.name = name; return this; }
        public Builder email(String email) { user.email = email; return this; }
        public Builder phone(String phone) { user.phone = phone; return this; }
        public Builder password(String password) { user.password = password; return this; }
        public Builder role(String role) { user.role = role; return this; }
        public User build() { return user; }
    }
}