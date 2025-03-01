import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";

export class PropertyMapper {
  static toDomain(entity: PropertyEntity): Property {
    return new Property(
      entity.id,
      entity.name,
      entity.description,
      entity.maxGuests,
      Number(entity.basePricePerNight)
    );
  }

  static toPersistence(domain: Property): PropertyEntity {
    if (!domain) {
      throw new Error("Property é obrigatório.");
    }
    if (!domain.getId()) {
      throw new Error("ID é obrigatório.");
    }
    if (!domain.getName()) {
      throw new Error("O nome é obrigatório.");
    }
    if (!domain.getDescription()) {
      throw new Error("A descrição é obrigatória.");
    }
    if (domain.getMaxGuests() === undefined || domain.getMaxGuests() === null) {
      throw new Error("O número máximo de hóspedes é obrigatório.");
    }
    if (domain.getMaxGuests() <= 0) {
      throw new Error("O número máximo de hóspedes deve ser maior que zero.");
    }
    if (domain.getBasePricePerNight() === undefined || domain.getBasePricePerNight() === null) {
      throw new Error("O preço base por noite é obrigatório.");
    }

    const entity = new PropertyEntity();
    entity.id = domain.getId();
    entity.name = domain.getName();
    entity.description = domain.getDescription();
    entity.maxGuests = domain.getMaxGuests();
    entity.basePricePerNight = domain.getBasePricePerNight();
    return entity;
  }
}
