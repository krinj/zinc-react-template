export interface OpeningHoursSlot {
    day: string;
    detail: string;
    isOpen: boolean;
}


interface OpeningHoursModel {
    title?: string;
    slots: OpeningHoursSlot[];
    showPublicHolidayMessage?: boolean;
}

export default OpeningHoursModel;