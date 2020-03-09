interface ContactFormModel {

    title?: string;
    subtitle?: string;
    body?: string;

    contactFormApi: string;

    buttonText?: string;

    requireName?: boolean;
    requireEmail?: boolean;
    requirePhone?: boolean;

    notesText?: string;
    requireNotes?: boolean;
}

export default ContactFormModel;