import ContactType from "./ContactType";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

class ContactLibrary {

    private static instance: ContactLibrary;
    private contactIcons: Map<ContactType, IconProp> = new Map<ContactType, IconProp>();
    private contactLabels: Map<ContactType, string> = new Map<ContactType, string>();

    private constructor() { 

    }

    public static getInstance(): ContactLibrary {
        if (!ContactLibrary.instance) {
            ContactLibrary.instance = new ContactLibrary();
        }

        return ContactLibrary.instance;
    }

    public setLabel(type: ContactType, label: string): void {
        this.contactLabels.set(type, label);
    }

    public getLabel(type: ContactType): string | undefined {
        if (this.contactLabels.has(type)) {
            return this.contactLabels.get(type);
        } else {
            return undefined;
        }
    }

    public setIcon(type: ContactType, iconProp: IconProp): void {
        this.contactIcons.set(type, iconProp);
    }

    public getIcon(type: ContactType): IconProp | undefined {
        if (this.contactIcons.has(type)) {
            return this.contactIcons.get(type);
        } else {
            return undefined;
        }
    }

    public setLabelAndIcon(type: ContactType, label: string, icon: IconProp): void {
        this.setLabel(type, label);
        this.setIcon(type, icon);
    }
}

export default ContactLibrary;