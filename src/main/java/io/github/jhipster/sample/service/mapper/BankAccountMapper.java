package io.github.jhipster.sample.service.mapper;

import io.github.jhipster.sample.domain.*;
import io.github.jhipster.sample.service.dto.BankAccountDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link BankAccount} and its DTO {@link BankAccountDTO}.
 */
@Mapper(componentModel = "spring", uses = { UserMapper.class })
public interface BankAccountMapper extends EntityMapper<BankAccountDTO, BankAccount> {
    @Mapping(target = "user", source = "user", qualifiedByName = "login")
    BankAccountDTO toDto(BankAccount s);

    @Named("name")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    BankAccountDTO toDtoName(BankAccount bankAccount);
}
