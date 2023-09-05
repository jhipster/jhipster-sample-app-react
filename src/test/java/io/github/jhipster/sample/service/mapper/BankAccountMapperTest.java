package io.github.jhipster.sample.service.mapper;

import org.junit.jupiter.api.BeforeEach;

class BankAccountMapperTest {

    private BankAccountMapper bankAccountMapper;

    @BeforeEach
    public void setUp() {
        bankAccountMapper = new BankAccountMapperImpl();
    }
}
