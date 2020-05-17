package io.github.jhipster.sample.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link io.github.jhipster.sample.domain.Label} entity.
 */
public class LabelDTO implements Serializable {
    
    private Long id;

    @NotNull
    @Size(min = 3)
    private String label;

    
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LabelDTO)) {
            return false;
        }

        return id != null && id.equals(((LabelDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LabelDTO{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            "}";
    }
}
