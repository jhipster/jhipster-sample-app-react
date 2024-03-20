package io.github.jhipster.sample.service.mapper;

import io.github.jhipster.sample.domain.Label;
import io.github.jhipster.sample.domain.Operation;
import io.github.jhipster.sample.service.dto.LabelDTO;
import io.github.jhipster.sample.service.dto.OperationDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Label} and its DTO {@link LabelDTO}.
 */
@Mapper(componentModel = "spring")
public interface LabelMapper extends EntityMapper<LabelDTO, Label> {
    @Mapping(target = "operations", source = "operations", qualifiedByName = "operationIdSet")
    LabelDTO toDto(Label s);

    @Mapping(target = "operations", ignore = true)
    @Mapping(target = "removeOperation", ignore = true)
    Label toEntity(LabelDTO labelDTO);

    @Named("operationId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OperationDTO toDtoOperationId(Operation operation);

    @Named("operationIdSet")
    default Set<OperationDTO> toDtoOperationIdSet(Set<Operation> operation) {
        return operation.stream().map(this::toDtoOperationId).collect(Collectors.toSet());
    }
}
