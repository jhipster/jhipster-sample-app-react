package io.github.jhipster.sample.service.mapper;

import static io.github.jhipster.sample.domain.OperationAsserts.*;
import static io.github.jhipster.sample.domain.OperationTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class OperationMapperTest {

    private OperationMapper operationMapper;

    @BeforeEach
    void setUp() {
        operationMapper = new OperationMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getOperationSample1();
        var actual = operationMapper.toEntity(operationMapper.toDto(expected));
        assertOperationAllPropertiesEquals(expected, actual);
    }
}
