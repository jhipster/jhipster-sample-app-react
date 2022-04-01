package io.github.jhipster.sample.service.mapper;

import io.github.jhipster.sample.domain.BankAccount;
import io.github.jhipster.sample.domain.Label;
import io.github.jhipster.sample.domain.Operation;
import io.github.jhipster.sample.service.dto.BankAccountDTO;
import io.github.jhipster.sample.service.dto.LabelDTO;
import io.github.jhipster.sample.service.dto.OperationDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Operation} and its DTO {@link OperationDTO}.
 */
@Mapper(componentModel = "spring")
public interface OperationMapper extends EntityMapper<OperationDTO, Operation> {
    @Mapping(target = "bankAccount", source = "bankAccount", qualifiedByName = "bankAccountName")
    @Mapping(target = "labels", source = "labels", qualifiedByName = "labelLabelSet")
    OperationDTO toDto(Operation s);

    @Mapping(target = "removeLabel", ignore = true)
    Operation toEntity(OperationDTO operationDTO);

    @Named("bankAccountName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    BankAccountDTO toDtoBankAccountName(BankAccount bankAccount);

    @Named("labelLabel")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "label", source = "label")
    LabelDTO toDtoLabelLabel(Label label);

    @Named("labelLabelSet")
    default Set<LabelDTO> toDtoLabelLabelSet(Set<Label> label) {
        return label.stream().map(this::toDtoLabelLabel).collect(Collectors.toSet());
    }
}
