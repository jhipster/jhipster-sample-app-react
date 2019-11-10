package io.github.jhipster.sample.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class BankAccountMapperTest {

    private BankAccountMapper bankAccountMapper;

    @BeforeEach
    public void setUp() {
        bankAccountMapper = new BankAccountMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(bankAccountMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(bankAccountMapper.fromId(null)).isNull();
    }
}
