package io.github.jhipster.sample.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link io.github.jhipster.sample.domain.Label} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LabelDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3)
    private String label;

    private Set<OperationDTO> operations = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Set<OperationDTO> getOperations() {
        return operations;
    }

    public void setOperations(Set<OperationDTO> operations) {
        this.operations = operations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LabelDTO)) {
            return false;
        }

        LabelDTO labelDTO = (LabelDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, labelDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LabelDTO{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", operations=" + getOperations() +
            "}";
    }
}
