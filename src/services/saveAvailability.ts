import Availability from '../models/AvailabilityRequest.model';

interface Break {
    start: string;
    end: string;
    type: string;
}

interface Holiday {
    date: string; // Format: YYYY-MM-DD
    reason: string;
    locations: string[];
}

export const saveAvailability = async (
    createdBy: string,
    request: {
        averageMinutesPerCustomer: number;
        breaks: Break[];
        locations: string[];
        durationInDays: number;
        holidays: Holiday[];
    },
    response: object[],
    notes?: string,
    metadata?: object
): Promise<void> => {
    const availability = new Availability({
        createdBy,
        request,
        response,
        notes,
        metadata,
    });

    await availability.save();
};
