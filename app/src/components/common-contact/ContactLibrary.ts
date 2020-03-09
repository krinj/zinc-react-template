import ContactType from "./ContactType";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ContactEntry from "./ContactEntry";
import ContactDefinition from "./ContactDefinition";


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

    public getLabel(type: ContactType): string {
        const result = this.contactLabels.get(type);
        if (result) {
            return result;
        }

        throw new Error(`No label found for Contact Type: ${type}`);
    }

    public setIcon(type: ContactType, iconProp: IconProp): void {
        this.contactIcons.set(type, iconProp);
    }

    public getIcon(type: ContactType): IconProp {
        const result = this.contactIcons.get(type);
        if (result) {
            return result;
        }

        throw new Error(`No icon found for Contact Type: ${type}`);
    }

    public setLabelAndIcon(type: ContactType, label: string, icon: IconProp): void {
        this.setLabel(type, label);
        this.setIcon(type, icon);
    }

    public getFilteredContactItems(contactTypes?: ContactType[], contactMap?: Map<ContactType, ContactEntry>): ContactDefinition[] {
        
        // Filter the contact types in the list against the contact map.
        // Return a dense array of contact defintions, which can be used to populate the front-end.

        // Base case - no contact information.
        if (!contactTypes || !contactMap) {
            return [];
        }

        const results: ContactDefinition[] = [];
        for (let i = 0; i < contactTypes.length; i++) {
            const key: ContactType = contactTypes[i];
            if (contactMap.has(key)) {
                const entry: ContactEntry | undefined = contactMap.get(key);
                if (!entry) {
                    continue;
                }

                const contactDefinition: ContactDefinition = {
                    body: entry.body,
                    link: entry.link,
                    icon: this.getIcon(key),
                    label: this.getLabel(key)
                };
                results.push(contactDefinition);
            }
        }
        
        return results;

    }
}

export default ContactLibrary;