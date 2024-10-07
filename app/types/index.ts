import { Listing, Reservation, User } from '@prisma/client';

export type SafeListing = Omit<Listing, 'createAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
};
export type SafeUser = Omit<
    User,
    'hashedPassword' | 'emailVerified' | 'careteAt' | 'updatedAt'
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type SafeReservation = Omit<
    Reservation,
    'createAt' | 'startDate' | 'endDate' | 'listing'
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
};
