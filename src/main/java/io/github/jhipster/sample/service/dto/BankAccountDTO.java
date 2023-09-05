package io.github.jhipster.sample.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link io.github.jhipster.sample.domain.BankAccount} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BankAccountDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private BigDecimal balance;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BankAccountDTO)) {
            return false;
        }

        BankAccountDTO bankAccountDTO = (BankAccountDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, bankAccountDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BankAccountDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", balance=" + getBalance() +
            ", user=" + getUser() +
            "}";
    }
}
