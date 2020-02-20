export interface OpeningHoursSlot {
    day: string;
    detail: string;
    isOpen: boolean;
}


interface OpeningHoursModel {
    slots: OpeningHoursSlot[];
}

export default OpeningHoursModel;