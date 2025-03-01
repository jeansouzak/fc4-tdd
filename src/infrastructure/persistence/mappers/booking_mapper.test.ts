import { v4 as uuidv4 } from "uuid";
import { BookingMapper } from "./booking_mapper";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { PropertyMapper } from "./property_mapper";
import { UserMapper } from "./user_mapper";
import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";

describe("Booking Mapper", () => {
    it("deve converter BookingEntity em Booking corretamente", () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = uuidv4();
        propertyEntity.name = "Casa";
        propertyEntity.description = "Descrição";
        propertyEntity.maxGuests = 4;
        propertyEntity.basePricePerNight = 100;

        const userEntity = new UserEntity();
        userEntity.id = uuidv4();
        userEntity.name = "João Silva";

        const bookingEntity = new BookingEntity();
        bookingEntity.id = uuidv4();
        bookingEntity.property = propertyEntity;
        bookingEntity.guest = userEntity;
        bookingEntity.startDate = new Date("2025-01-01");
        bookingEntity.endDate = new Date("2025-01-05");
        bookingEntity.guestCount = 2;
        bookingEntity.totalPrice = 1000;
        bookingEntity.status = "CONFIRMED";

        const property = new Property(
            propertyEntity.id,
            propertyEntity.name,
            propertyEntity.description,
            propertyEntity.maxGuests,
            propertyEntity.basePricePerNight
        );

        const user = new User(userEntity.id, userEntity.name);
        
        jest.spyOn(PropertyMapper, "toDomain").mockReturnValue(property);
        jest.spyOn(UserMapper, "toDomain").mockReturnValue(user);
        
        const booking = BookingMapper.toDomain(bookingEntity);
        
        expect(booking).toBeInstanceOf(Booking);
        expect(booking.getId()).toBe(bookingEntity.id);
        expect(booking.getProperty()).toBe(property);
        expect(booking.getUser()).toBe(user);
        expect(booking.getGuestCount()).toBe(bookingEntity.guestCount);
        expect(booking.getTotalPrice()).toBe(Number(bookingEntity.totalPrice));
        expect(booking.getStatus()).toBe(bookingEntity.status);
    });

    it("deve lançar erro ao faltar campos obrigatórios no Booking (ao converter para BookingEntity)", () => {
        const requiredFields = [
            { field: "id", message: "ID é obrigatório." },
            { field: "property", message: "Propriedade é obrigatória." },
            { field: "guest", message: "Hóspede é obrigatório." },
            { field: "dateRange", message: "Data de início e término é obrigatória." },
            { field: "guestCount", message: "O número de hóspedes é obrigatório." },
            { field: "totalPrice", message: "O preço total é obrigatório." },
            { field: "status", message: "O status é obrigatório." }
        ];

        for (const { field, message } of requiredFields) {
            const booking = new Booking(
                uuidv4(),
                new Property("1", "Casa", "Descrição", 4, 100),
                new User("1", "João Silva"),
                new DateRange(new Date("2024-12-20"), new Date("2024-12-25")),
                2
            );

            (booking as any)[field] = undefined;
            
            expect(() => BookingMapper.toPersistence(booking)).toThrow(message);
        }
    });

    it("deve converter Booking para BookingEntity corretamente", () => {
        const booking = new Booking(
            uuidv4(),
            new Property("1", "Casa", "Descrição", 4, 100),
            new User("1", "João Silva"),
            new DateRange(new Date("2024-12-20"), new Date("2024-12-25")),
            2
        );

        jest.spyOn(PropertyMapper, "toPersistence").mockReturnValue(new PropertyEntity());
        jest.spyOn(UserMapper, "toPersistence").mockReturnValue(new UserEntity());

        const bookingEntity = BookingMapper.toPersistence(booking);
        expect(bookingEntity).toBeInstanceOf(BookingEntity);
        expect(bookingEntity.id).toBe(booking.getId());
        expect(bookingEntity.guestCount).toBe(booking.getGuestCount());
        expect(bookingEntity.totalPrice).toBe(booking.getTotalPrice());
        expect(bookingEntity.status).toBe(booking.getStatus());
    });
});
