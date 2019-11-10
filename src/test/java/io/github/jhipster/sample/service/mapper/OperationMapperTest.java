package io.github.jhipster.sample.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class OperationMapperTest {

    private OperationMapper operationMapper;

    @BeforeEach
    public void setUp() {
        operationMapper = new OperationMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(operationMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(operationMapper.fromId(null)).isNull();
    }
}
