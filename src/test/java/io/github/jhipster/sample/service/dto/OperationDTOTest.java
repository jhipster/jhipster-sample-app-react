package io.github.jhipster.sample.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.github.jhipster.sample.web.rest.TestUtil;

public class OperationDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OperationDTO.class);
        OperationDTO operationDTO1 = new OperationDTO();
        operationDTO1.setId(1L);
        OperationDTO operationDTO2 = new OperationDTO();
        assertThat(operationDTO1).isNotEqualTo(operationDTO2);
        operationDTO2.setId(operationDTO1.getId());
        assertThat(operationDTO1).isEqualTo(operationDTO2);
        operationDTO2.setId(2L);
        assertThat(operationDTO1).isNotEqualTo(operationDTO2);
        operationDTO1.setId(null);
        assertThat(operationDTO1).isNotEqualTo(operationDTO2);
    }
}
