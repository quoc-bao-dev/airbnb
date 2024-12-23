import prisma from '@/app/_libs/prismadb';

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservation(params: IParams) {
    try {
        const { listingId, userId, authorId } = params;
        const query: any = {};
        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = {
                userId: authorId,
            };
        }
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createAt: 'desc',
            },
        });
        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createAt.toISOString(),
            },
        }));
        return reservations;
    } catch (error: any) {
        throw new Error(error);
    }
}
