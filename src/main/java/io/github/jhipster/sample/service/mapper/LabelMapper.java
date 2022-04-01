package io.github.jhipster.sample.service.mapper;

import io.github.jhipster.sample.domain.Label;
import io.github.jhipster.sample.service.dto.LabelDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Label} and its DTO {@link LabelDTO}.
 */
@Mapper(componentModel = "spring")
public interface LabelMapper extends EntityMapper<LabelDTO, Label> {}
