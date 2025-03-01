import { v4 as uuidv4 } from "uuid";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";
import { Property } from "../../../domain/entities/property";

describe("Property Mapper", () => {
    it("deve converter PropertyEntity (persistence) em Property corretamente", () => {
        const propertyModel = new PropertyEntity();
        propertyModel.id = uuidv4();
        propertyModel.description = "Um lindo chalé na fazenda";
        propertyModel.name = "Chalé na fazenda";
        propertyModel.basePricePerNight = 240;
        propertyModel.maxGuests = 4;

        const propertyEntity = PropertyMapper.toDomain(propertyModel);
        expect(propertyEntity).toBeInstanceOf(Property);
        expect(propertyEntity.getId()).toBe(propertyModel.id);
        expect(propertyEntity.getName()).toBe(propertyModel.name);
        expect(propertyEntity.getDescription()).toBe(propertyModel.description);
        expect(propertyEntity.getMaxGuests()).toBe(propertyModel.maxGuests);
        expect(propertyEntity.getBasePricePerNight()).toBe(propertyModel.basePricePerNight);
    });

    it("deve lançar erro ao faltar campos obrigatórios no Property (ao converter para PropertyEntity)", () => {
        const requiredFields = [
            { field: "id", message: "ID é obrigatório." },
            { field: "name", message: "O nome é obrigatório." },
            { field: "description", message: "A descrição é obrigatória." },
            { field: "maxGuests", message: "O número máximo de hóspedes é obrigatório." },
            { field: "basePricePerNight", message: "O preço base por noite é obrigatório." }
        ];

        for (const { field, message } of requiredFields) {
            const property = new Property(
                uuidv4(),
                "Casa na praia",
                "Uma bela casa na praia",
                4,
                200
            );

            // Simula a ausência do campo
            (property as any)[field] = undefined;

            expect(() => PropertyMapper.toPersistence(property)).toThrow(message);
        }
    });

    it("deve converter Property para PropertyEntity corretamente", () => {
        const propertyEntity = new Property(
            uuidv4(),
            "Uma casa na fazenda",
            "Uma linda casa na fazenda com um lago ao lado",
            6,
            450
        );

        const propertyModel = PropertyMapper.toPersistence(propertyEntity);
        expect(propertyModel).toBeInstanceOf(PropertyEntity);
        expect(propertyEntity.getId()).toBe(propertyModel.id);
        expect(propertyEntity.getDescription()).toBe(propertyModel.description);
        expect(propertyEntity.getName()).toBe(propertyModel.name);
        expect(propertyEntity.getMaxGuests()).toBe(propertyModel.maxGuests);
        expect(propertyEntity.getBasePricePerNight()).toBe(propertyModel.basePricePerNight);
    });
});
